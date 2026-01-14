import z from 'zod';

export const acceptFriendRequestParamsDTO = z.object({
  requestId: z.uuid(),
});
