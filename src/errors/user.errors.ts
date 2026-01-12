import { AppError } from './app.error.ts';

export class UserAlreadyExistsError extends AppError {
  constructor(email: string) {
    super(`User with email ${email} already exists`, 409, 'USER_EXISTS');
  }
}
