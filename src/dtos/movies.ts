import z from 'zod';

export const createMovieDTO = z.object({
  title: z.string().min(2, 'Title must have at least 2 characters'),
  genre: z.string().min(2, 'Genre must have at least 2 characters'),
  durationMinutes: z.number().min(1),
});

export const getMovieParamsDTO = z.object({
  movieId: z.uuid(),
});

export const updateMovieDTO = z
  .object({
    title: z
      .string()
      .min(2, 'Title must have at least 2 characters')
      .optional(),
    genre: z
      .string()
      .min(2, 'Genre must have at least 2 characters')
      .optional(),
    durationMinutes: z.number().min(1).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided',
  });

export type CreateMovieDTO = z.infer<typeof createMovieDTO>;
export type GetMovieParamsDTO = z.infer<typeof getMovieParamsDTO>;
export type UpdateMovieDTO = z.infer<typeof updateMovieDTO>;
