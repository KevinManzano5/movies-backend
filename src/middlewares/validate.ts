import type { NextFunction, Request, Response } from 'express';
import z, { ZodError } from 'zod';

export const validate =
  (schema: z.ZodTypeAny, property: 'body' | 'params' | 'query' = 'body') =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse(req[property]);

      req[property] = parsed;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          error: error.issues[0],
        });
      }
    }
  };
