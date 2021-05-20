import { Request, Response } from 'express';
import { logger } from '../logger';
import { SettingsService } from '../services/SettingsService';

class SettingsController {
  async create(request: Request, response: Response) {
    logger.debug('/settings SettingsController create recebido.');
    const { chat, username } = request.body;
    const settingsService = new SettingsService();
    try {
      const settings = await settingsService.create({ chat, username });
      response.json(settings);
    } catch (error) {
      response.status(400).json({ message: error.message });
    }
  }
}

export { SettingsController };
