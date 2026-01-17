import type { Request, Response } from 'express';

import { getFriends as getFriendsService } from '../service/friends.service.ts';
import {
  sendFriendRequest as sendFriendRequestService,
  getPendingFriendRequests as getPendingFriendRequestsService,
  acceptFriendRequest as acceptFriendRequestService,
  rejectFriendRequest as rejectFriendRequestService,
} from '../service/friends.service.ts';

export const sendFriendRequest = async (req: Request, res: Response) => {
  await sendFriendRequestService((req as any).user.id, req.body.receiverId);

  res.status(201).json({
    data: {
      sent: true,
    },
  });
};

export const getPendingFriendRequests = async (req: Request, res: Response) => {
  const requests = await getPendingFriendRequestsService((req as any).user.id);

  res.json({
    data: {
      requests,
    },
  });
};

export const acceptFriendRequest = async (req: Request, res: Response) => {
  await acceptFriendRequestService(
    req.params.requestId as string,
    (req as any).user.id
  );

  res.json({
    data: {
      accepted: true,
    },
  });
};

export const rejectFriendRequest = async (req: Request, res: Response) => {
  await rejectFriendRequestService(
    req.params.requestId as string,
    (req as any).user.id
  );

  res.json({
    data: {
      rejected: true,
    },
  });
};

export const getFriends = async (req: Request, res: Response) => {
  const friends = await getFriendsService((req as any).user.id);

  res.json({
    data: {
      friends,
    },
  });
};
