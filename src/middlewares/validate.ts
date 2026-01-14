import type { NextFunction, Request, Response } from 'express';
import { ZodError, type ZodTypeAny } from 'zod';
import { AppError } from '../errors/app.error.ts';

type RequestProperty = 'body' | 'params' | 'query';

export const validate =
  (schema: ZodTypeAny, property: RequestProperty = 'body') =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse(req[property]);

      req[property] = parsed as any;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const message = error.issues.map((e) => e.message).join(',');

        return next(new AppError(message, 400, 'VALIDATION_ERROR'));
      }
    }

    next();
  };
