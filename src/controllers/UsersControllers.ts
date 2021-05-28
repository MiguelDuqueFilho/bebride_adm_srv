import { Request, Response } from 'express';
import { logger } from '../logger';
import { UsersService } from '../services/UsersService';

class UsersController {
  async create(request: Request, response: Response) {
    logger.debug('UsersController create recebido.');
    const { email, first_name, last_name, provider, password, gender, photo } =
      request.body;
    const usersService = new UsersService();
    try {
      const user = await usersService.create({
        email,
        first_name,
        last_name,
        provider,
        password,
        gender,
        photo,
      });
      response.json(user);
    } catch (error) {
      response.status(400).json({ message: error.message });
    }
  }

  async findByEmail(request: Request, response: Response) {
    logger.debug('UsersController findByEmail recebido.');
    const { email } = request.params;
    const usersService = new UsersService();
    try {
      const user = await usersService.findByEmail({ email });
      response.json(user);
    } catch (error) {
      response.status(400).json({ message: error.message });
    }
  }

  async findById(request: Request, response: Response) {
    logger.debug('UsersController findById recebido.');
    const { id } = request.params;
    const usersService = new UsersService();
    try {
      const user = await usersService.findById({ id });
      response.json(user);
    } catch (error) {
      response.status(400).json({ message: error.message });
    }
  }

  async login(request: Request, response: Response) {
    const { email, password } = request.body;
    const usersService = new UsersService();
    try {
      // existsOrError(email, 'E-mail não informado');
      // existsOrError(password, 'Senha não informada');
      const user = await usersService.findByEmail({ email });

      if (!user) {
        return response
          .status(401)
          .json({ message: 'Email ou Senha inválido!' });
      }
      // existsOrError(user, 'Usuário ou Senha inválido!!');

      user.password = password;

      if (!user.checkPassword) {
        return response
          .status(401)
          .json({ message: 'Email ou Senha inválido!' });
      }

      response.json({
        user: { ...user.generateToken },
      });
    } catch (error) {
      return response
        .status(500)
        .json({ message: `Erro no Login! - Erro: ${error}` });
    }
  }
}

export { UsersController };
