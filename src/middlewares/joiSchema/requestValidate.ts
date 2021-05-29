import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { logger } from '../../logger';

function requestValidate(
  request: Request,
  response: Response,
  next: NextFunction,
  schema: {
    body?: Joi.ObjectSchema;
    query?: Joi.ObjectSchema;
    param?: Joi.ObjectSchema;
  },
  property: string
) {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };

  const { error, value } = schema[property].validate(
    request[property],
    options
  );
  if (error) {
    logger.trace(`>>> Error Validation --------------------------------`);
    const { details, isJoi } = error;
    const errorsDetail = details.map((i: any) => {
      logger.trace(`Validation - type: ${i.type}  message: ${i.message}`);
      return i.message;
    });
    logger.trace(`<<< Error Validation --------------------------------`);
    response.status(422).json({
      status: isJoi,
      error: errorsDetail,
    });
  } else {
    request[property] = value;
    next();
  }
}

export { requestValidate };
