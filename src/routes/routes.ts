import { Router } from 'express';

import healthRoutes from './health.routes.ts';
import authRoutes from './auth.routes.ts';
import friendsRoutes from './friends.routes.ts';

const router = Router();

router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/friends', friendsRoutes);

export default router;
