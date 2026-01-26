import express from 'express';

import { authMiddleware } from '../middlewares/auth.ts';
import { validate } from '../middlewares/validate.ts';
import { searchQueryDTO } from '../dtos/search.ts';
import { search } from '../controllers/search.controller.ts';

const router = express.Router();

router.get('/', authMiddleware, validate(searchQueryDTO, 'query'), search);

export default router;
