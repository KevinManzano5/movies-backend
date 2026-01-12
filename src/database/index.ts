import { sequelize } from './database.ts';

export const connectDatabase = async (): Promise<void> => {
  try {
    await sequelize.authenticate();

    console.log('Database connected');
  } catch (error) {
    console.error('Database connection failed', error);

    process.exit(1);
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  await sequelize.close();

  console.log('Database disconnected');
};
