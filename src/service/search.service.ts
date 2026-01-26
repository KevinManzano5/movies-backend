import { Op } from 'sequelize';

import { Movie } from '../models/movie.ts';
import { User } from '../models/user.ts';

export const search = async (query: string) => {
  const likeQuery = `%${query}%`;

  const [users, movies] = await Promise.all([
    User.findAll({
      where: {
        [Op.or]: [
          { firstName: { [Op.iLike]: likeQuery } },
          { email: { [Op.iLike]: likeQuery } },
        ],
      },
      attributes: ['id', 'firstName', 'email'],
      limit: 10,
    }),
    Movie.findAll({
      where: {
        title: { [Op.iLike]: likeQuery },
        isActive: true,
      },
      attributes: ['id', 'title'],
      limit: 10,
    }),
  ]);

  return {
    users,
    movies,
  };
};
