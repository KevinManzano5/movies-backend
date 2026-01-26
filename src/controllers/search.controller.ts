import type { Request, Response } from 'express';

import { search as searchService } from '../service/search.service.ts';

export const search = async (req: Request, res: Response) => {
  const { q } = req.query as { q: string };

  const results = await searchService(q);

  res.json({
    data: results,
  });
};
