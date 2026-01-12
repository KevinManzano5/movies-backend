import express from 'express';
import 'dotenv/config';

import { env } from './config/env.ts';
import { connectDatabase } from './database/index.ts';
import routes from './routes/routes.ts';
import { sequelize } from './database/database.ts';
import { syncDatabase } from './database/sync.ts';
import { errorHandler } from './middlewares/error.handler.ts';

(async () => {
  await connectDatabase();
  await syncDatabase();

  const app = express();

  app.use(express.json());
  app.use('/api/v1', routes);
  app.use(errorHandler); // Always in the end

  app.listen(env.PORT, () => {
    console.log(`Server is running on http://localhost:${env.PORT}`);
  });
})();

process.on('SIGTERM', async () => {
  console.log('SIGTERM received');
  await sequelize.close();
  process.exit(0);
});
