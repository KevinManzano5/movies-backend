import type { NextFunction, Request, Response } from 'express';

import { AppError } from '../errors/app.error.ts';
import { verifyToken } from '../utils/jwt.ts';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export const authMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    throw new AppError('Unauthorized', 401, 'UNAUTHORIZED');
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = verifyToken(token || '');

    (req as AuthRequest).user = {
      id: payload.sub,
      email: payload.email,
    };

    next();
  } catch (error) {
    throw new AppError('Invalid token', 401, 'INVALID_TOKEN');
  }
};
