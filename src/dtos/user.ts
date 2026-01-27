import z from 'zod';

export const getUserParamsDTO = z.object({
  userId: z.uuid('Invalid user ID format'),
});

export type GetUserParamsDTO = z.infer<typeof getUserParamsDTO>;
