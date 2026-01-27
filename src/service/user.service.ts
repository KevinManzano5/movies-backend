import { User } from '../models/user.ts';

export const getUser = async (userId: string) => {
  const user = await User.scope('publicProfile').findByPk(userId);

  return user;
};
