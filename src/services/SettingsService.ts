import { getCustomRepository, Repository } from 'typeorm';
import { SettingsRepository } from '../repositories/SettingsRepository';
import { logger } from '../logger';
import { Setting } from '../entities/Setting';

interface ISettingsCreate {
  chat: boolean;
  username: string;
}

class SettingsService {
  private settingsRepository: Repository<Setting>;

  constructor() {
    this.settingsRepository = getCustomRepository(SettingsRepository);
  }
  async create({ chat, username }: ISettingsCreate) {
    logger.debug('/settings SettingsService create recebido.');

    const settingsAlreadyExists = await this.settingsRepository.findOne({
      username,
    });

    if (settingsAlreadyExists) {
      throw new Error('Settings Already exists!');
    }

    const settings = this.settingsRepository.create({
      chat,
      username,
    });
    await this.settingsRepository.save(settings);
    return settings;
  }
}

export { SettingsService };
