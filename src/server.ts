import express from 'express';
import { routes } from './routes';
import pino, { logger } from './logger';

import './database';

const app = express();
app.use(express.json());
app.use(routes);

app.listen(3344, () => {
  logger.info('server is running on port 3344.');
});

process.on('SIGINT', function () {
  logger.info('Server Backend ended.');
  process.exit();
});

process.on(
  'uncaughtException',
  pino.final(logger, (err, finalLogger) => {
    finalLogger.error(err, 'uncaughtException');
    process.exit(1);
  })
);

process.on(
  'unhandledRejection',
  pino.final(logger, (err, finalLogger) => {
    finalLogger.error(err, 'unhandledRejection');
    process.exit(1);
  })
);
