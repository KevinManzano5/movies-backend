import { Router } from 'express';

import healthRoutes from './health.routes.ts';
import authRoutes from './auth.routes.ts';
import friendsRoutes from './friends.routes.ts';
import moviesRoutes from './movies.routes.ts';
import searchRoutes from './search.routes.ts';
import usersRoutes from './users.routes.ts';

const router = Router();

router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/friends', friendsRoutes);
router.use('/movies', moviesRoutes);
router.use('/search', searchRoutes);
router.use('/users', usersRoutes);

export default router;
