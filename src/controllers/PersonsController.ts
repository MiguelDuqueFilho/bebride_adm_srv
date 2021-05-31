import { Request, Response } from 'express';
import { logger } from '../logger';
import { PersonsService } from '../services/PersonsService';

class PersonsController {
  async create(request: Request, response: Response) {
    logger.debug('PersonsController create  ');
    const { name, gender, user_id, event_id } = request.body;
    const usersService = new PersonsService();
    try {
      const user = await usersService.create({
        name,
        gender,
        user_id,
        event_id,
      });
      response.json(user);
    } catch (error) {
      response.status(400).json({ message: error.message });
    }
  }
}

export { PersonsController };
