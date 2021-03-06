import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import { requestValidate } from './requestValidate';
import { langMessage } from '../../messages/langMessage';

/**
 * createUserSchema
 * @param request
 * @param response
 * @param next
 */
const createUserSchema = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // create schema object
  const schemas = {
    body: Joi.object().keys({
      email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required()
        .label('Email')
        .messages({
          'string.base': langMessage('joyStringBase'),
          'string.email': langMessage('joyStringEmail'),
          'any.required': langMessage('joyAnyRequired'),
        }),
      first_name: Joi.string()
        .min(3)
        .max(30)
        .required()
        .label('Nome')
        .messages({
          'string.base': langMessage('joyStringBase'),
          'string.min': langMessage('joyStringMin'),
          'string.max': langMessage('joyStringMax'),
          'any.required': langMessage('joyAnyRequired'),
        }),
      last_name: Joi.string()
        .min(3)
        .max(200)
        .required()
        .label('Sobrenome')
        .messages({
          'string.base': langMessage('joyStringBase'),
          'string.min': langMessage('joyStringMin'),
          'string.max': langMessage('joyStringMax'),
          'any.required': langMessage('joyAnyRequired'),
        }),
      password: Joi.string()
        .min(6)
        .required()
        .label('Senha')
        .messages({
          'string.base': langMessage('joyStringBase'),
          'string.min': langMessage('joyStringMin'),
          'any.required': langMessage('joyAnyRequired'),
        }),
      provider: Joi.string()
        .valid('credentials', 'facebook', 'instagram', 'google', 'chat')
        .required()
        .label('Provedor')
        .messages({
          'any.only': langMessage('joiAnyOnly'),
          'any.required': langMessage('joyAnyRequired'),
        }),

      role: Joi.string()
        .valid('visitante', 'cliente', 'parceiro', 'administrador', 'suporte')
        .label('Tipo')
        .messages({
          'any.only': langMessage('joiAnyOnly'),
          'any.required': langMessage('joyAnyRequired'),
        }),
      gender: Joi.string()
        .valid('Feminino', 'Masculino', 'N??o Bin??rio')
        .label('Genero')
        .messages({
          'any.only': langMessage('joiAnyOnly'),
          'any.required': langMessage('joyAnyRequired'),
        }),
    }),
  };

  requestValidate(request, response, next, schemas, 'body');
};

/**
 * updateUserSchema
 * @param request
 * @param response
 * @param next
 */
const updateUserSchema = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // define base schema rules
  const schemas = {
    body: Joi.object().keys({
      email: Joi.string()
        .email({ minDomainSegments: 2 })
        .label('Email')
        .messages({
          'string.base': langMessage('joyStringBase'),
          'string.email': langMessage('joyStringEmail'),
        }),
      first_name: Joi.string()
        .min(3)
        .max(30)
        .label('Nome')
        .messages({
          'string.base': langMessage('joyStringBase'),
          'string.min': langMessage('joyStringMin'),
          'string.max': langMessage('joyStringMax'),
        }),
      last_name: Joi.string()
        .min(3)
        .max(200)
        .label('Sobrenome')
        .messages({
          'string.base': langMessage('joyStringBase'),
          'string.min': langMessage('joyStringMin'),
          'string.max': langMessage('joyStringMax'),
        }),
      password: Joi.string()
        .min(6)
        .label('Senha')
        .messages({
          'string.base': langMessage('joyStringBase'),
          'string.min': langMessage('joyStringMin'),
        }),
      provider: Joi.string()
        .valid('credentials', 'facebook', 'instagram', 'google', 'chat')
        .label('Provedor')
        .messages({
          'any.only': langMessage('joiAnyOnly'),
        }),

      role: Joi.string()
        .valid('visitante', 'cliente', 'parceiro', 'administrador', 'suporte')
        .label('Tipo')
        .messages({
          'any.only': langMessage('joiAnyOnly'),
        }),
      gender: Joi.string()
        .valid('Feminino', 'Masculino', 'N??o Bin??rio')
        .label('Genero')
        .messages({
          'any.only': langMessage('joiAnyOnly'),
        }),
      photo: Joi.string()
        .label('Foto')
        .messages({
          'string.base': langMessage('joyStringBase'),
        }),
    }),
  };

  // // ****** conditional schema rule - only admins can update role
  // if (request.user.role === 'Admin') {
  //   schema.role = Joi.string().valid('Admin', 'User').empty('');
  // }
  // // ****** create schema object with rules

  requestValidate(request, response, next, schemas, 'body');
};

/**
 * registerUserSchema
 * @param request
 * @param response
 * @param next
 */
const registerUserSchema = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // create schema object
  const schemas = {
    body: Joi.object().keys({
      email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required()
        .label('Email')
        .messages({
          'string.base': langMessage('joyStringBase'),
          'string.email': langMessage('joyStringEmail'),
          'any.required': langMessage('joyAnyRequired'),
        }),
      first_name: Joi.string()
        .min(3)
        .max(30)
        .required()
        .label('Nome')
        .messages({
          'string.base': langMessage('joyStringBase'),
          'string.min': langMessage('joyStringMin'),
          'string.max': langMessage('joyStringMax'),
          'any.required': langMessage('joyAnyRequired'),
        }),
      last_name: Joi.string()
        .min(3)
        .max(200)
        .required()
        .label('Sobrenome')
        .messages({
          'string.base': langMessage('joyStringBase'),
          'string.min': langMessage('joyStringMin'),
          'string.max': langMessage('joyStringMax'),
          'any.required': langMessage('joyAnyRequired'),
        }),
      password: Joi.string()
        .min(6)
        .required()
        .label('Senha')
        .messages({
          'string.base': langMessage('joyStringBase'),
          'string.min': langMessage('joyStringMin'),
          'any.required': langMessage('joyAnyRequired'),
        }),
      provider: Joi.string()
        .valid('credentials', 'facebook', 'instagram', 'google', 'chat')
        .required()
        .label('Provedor')
        .messages({
          'any.only': langMessage('joiAnyOnly'),
          'any.required': langMessage('joyAnyRequired'),
        }),
      role: Joi.string()
        .valid('visitante')
        .label('Tipo')
        .messages({
          'any.only': langMessage('joiAnyOnly'),
          'any.required': langMessage('joyAnyRequired'),
        }),
      gender: Joi.string()
        .valid('Feminino', 'Masculino', 'N??o Bin??rio')
        .label('Genero')
        .messages({
          'any.only': langMessage('joiAnyOnly'),
          'any.required': langMessage('joyAnyRequired'),
        }),
    }),
  };

  requestValidate(request, response, next, schemas, 'body');
};

/**
 * findByEmailUserSchema
 * @param request
 * @param response
 * @param next
 */
const findByEmailUserSchema = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const schemas = {
    params: Joi.object().keys({
      email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required()
        .label('Email')
        .messages({
          'string.base': langMessage('joyStringBase'),
          'string.email': langMessage('joyStringEmail'),
          'any.required': langMessage('joyAnyRequired'),
        }),
    }),
  };

  requestValidate(request, response, next, schemas, 'params');
};

export {
  createUserSchema,
  updateUserSchema,
  registerUserSchema,
  findByEmailUserSchema,
};
