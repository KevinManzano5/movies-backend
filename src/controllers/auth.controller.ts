import type { Request, Response } from 'express';

import {
  signUp as signUpService,
  signIn as signInService,
  me as meService,
} from '../service/auth.service.ts';

export const signUp = async (req: Request, res: Response) => {
  const { token, user } = await signUpService(req.body);

  res.status(201).json({
    data: {
      user,
      token,
    },
  });
};

export const signIn = async (req: Request, res: Response) => {
  const { token, user } = await signInService(req.body);

  res.status(200).json({
    data: {
      user,
      token,
    },
  });
};

export const me = async (req: Request, res: Response) => {
  const user = await meService((req as any).user.id);

  res.status(200).json({
    data: {
      user,
      token: req.headers.authorization?.split(' ')[1],
    },
  });
};
