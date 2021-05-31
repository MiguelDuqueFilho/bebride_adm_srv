import chalk from 'chalk';
import { logger } from '../logger';

import { NextFunction, Request, Response } from 'express';

function routerLevel(request: Request, response: Response, next: NextFunction) {
  logger.info(
    `==> http host: ${chalk.red(request.headers.host)} req: ${chalk.yellow(
      request.method
    )} url: ${chalk.green(request.originalUrl)}`
  );

  // logger.trace({ request });

  const { body, params, query, headers } = request;
  if (Object.entries(headers).length !== 0) {
    logger.trace(`>>> http headers -------------- `);
    logger.trace(headers);
    logger.trace(`<<< http headers --------------`);
  }
  if (Object.entries(query).length !== 0) {
    logger.trace(`>>> http query -------------- `);
    logger.trace(query);
    logger.trace(`<<< http query --------------`);
  }
  if (Object.entries(params).length !== 0) {
    logger.trace(`>>> http params --------------`);
    logger.trace(params);
    logger.trace(`<<< http params --------------`);
  }
  if (Object.entries(body).length !== 0) {
    logger.trace(`>>> http body --------------`);
    logger.trace(body);
    logger.trace(`<<< http body --------------`);
  }

  next();
}
export { routerLevel };
