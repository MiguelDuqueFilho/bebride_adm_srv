import { languageMessage } from './language';
import pino, { logger } from '../logger';
import dotenv from 'dotenv';

dotenv.config();

function langMessage(key: string, lang?: string) {
  const language = lang ?? process.env.MESSAGE_LANG;
  try {
    let msg = languageMessage[language][key];
    if (typeof msg === 'undefined') {
      msg = languageMessage.global.messageNotFound;
    }
    return msg;
  } catch (error) {
    return languageMessage.global.messageNotFound;
  }
}

interface IError extends Error {
  status?: number;
}

function lError(message: string, status?: number) {
  this.name = 'Error';
  this.status = status ?? 500;
  this.message = langMessage(message) ?? 'Generic error message !!!';
}
lError.prototype = Object.create(lError.prototype);
lError.prototype.constructor = lError;

function cError(message: string, status?: number) {
  this.name = 'Error';
  this.status = status ?? 500;
  this.message = message ?? 'Generic custom error message !!!';
}
cError.prototype = Object.create(cError.prototype);
cError.prototype.constructor = cError;

function catchError(error: IError, status?: number) {
  this.name = 'Error';
  this.status = error.status ?? 500;
  this.message = error.message ?? 'Generic custom error message !!!';
}
catchError.prototype = Object.create(catchError.prototype);
catchError.prototype.constructor = catchError;

catchError.prototype.logger = function () {
  if (this.status === 500) {
    logger.error(this);
  }
  return this;
};
export { langMessage, lError, cError, catchError };
