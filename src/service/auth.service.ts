import { UniqueConstraintError, ValidationError } from 'sequelize';
import { User } from '../models/user.ts';
import { UserAlreadyExistsError } from '../errors/user.errors.ts';
import { AppError } from '../errors/app.error.ts';

export const createUser = async (data: {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
}) => {
  try {
    return await User.create(data);
  } catch (error) {
    console.log(error);

    if (error instanceof UniqueConstraintError) {
      const email = error.errors?.[0]?.value as string;

      throw new UserAlreadyExistsError(email);
    }

    if (error instanceof ValidationError) {
      throw new AppError(
        error.errors.map((e) => e.message).join(', '),
        400,
        'VALIDATION_ERROR'
      );
    }

    throw new AppError('Internal server error', 500, 'INTERNAL_ERROR');
  }
};
