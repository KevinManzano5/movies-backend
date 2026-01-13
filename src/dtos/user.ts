import z from 'zod';

export const addFriendDTO = z
  .object({
    friendId: z.uuidv4('UUID missing or invalid'),
  })
  .strip();

export type AddFriendDTO = z.infer<typeof addFriendDTO>;
