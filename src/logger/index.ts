import pino from 'pino';

export const logger = pino({
  level: 'debug',
  timestamp: pino.stdTimeFunctions.isoTime,
  prettyPrint: {
    levelFirst: false,
    colorize: true,
    suppressFlushSyncWarning: true,
  },
});

export default pino;
