import { Request, Response } from 'express';
import { logger } from '../logger';
import { UsersService } from '../services/UsersService';

class UsersController {
  async create(request: Request, response: Response) {
    logger.debug('/users UsersController create recebido.');
    const { name, email, password, role, provider, image } = request.body;
    const usersService = new UsersService();
    try {
      const user = await usersService.create({
        name,
        email,
        password,
        role,
        provider,
        image,
      });
      response.json(user);
    } catch (error) {
      response.status(400).json({ message: error.message });
    }
  }
}

export { UsersController };
