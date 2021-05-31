import { Request, Response } from 'express';
import { logger } from '../logger';
import { EventsService } from '../services/EventsService';

class EventsController {
  async create(request: Request, response: Response) {
    logger.debug('EventsController create ');
    const { title, status, initial_date, event_date } = request.body;
    const eventsService = new EventsService();
    try {
      const user = await eventsService.create({
        title,
        status,
        initial_date,
        event_date,
      });
      response.json(user);
    } catch (error) {
      response.status(400).json({ message: error.message });
    }
  }
}

export { EventsController };
