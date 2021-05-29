import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { messageLocale } from '../messages/messageLocale';
import dotenv from 'dotenv';
dotenv.config();

interface RequestMiddleware extends Request {
  decode: any;
}

// function verifyJWT(request: Request, response: Response, next: NextFunction) {
//   var token = request.headers['x-access-token'];
//   if (!token)
//     return response
//       .status(401)
//       .send({ auth: false, message: 'No token provided.' });

//   jwt.verify(token, process.env.SECRET, function (err, decoded) {
//     if (err)
//       return response
//         .status(500)
//         .send({ auth: false, message: 'Failed to authenticate token.' });

//     // se tudo estiver ok, salva no request para uso posterior
//     request.userId = decoded.id;
//     next();
//   });
// }

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
    const decode = jwt.verify(token, process.env.APP_SECRET);
    request.decode = decode;
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

  return response.status(401).json({ message: messageLocale('tokenInvalid') });
};

const isAuthenticatedAdmin = async (
  request: RequestMiddleware,
  response: Response,
  next: NextFunction
) => {
  const isOk = await authenticate(request);
  if (isOk) {
    console.log(request.decode);
    if (request.decode.role === 'administrador') {
      return next();
    } else {
      return response.status(401).json({ message: messageLocale('notAdmin') });
    }
  }

  return response.status(401).json({ message: messageLocale('tokenInvalid') });
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
