import { AppError } from './app.error.ts';

export class MovieNotFoundError extends AppError {
  constructor(movieId: string) {
    super(`Movie with id ${movieId} not found`, 404, 'MOVIE_NOT_FOUND');
  }
}
