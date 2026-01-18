import { ValidationError, where } from 'sequelize';

import { Movie } from '../models/movie.ts';
import { AppError } from '../errors/app.error.ts';
import { MovieNotFoundError } from '../errors/movies.errors.ts';

interface UpdateMovieData {
  name?: string;
  genre?: string;
  duration?: number;
  isActive: boolean;
}

export const createMovie = async (data: {
  title: string;
  genre: string;
  durationMinutes: number;
  createdBy: string;
}) => {
  try {
    const movie = Movie.create(data);

    return movie;
  } catch (error) {
    if (error instanceof ValidationError) {
      throw new AppError(
        error.errors.map((e) => e.message).join(', '),
        400,
        'VALIDATION_ERROR',
      );
    }

    throw new AppError('Internal server error', 500, 'INTERNAL_ERROR');
  }
};

export const getMovies = async () => {
  return Movie.findAll({ where: { isActive: true } });
};

export const getMovie = async (movieId: string) => {
  try {
    const movie = await Movie.findOne({
      where: { id: movieId, isActive: true },
    });

    if (!movie) {
      throw new MovieNotFoundError(movieId);
    }

    return movie;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    if (error instanceof ValidationError) {
      throw new AppError(
        error.errors.map((e) => e.message).join(', '),
        400,
        'VALIDATION_ERROR',
      );
    }

    throw new AppError('Internal server error', 500, 'INTERNAL_ERROR');
  }
};

export const updateMovie = async (movieId: string, data: UpdateMovieData) => {
  const movie = await getMovie(movieId);

  if (!movie.getDataValue('isActive') && data.isActive === false) {
    throw new AppError(
      'Movie is already inactive',
      400,
      'MOVIE_ALREADY_INACTIVE',
    );
  }

  await movie.update(data);

  return movie;
};

export const deleteMovie = async (movieId: string) => {
  await getMovie(movieId);

  try {
    await Movie.update({ isActive: false }, { where: { id: movieId } });
  } catch (error) {
    console.error(error);

    throw new AppError('Internal server error', 500, 'INTERNAL_ERROR');
  }
};
