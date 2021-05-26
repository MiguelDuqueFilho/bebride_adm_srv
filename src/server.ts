import pino, { logger } from './logger';
import { createConnection, getConnectionOptions } from 'typeorm';
import { Socket } from 'socket.io';
import { http, io } from './http';

import './websocket/client';
import './websocket/admin';

import dotenv from 'dotenv';
dotenv.config();

const connectionDB = getConnectionOptions()
  .then(async (connectionOptions) => {
    return await createConnection(
      Object.assign(connectionOptions, {
        type: process.env.DATABASE_CONNECTION,
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_DATABASENAME,
      })
    ).then((connect) => {
      logger.info(
        `Database is ${connect.isConnected ? 'connected' : 'not connected'}`
      );

      io.on('connection', async (socket: Socket) => {
        logger.debug(`connect socket.id = ${socket.id}`);
      });

      http.listen(process.env.HTTP_PORT, () => {
        logger.info(`server http is running on port ${process.env.HTTP_PORT}.`);
      });
    });
  })
  .catch((error) => {
    logger.fatal(`Connection database error: ${error}`);
    var finalLogger = pino.final(logger);
    finalLogger.warn('Server exiting...');
    process.exit(1);
  });

process.on('SIGINT', function () {
  logger.info('Server Backend ended.');
  process.exit();
});
