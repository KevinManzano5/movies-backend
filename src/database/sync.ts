import '../models/index.ts';
import { env } from '../config/env.ts';
import { sequelize } from './database.ts';

export const syncDatabase = async (): Promise<void> => {
  if (env.NODE_ENV === 'development') {
    console.log('Syncing database models...');

    await sequelize.sync({
      alter: true,
    });

    console.log('Models synced');
  } else {
    console.log('Database sync skipped');
  }
};
