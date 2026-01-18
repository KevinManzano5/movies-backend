import { sequelize } from '../database/database.ts';
import { AppError } from '../errors/app.error.ts';
import { FriendRequest } from '../models/friendRequest.ts';
import { User } from '../models/user.ts';
import { UserFriend } from '../models/userFriend.ts';

export const sendFriendRequest = async (
  senderId: string,
  receiverId: string,
) => {
  if (senderId === receiverId) {
    throw new AppError('You cannot add yourself', 400, 'INVALID_FRIEND_ID');
  }

  const receiver = await User.findByPk(receiverId);

  if (!receiver) {
    throw new AppError('User not found', 404, 'USER_NOT_FOUND');
  }

  await FriendRequest.findOrCreate({
    where: { senderId, receiverId },
    defaults: { status: 'PENDING' },
  });

  return true;
};

export const acceptFriendRequest = async (
  requestId: string,
  userId: string,
) => {
  await sequelize.transaction(async (t) => {
    const request = await FriendRequest.findOne({
      where: { id: requestId, receiverId: userId, status: 'PENDING' },
      transaction: t,
      lock: t.LOCK.UPDATE,
    });

    if (!request) {
      throw new AppError('Friend request not found', 404, 'REQUEST_NOT_FOUND');
    }

    request.status = 'ACCEPTED';

    await request.save({ transaction: t });

    await UserFriend.bulkCreate(
      [
        { userId: request.senderId, friendId: request.receiverId },
        { userId: request.receiverId, friendId: request.senderId },
      ],
      { transaction: t },
    );

    return true;
  });
};

export const rejectFriendRequest = async (
  requestId: string,
  userId: string,
) => {
  const request = await FriendRequest.findOne({
    where: {
      id: requestId,
      receiverId: userId,
      status: 'PENDING',
    },
  });

  if (!request) {
    throw new AppError('Friend request not found', 404, 'REQUEST_NOT_FOUND');
  }

  request.status = 'REJECTED';

  await request.save();

  return true;
};

export const getPendingFriendRequests = async (userId: string) => {
  return FriendRequest.findAll({
    where: {
      receiverId: userId,
      status: 'PENDING',
    },
    include: [
      {
        model: User,
        as: 'sender',
        attributes: ['id', 'firstName', 'email'],
      },
    ],
  });
};

export const getFriends = async (userId: string) => {
  const user = await User.findByPk(userId, {
    include: [
      {
        model: User,
        as: 'friends',
        attributes: ['id', 'firstName', 'email'],
        through: { attributes: [] },
      },
    ],
  });

  return (user?.get({ plain: true }) as any)?.friends ?? [];
};
