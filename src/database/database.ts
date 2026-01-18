import { Sequelize } from 'sequelize';

import { env } from '../config/env.ts';

export const sequelize = new Sequelize({
  username: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  database: env.DATABASE_NAME,
  dialect: 'postgres',

  logging: env.NODE_ENV === 'production' ? console.log : false,

  pool: {
    max: 10,
    min: 0,
    acquire: 30_000,
    idle: 10_000,
  },

  define: {
    timestamps: true,
    underscored: true,
  },
});
