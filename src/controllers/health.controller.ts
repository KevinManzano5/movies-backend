import type { Request, Response } from 'express';

export const getHealth = (req: Request, res: Response) => {
  res
    .header({
      'Content-Type': 'application/json',
    })
    .json({
      message: 'API is healthy',
    });
};
