import { Request, Response } from 'express';
import { logger } from '../logger';
import { MessagesService } from '../services/MessagesService';

class MessagesController {
  async create(request: Request, response: Response) {
    logger.debug('/messages MessagesController create recebido.');
    const { admin_id, user_id, text } = request.body;
    const messagesService = new MessagesService();
    try {
      const messages = await messagesService.create({
        admin_id,
        user_id,
        text,
      });
      response.json(messages);
    } catch (error) {
      response.status(400).json({ message: error.message });
    }
  }
  async showByuser(request: Request, response: Response) {
    logger.debug('/messages:id MessagesController showByuser recebido.');
    const { id } = request.params;
    const messagesService = new MessagesService();
    try {
      const messages = await messagesService.listByuser(Number(id));
      response.json(messages);
    } catch (error) {
      response.status(400).json({ message: error.message });
    }
  }
}

export { MessagesController };
