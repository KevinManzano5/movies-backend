import { Router } from 'express';

import healthRoutes from './health.routes.ts';
import authRoutes from './auth.routes.ts';
import userRoutes from './user.routes.ts';

const router = Router();

router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/users', userRoutes);

export default router;
