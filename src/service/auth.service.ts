import { UniqueConstraintError, ValidationError } from 'sequelize';
import { compare } from 'bcrypt';

import { User } from '../models/user.ts';
import {
  InvalidCredentialsError,
  UserAlreadyExistsError,
} from '../errors/auth.errors.ts';
import { AppError } from '../errors/app.error.ts';
import { signToken } from '../utils/jwt.ts';

export const createUser = async (data: {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
}) => {
  try {
    return await User.create(data);
  } catch (error) {
    console.error(error);

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

export const signIn = async (data: { email: string; password: string }) => {
  try {
    const user = await User.scope('withPassword').findOne({
      where: { email: data.email },
    });

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const isPasswordValid = await compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new InvalidCredentialsError();
    }

    const plainUser = user.get({ plain: true });

    delete plainUser.password;

    const token = signToken({
      sub: plainUser.id,
      email: plainUser.email,
    });

    return {
      data: {
        user: plainUser,
        token,
      },
    };
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
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
