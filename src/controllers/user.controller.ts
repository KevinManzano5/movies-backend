import type { Request, Response } from 'express';

import { getUser as getUserService } from '../service/user.service.ts';

export const getUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  const user = await getUserService(userId as string);

  res.json({
    data: {
      user,
    },
  });
};
