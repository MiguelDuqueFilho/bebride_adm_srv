import { Request, Response, NextFunction } from 'express';
import { langMessage } from '../messages/langMessage';

function error404(request: Request, response: Response, next: NextFunction) {
  response.status(404).json({
    name: 'CustomError',
    status: 404,
    error: {
      message: langMessage('messageHttp404'),
    },
  });
}

export { error404 };
