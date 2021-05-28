import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import { validateRequest } from './validateRequest';

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
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .required()
      .label('Email')
      .messages({
        'string.base': `{#label} precisa ser texto`,
        'string.email': `{#label} precisa ser válido.`,
        'any.required': `{#label} é obrigatório'`,
      }),
    first_name: Joi.string().min(3).max(30).required().label('Nome').messages({
      'string.base': `{#label} precisa ser texto`,
      'string.min': `{#label} deve conter no mínimo {#limit} caracteres`,
      'string.max': `{#label} deve conter no maximo {#limit} caracteres`,
      'any.required': `{#label} é obrigatório'`,
    }),
    last_name: Joi.string()
      .min(3)
      .max(200)
      .required()
      .label('Sobrenome')
      .messages({
        'string.base': `{#label} precisa ser texto`,
        'string.min': `{#label} deve conter no mínimo {#limit} caracteres`,
        'string.max': `{#label} deve conter no maximo {#limit} caracteres`,
        'any.required': `{#label} é obrigatório'`,
      }),
    password: Joi.string().min(6).required().label('Senha').messages({
      'string.base': `{#label} precisa ser texto`,
      'string.min': `{#label} deve conter no mínimo {#limit} caracteres`,
      'any.required': `{#label} é obrigatório'`,
    }),
    provider: Joi.string()
      .valid('credentials', 'facebook', 'instagram', 'google', 'chat')
      .required()
      .label('Provedor')
      .messages({
        'any.only': `{#label} deve ser {if(#valids.length == 1, "", "um de ")}{{#valids}}`,
        'any.required': `{#label} é obrigatório'`,
      }),

    role: Joi.string()
      .valid(
        'visitante',
        'cliente',
        'parceiro',
        'administrador',
        'suporte',
        '1',
        '2',
        '3',
        '4',
        '5'
      )
      .label('Tipo')
      .messages({
        'any.only': `{#label} deve ser {if(#valids.length == 1, "", "um de ")}{{#valids}}`,
        'any.required': `{#label} é obrigatório'`,
      }),
    gender: Joi.string()
      .valid('Feminino', 'Masculino', 'Não Binário', '1', '2', '3')
      .label('Genero')
      .messages({
        'any.only': `{#label} deve ser {if(#valids.length == 1, "", "um de ")}{{#valids}}`,
        'any.required': `{#label} é obrigatório'`,
      }),
  });

  validateRequest(request, response, next, schema);
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
  const schema = Joi.object({
    email: Joi.string().email().empty(''),
    first_name: Joi.string().empty(''),
    last_name: Joi.string().empty(''),
    password: Joi.string().min(6).empty(''),
    provider: Joi.string().valid('credentials'),
    role: Joi.string().valid(
      'visitante',
      'cliente',
      'parceiro',
      'administrador',
      'suporte',
      '1',
      '2',
      '3',
      '4',
      '5'
    ),
  });

  // // ****** conditional schema rule - only admins can update role
  // if (request.user.role === 'Admin') {
  //   schemaRules.role = Joi.string().valid('Admin', 'User').empty('');
  // }
  // // ****** create schema object with rules

  validateRequest(request, response, next, schema);
};

export { createUserSchema, updateUserSchema };
