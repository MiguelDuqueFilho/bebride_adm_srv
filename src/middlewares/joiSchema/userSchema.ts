import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import { requestValidate } from './requestValidate';
import { messageLocale } from '../../messages/messageLocale';

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
          'string.base': messageLocale('joyStringBase'),
          'string.email': messageLocale('joyStringEmail'),
          'any.required': messageLocale('joyAnyRequired'),
        }),
      first_name: Joi.string()
        .min(3)
        .max(30)
        .required()
        .label('Nome')
        .messages({
          'string.base': messageLocale('joyStringBase'),
          'string.min': messageLocale('joyStringMin'),
          'string.max': messageLocale('joyStringMax'),
          'any.required': messageLocale('joyAnyRequired'),
        }),
      last_name: Joi.string()
        .min(3)
        .max(200)
        .required()
        .label('Sobrenome')
        .messages({
          'string.base': messageLocale('joyStringBase'),
          'string.min': messageLocale('joyStringMin'),
          'string.max': messageLocale('joyStringMax'),
          'any.required': messageLocale('joyAnyRequired'),
        }),
      password: Joi.string()
        .min(6)
        .required()
        .label('Senha')
        .messages({
          'string.base': messageLocale('joyStringBase'),
          'string.min': messageLocale('joyStringMin'),
          'any.required': messageLocale('joyAnyRequired'),
        }),
      provider: Joi.string()
        .valid('credentials', 'facebook', 'instagram', 'google', 'chat')
        .required()
        .label('Provedor')
        .messages({
          'any.only': messageLocale('joiAnyOnly'),
          'any.required': messageLocale('joyAnyRequired'),
        }),

      role: Joi.string()
        .valid('visitante', 'cliente', 'parceiro', 'administrador', 'suporte')
        .label('Tipo')
        .messages({
          'any.only': messageLocale('joiAnyOnly'),
          'any.required': messageLocale('joyAnyRequired'),
        }),
      gender: Joi.string()
        .valid('Feminino', 'Masculino', 'Não Binário')
        .label('Genero')
        .messages({
          'any.only': messageLocale('joiAnyOnly'),
          'any.required': messageLocale('joyAnyRequired'),
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
        .required()
        .label('Email')
        .messages({
          'string.base': messageLocale('joyStringBase'),
          'string.email': messageLocale('joyStringEmail'),
          'any.required': messageLocale('joyAnyRequired'),
        }),
      first_name: Joi.string()
        .min(3)
        .max(30)
        .required()
        .label('Nome')
        .messages({
          'string.base': messageLocale('joyStringBase'),
          'string.min': messageLocale('joyStringMin'),
          'string.max': messageLocale('joyStringMax'),
          'any.required': messageLocale('joyAnyRequired'),
        }),
      last_name: Joi.string()
        .min(3)
        .max(200)
        .required()
        .label('Sobrenome')
        .messages({
          'string.base': messageLocale('joyStringBase'),
          'string.min': messageLocale('joyStringMin'),
          'string.max': messageLocale('joyStringMax'),
          'any.required': messageLocale('joyAnyRequired'),
        }),
      password: Joi.string()
        .min(6)
        .required()
        .label('Senha')
        .messages({
          'string.base': messageLocale('joyStringBase'),
          'string.min': messageLocale('joyStringMin'),
          'any.required': messageLocale('joyAnyRequired'),
        }),
      provider: Joi.string()
        .valid('credentials', 'facebook', 'instagram', 'google', 'chat')
        .required()
        .label('Provedor')
        .messages({
          'any.only': messageLocale('joiAnyOnly'),
          'any.required': messageLocale('joyAnyRequired'),
        }),

      role: Joi.string()
        .valid('visitante', 'cliente', 'parceiro', 'administrador', 'suporte')
        .label('Tipo')
        .messages({
          'any.only': messageLocale('joiAnyOnly'),
          'any.required': messageLocale('joyAnyRequired'),
        }),
      gender: Joi.string()
        .valid('Feminino', 'Masculino', 'Não Binário')
        .label('Genero')
        .messages({
          'any.only': messageLocale('joiAnyOnly'),
          'any.required': messageLocale('joyAnyRequired'),
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

export { createUserSchema, updateUserSchema };
