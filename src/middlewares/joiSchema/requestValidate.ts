import { NextFunction, Request, Response } from 'express';
import Joi, { ValidationErrorItem } from 'joi';
import { logger } from '../../logger';

async function requestValidate(
  request: Request,
  response: Response,
  next: NextFunction,
  schema: {
    body?: Joi.ObjectSchema;
    query?: Joi.ObjectSchema;
    params?: Joi.ObjectSchema;
  },
  property: string
) {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };

  const { error, value } = await schema[property].validate(
    request[property],
    options
  );
  if (error) {
    logger.trace(`>>> Error Validation --------------------------------`);
    const { details, isJoi } = error;
    const errorsDetail = details.map((i: ValidationErrorItem) => {
      logger.trace(
        `Validation - type: ${i.type}  key: ${i.context.key} message: ${i.message}`
      );

      const messageValidationError = {
        message: i.message,
        type: i.type,
        label: i.context.label,
        key: i.context.key,
      };

      return messageValidationError;
    });
    logger.trace(`<<< Error Validation --------------------------------`);
    response.status(422).json({
      name: 'ValidationError',
      error: errorsDetail,
    });
  } else {
    if (property === 'body') request[property] = value;
    next();
  }
}

export { requestValidate };
