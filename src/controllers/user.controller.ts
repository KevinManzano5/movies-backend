import type { Request, Response } from 'express';

import { addFriend as addFriendService } from '../service/user.service.ts';
import { getFriends as getFriendsService } from '../service/user.service.ts';

export const addFriend = async (req: Request, res: Response) => {
  res.json({
    data: {
      added: await addFriendService((req as any).user.id, req.body.friendId),
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
