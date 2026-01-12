import express from 'express';

import { signIn, signUp } from '../controllers/auth.controller.ts';
import { validate } from '../middlewares/validate.ts';
import { createUserDTO } from '../dtos/user.ts';

const router = express.Router();

router.post('/sign_up', validate(createUserDTO), signUp);
router.post('/sign_in', signIn);

export default router;
