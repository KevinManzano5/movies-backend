import { sequelize } from '../database/database.ts';
import { AppError } from '../errors/app.error.ts';
import { User } from '../models/user.ts';
import { UserFriend } from '../models/userFriend.ts';

export const addFriend = async (userId: string, friendId: string) => {
  if (userId == friendId) {
    throw new AppError('You cannot add yourself', 400, 'INVALID_FRIEND_ID');
  }

  await sequelize.transaction(async (t) => {
    const [friend] = await Promise.all([
      User.findByPk(friendId, { transaction: t, lock: t.LOCK.UPDATE }),
    ]);

    if (!friend) {
      throw new AppError('User or friend not found', 404, 'USER_NOT_FOUND');
    }

    await UserFriend.findOrCreate({
      where: { userId, friendId },
      transaction: t,
    });
    await UserFriend.findOrCreate({
      where: { userId: friendId, friendId: userId },
      transaction: t,
    });
  });

  return true;
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
