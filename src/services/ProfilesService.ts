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
    logger.debug(`findById UsersService id = ${id}`);
    const profile = await this.profilesRepository.findOne({
      where: { id },
    });

    logger.trace(`>>> profile findById ....`);
    logger.trace(profile);
    logger.trace(`>>> profile findById ....`);

    if (profile) {
      return profile;
    }
    return {};
  }
}

export { ProfilesService };
