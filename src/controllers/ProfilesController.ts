import { Request, Response } from 'express';
import { logger } from '../logger';
import { ProfilesService } from '../services/ProfilesService';

class ProfilesController {
  async findById(request: Request, response: Response) {
    logger.debug('ProfilesController findById  ');
    const { id } = request.params;
    const profilesService = new ProfilesService();
    try {
      const profile = await profilesService.findById({ id });
      response.json(profile);
    } catch (error) {
      response.status(400).json({ message: error.message });
    }
  }
}

export { ProfilesController };
