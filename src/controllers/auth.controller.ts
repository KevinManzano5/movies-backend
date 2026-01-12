import type { Request, Response } from 'express';

import { createUser } from '../service/auth.service.ts';

export const signUp = async (req: Request, res: Response) => {
  const user = await createUser(req.body);

  res.status(201).json({
    data: {
      user,
    },
  });
};

export const signIn = (req: Request, res: Response) => {
  res.json({
    message: 'Sign In',
  });
};
