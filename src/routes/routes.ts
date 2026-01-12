import { Router } from 'express';

import healthRoutes from './health.routes.ts';
import authRoutes from './auth.routes.ts';

const router = Router();

router.use('/health', healthRoutes);
router.use('/auth', authRoutes);

export default router;
