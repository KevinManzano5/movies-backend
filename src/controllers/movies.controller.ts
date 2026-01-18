import type { Request, Response } from 'express';

import {
  createMovie as createMovieService,
  getMovies as getMoviesService,
  getMovie as getMovieService,
  deleteMovie as deleteMovieService,
  updateMovie as updateMovieService,
} from '../service/movies.service.ts';

export const createMovie = async (req: Request, res: Response) => {
  const movie = await createMovieService({
    title: req.body.title,
    genre: req.body.genre,
    durationMinutes: req.body.durationMinutes,
    createdBy: (req as any).user.id,
  });

  res.status(201).json({
    data: {
      movie,
    },
  });
};

export const getMovies = async (req: Request, res: Response) => {
  const movies = await getMoviesService();

  res.status(200).json({
    data: {
      movies,
    },
  });
};

export const getMovie = async (req: Request, res: Response) => {
  const movie = await getMovieService(req.params.movieId as string);

  res.status(200).json({
    data: {
      movie,
    },
  });
};

export const updateMovie = async (req: Request, res: Response) => {
  const movie = await updateMovieService(
    req.params.movieId as string,
    req.body,
  );

  res.status(200).json({
    data: {
      movie,
    },
  });
};

export const deleteMovie = async (req: Request, res: Response) => {
  await deleteMovieService(req.params.movieId as string);

  res.sendStatus(204);
};
