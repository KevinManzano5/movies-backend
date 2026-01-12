import z from 'zod';

export const createUserDTO = z
  .object({
    firstName: z.string().min(2, 'First name must have at least 2 characters'),
    lastName: z.string().min(2, 'Last name must have at least 2 characters'),
    email: z.email(),
    password: z.string().min(8).max(32),
  })
  .strip();

export type CreateUserDTO = z.infer<typeof createUserDTO>;
