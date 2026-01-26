import z from 'zod';

export const searchQueryDTO = z.object({
  q: z.string().min(1, 'Query string cannot be empty'),
});
