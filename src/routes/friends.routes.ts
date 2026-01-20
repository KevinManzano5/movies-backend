import express from 'express';

import {
  acceptFriendRequest,
  getFriends,
  getPendingFriendRequests,
  rejectFriendRequest,
  sendFriendRequest,
} from '../controllers/friends.controller.ts';
import { authMiddleware } from '../middlewares/auth.ts';
import { acceptFriendRequestParamsDTO } from '../dtos/friend-request-params.ts';
import { validate } from '../middlewares/validate.ts';

const router = express.Router();

router.post('/request', authMiddleware, sendFriendRequest);
router.post(
  '/request/:requestId/accept',
  authMiddleware,
  validate(acceptFriendRequestParamsDTO, 'params'),
  acceptFriendRequest,
);
router.post('/request/:requestId/reject', rejectFriendRequest);
router.get('/requests', authMiddleware, getPendingFriendRequests);
router.get('/', authMiddleware, getFriends);

export default router;
