import z from 'zod';

export const acceptRejectFriendRequestParamsDTO = z.object({
  requestId: z.uuid(),
});
