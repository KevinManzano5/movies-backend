import express from 'express';

import { authMiddleware } from '../middlewares/auth.ts';
import { validate } from '../middlewares/validate.ts';
import { getUserParamsDTO } from '../dtos/user.ts';
import { getUser } from '../controllers/user.controller.ts';

const router = express.Router();

router.get(
  '/:userId',
  authMiddleware,
  validate(getUserParamsDTO, 'params'),
  getUser,
);

export default router;
