import { getCustomRepository, Repository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';
import { ProfilesRepository } from '../repositories/ProfilesRepository';
import { logger } from '../logger';
import { Profile, Gender } from '../entities/Profile';

class ProfilesService {
  private profilesRepository: Repository<Profile>;

  constructor() {
    this.profilesRepository = getCustomRepository(ProfilesRepository);
  }

  async findById({ id }) {
    logger.debug(`findById UsersService recebido. email = ${id}`);
    const profileExists = await this.profilesRepository.findOne({
      where: { id },
    });
    logger.debug(profileExists);

    return profileExists;
  }
}

export { ProfilesService };
