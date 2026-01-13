import type { Request, Response } from 'express';

import {
  signUp as signUpService,
  signIn as signInService,
} from '../service/auth.service.ts';

export const signUp = async (req: Request, res: Response) => {
  const user = await signUpService(req.body);

  res.status(201).json({
    data: {
      user,
    },
  });
};

export const signIn = async (req: Request, res: Response) => {
  const user = await signInService(req.body);

  res.status(200).json({
    data: {
      user,
    },
  });
};

export const me = async (req: Request, res: Response) => {
  res.status(200).json({
    data: {
      user: (req as any).user,
    },
  });
};
