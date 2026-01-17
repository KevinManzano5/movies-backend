import express, {
  type NextFunction,
  type Request,
  type Response,
} from 'express';
import 'dotenv/config';
import cors from 'cors';

import { env } from './config/env.ts';
import { connectDatabase } from './database/index.ts';
import routes from './routes/routes.ts';
import { sequelize } from './database/database.ts';
import { syncDatabase } from './database/sync.ts';
import { errorHandler } from './middlewares/error.handler.ts';
import { corsOptions } from './config/cors.ts';

(async () => {
  await connectDatabase();
  await syncDatabase();

  const app = express();

  // * CORS
  app.use(cors(corsOptions));
  app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
    if (err.message?.startsWith('CORS blocked')) {
      return res.status(403).json({
        error: {
          message: err.message,
          code: 'CORS_ERROR',
        },
      });
    }

    next(err);
  });

  // * JSON
  app.use(express.json());

  // * Routes
  app.use('/api/v1', routes);

  // * Error Handler
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
