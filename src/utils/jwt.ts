import jwt from 'jsonwebtoken';

import { env } from '../config/env.ts';

export type JwtPayload = {
  sub: string;
  email: string;
  isAdmin: boolean;
};

export const signToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: '15m',
  });
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, env.JWT_SECRET) as JwtPayload;
};
