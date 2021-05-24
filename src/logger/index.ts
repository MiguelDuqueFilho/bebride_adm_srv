import pino from 'pino';
import dotenv from 'dotenv';

dotenv.config();

export const logger = pino({
  level: process.env.LOG_LEVEL,
  timestamp: pino.stdTimeFunctions.isoTime,
  prettyPrint: {
    levelFirst: false,
    colorize: true,
    suppressFlushSyncWarning: true,
  },
});

export default pino;
