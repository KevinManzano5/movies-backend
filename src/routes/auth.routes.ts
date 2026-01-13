import express from 'express';

import { me, signIn, signUp } from '../controllers/auth.controller.ts';
import { validate } from '../middlewares/validate.ts';
import { createUserDTO, signInDTO } from '../dtos/auth.ts';
import { authMiddleware } from '../middlewares/auth.ts';

const router = express.Router();

router.post('/sign_up', validate(createUserDTO), signUp);
router.post('/sign_in', validate(signInDTO), signIn);
router.get('/me', authMiddleware, me);

export default router;
