import type { Request, Response } from 'express';

import {
  createUser,
  signIn as signInService,
} from '../service/auth.service.ts';

export const signUp = async (req: Request, res: Response) => {
  const user = await createUser(req.body);

  res.status(201).json({
    data: {
      user,
    },
  });
};

export const signIn = async (req: Request, res: Response) => {
  const user = await signInService(req.body);

  res.json({
    data: {
      user,
    },
  });
};
