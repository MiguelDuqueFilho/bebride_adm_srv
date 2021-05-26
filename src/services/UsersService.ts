import { getCustomRepository, Repository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';
import { ProfilesRepository } from '../repositories/ProfilesRepository';
import { logger } from '../logger';
import { User, UserRole } from '../entities/User';
import { Profile } from '../entities/Profile';

interface IUsersCreate {
  id?: string;
  email: string;
  first_name: string;
  last_name: string;
  role?: UserRole;
  profile_id?: string;
  provider?: string;
  password?: string;
  password_salt?: string;
  password_hash?: string;
  email_verified?: Date;
  deleted_at?: Date;
}

class UsersService {
  private usersRepository: Repository<User>;
  private profilesRepository: Repository<Profile>;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository);
    this.profilesRepository = getCustomRepository(ProfilesRepository);
  }

  async create({
    email,
    first_name,
    last_name,
    role,
    provider,
    password_salt,
    password_hash,
    email_verified,
    deleted_at,
  }: IUsersCreate) {
    logger.debug('/users UsersService create recebido.');

    const userAlreadyExists = await this.usersRepository.findOne({ email });

    if (userAlreadyExists) {
      throw new Error('Usuário já existe!');
    }

    const profile = this.usersRepository.create();
    await this.profilesRepository.save(profile);
    logger.debug('profile.');
    logger.debug(profile);

    const user = this.usersRepository.create({
      email,
      first_name,
      last_name,
      role,
      profile: profile,
      provider,
      password_salt,
      password_hash,
      email_verified,
      deleted_at,
    });
    logger.debug(user);
    await this.usersRepository.save(user);
    return user;
  }

  async findByEmail({ email }) {
    logger.debug(`findByEmail UsersService recebido. email = ${email}`);
    const userAlreadyExists = await this.usersRepository.findOne({
      where: { email },
      relations: ['profile'],
    });

    logger.debug(`Return findByEmail ....`);
    logger.debug(userAlreadyExists);

    return userAlreadyExists;
  }
}

export { UsersService };
