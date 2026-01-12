import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/app.error.ts';

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
      code: error.code,
    });
  }

  console.error(error);

  return res.status(500).json({
    message: 'Unexpected error',
  });
};
