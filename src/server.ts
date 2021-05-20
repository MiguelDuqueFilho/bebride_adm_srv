import dotenv from 'dotenv';
import pino, { logger } from './logger';
import { http } from './http';
import './websocket/client';

dotenv.config();

http.listen(process.env.HTTP_PORT, () => {
  logger.info(`server http is running on port ${process.env.HTTP_PORT}.`);
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
