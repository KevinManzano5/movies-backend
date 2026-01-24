import express from 'express';

import {
  acceptFriendRequest,
  getFriends,
  getPendingFriendRequests,
  rejectFriendRequest,
  sendFriendRequest,
} from '../controllers/friends.controller.ts';
import { authMiddleware } from '../middlewares/auth.ts';
import { acceptRejectFriendRequestParamsDTO } from '../dtos/friend-request-params.ts';
import { validate } from '../middlewares/validate.ts';

const router = express.Router();

router.post('/request', authMiddleware, sendFriendRequest);
router.post(
  '/requests/:requestId/accept',
  authMiddleware,
  validate(acceptRejectFriendRequestParamsDTO, 'params'),
  acceptFriendRequest,
);
router.post(
  '/requests/:requestId/reject',
  authMiddleware,
  validate(acceptRejectFriendRequestParamsDTO, 'params'),
  rejectFriendRequest,
);
router.get('/requests', authMiddleware, getPendingFriendRequests);
router.get('/', authMiddleware, getFriends);

export default router;
