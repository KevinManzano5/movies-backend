import express from 'express';

import { adminMiddleware, authMiddleware } from '../middlewares/auth.ts';
import { validate } from '../middlewares/validate.ts';
import {
  createMovie,
  deleteMovie,
  getMovie,
  getMovies,
  updateMovie,
} from '../controllers/movies.controller.ts';
import {
  createMovieDTO,
  getMovieParamsDTO,
  updateMovieDTO,
} from '../dtos/movies.ts';

const router = express.Router();

router.post(
  '/',
  authMiddleware,
  adminMiddleware,
  validate(createMovieDTO),
  createMovie,
);
router.get('/', getMovies);
router.get('/:movieId', validate(getMovieParamsDTO, 'params'), getMovie);
router.patch(
  '/:movieId',
  validate(getMovieParamsDTO, 'params'),
  validate(updateMovieDTO),
  authMiddleware,
  adminMiddleware,
  updateMovie,
);
router.delete(
  '/:movieId',
  validate(getMovieParamsDTO, 'params'),
  authMiddleware,
  adminMiddleware,
  deleteMovie,
);

export default router;
