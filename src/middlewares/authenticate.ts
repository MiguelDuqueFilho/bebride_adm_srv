import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { NextFunction, Request, Response } from 'express';
import { logger } from '../logger';
import { lError } from '../messages/langMessage';

import dotenv from 'dotenv';
dotenv.config();

interface RequestMiddleware extends Request {
  decode: any;
}

const authenticate = async (request: RequestMiddleware) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return false;
  }

  const [bearer, token] = authHeader.split(' ');
  if (bearer !== 'Bearer') {
    return false;
  }

  try {
    // const payload = jwt.verify(token, process.env.APP_SECRET);
    const publicKey = fs.readFileSync(
      path.resolve(__dirname, '../../keys/public.pem')
    );
    const payload = jwt.verify(token, publicKey);
    request.decode = payload;
    return true;
  } catch (err) {
    return false;
  }
};

const isAuthenticate = async (
  request: RequestMiddleware,
  response: Response,
  next: NextFunction
) => {
  const isOk = await authenticate(request);
  if (isOk) {
    return next();
  }
  const e = new lError('tokenInvalid', 401);
  return response.status(e.status).json(e);
};

const isAuthenticatedAdmin = async (
  request: RequestMiddleware,
  response: Response,
  next: NextFunction
) => {
  const isOk = await authenticate(request);
  if (isOk) {
    logger.trace('>>> request.decode');
    logger.trace(request.decode);
    logger.trace('<<< request.decode');

    if (request.decode.role !== 'administrador') {
      const e = new lError('notAdmin', 401);
      return response.status(e.status).json(e);
    }
    return next();
  }

  const e = new lError('tokenInvalid', 401);
  return response.status(e.status).json(e);
};

// const isAuthenticatedAdmin = async (
//   request: RequestMiddleware,
//   response: Response,
//   next: NextFunction
// ) => {
//   const isOk = await authenticate(request);
//   if (isOk) {
//     if (request.decode.role === 'administrador') {
//       return next();
//     }
//   }
//   return response.status(401).json({ message: 'Usuário não é administrador.' });
// };

// const isAuthenticatedClient = async (
//   request: Request,
//   response: Response,
//   next: NextFunction
// ) => {
//   const isOk = await authenticate(req);
//   if (isOk) {
//     if (req.decode.type === 2) {
//       return next();
//     }
//   }
//   return res.status(401).send(errorHandler('Usuário Inválido.'));
// };

// const isAuthenticatedPartner = async (
//   request: Request,
//   response: Response,
//   next: NextFunction
// ) => {
//   const isOk = await authenticate(req);
//   if (isOk) {
//     if (req.decode.type === 3) {
//       return next();
//     }
//   }
//   return res.status(401).send(errorHandler('Usuário Inválido.'));
// };

export {
  isAuthenticate,
  isAuthenticatedAdmin,
  // isAuthenticatedClient: isAuthenticatedClient,
  // isAuthenticatedPartner: isAuthenticatedPartner,
};
