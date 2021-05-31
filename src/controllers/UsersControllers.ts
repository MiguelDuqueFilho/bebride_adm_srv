import { Request, Response } from 'express';
import { logger } from '../logger';
import { catchError, langMessage, lError } from '../messages/langMessage';
import { UsersService } from '../services/UsersService';
import { UserRole, UserProvider } from '../entities/User';

class UsersController {
  async create(request: Request, response: Response) {
    logger.debug('>>> UsersController create .........');
    const {
      email,
      first_name,
      last_name,
      provider,
      role,
      password,
      gender,
      photo,
    } = request.body;

    try {
      const usersService = new UsersService();

      const user = await usersService.create({
        email,
        first_name,
        last_name,
        provider,
        role,
        password,
        gender,
        photo,
      });
      response.status(201).json({ user });
    } catch (error) {
      const e = new catchError(error).logger();
      response.status(e.status).json(e.message);
    }
  }

  async update(request: Request, response: Response) {
    logger.debug('>>> UsersController update .........');
    const { first_name, last_name, provider, role, password, gender, photo } =
      request.body;

    const { id } = request.params;

    try {
      const usersService = new UsersService();

      const user = await usersService.update({
        id,
        first_name,
        last_name,
        provider,
        role,
        password,
        gender,
        photo,
      });
      response.status(200).json({ user });
    } catch (error) {
      const e = new catchError(error).logger();
      response.status(e.status).json(e.message);
    }
  }

  async register(request: Request, response: Response) {
    logger.debug('>>> UsersController register .........');
    const { email, first_name, last_name, gender, photo, password } =
      request.body;

    try {
      const usersService = new UsersService();

      const user = await usersService.create({
        email,
        first_name,
        last_name,
        provider: UserProvider.credentials,
        role: UserRole.visitante,
        password,
        gender,
        photo,
      });
      response.status(201).json({ id: user.id });
    } catch (error) {
      const e = new catchError(error).logger();
      response.status(e.status).json(e.message);
    }
  }

  async findByEmail(request: Request, response: Response) {
    logger.debug('>>> UsersController findByEmail.');
    const { email } = request.params;
    const usersService = new UsersService();
    try {
      const user = await usersService.findByEmail({ email });
      response.json(user);
    } catch (error) {
      const e = new catchError(error).logger();
      response.status(e.status).json(e.message);
    }
  }

  async findById(request: Request, response: Response) {
    logger.debug('>>> UsersController findById.');
    const { id } = request.params;
    const usersService = new UsersService();
    try {
      const user = await usersService.findById({ id });

      response.json(user);
    } catch (error) {
      const e = new catchError(error).logger();
      response.status(e.status).json(e.message);
    }
  }

  async login(request: Request, response: Response) {
    logger.debug('>>> UsersController login.');
    const { email, password } = request.body;
    const usersService = new UsersService();
    try {
      const resp = await usersService.login({ email, password });

      return response.status(200).json({ user: resp.user });
    } catch (error) {
      const e = new catchError(error).logger();
      response.status(e.status).json(e);
    }
  }
}

export { UsersController };
