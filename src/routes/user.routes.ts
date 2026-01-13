import express from 'express';

import { authMiddleware } from '../middlewares/auth.ts';
import { addFriend, getFriends } from '../controllers/user.controller.ts';
import { validate } from '../middlewares/validate.ts';
import { addFriendDTO } from '../dtos/user.ts';

const router = express.Router();

router.post('/add_friend', authMiddleware, validate(addFriendDTO), addFriend);
router.get('/friends', authMiddleware, getFriends);

export default router;
