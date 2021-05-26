import { getCustomRepository, Repository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';
import { ProfilesRepository } from '../repositories/ProfilesRepository';
import { logger } from '../logger';
import { User, UserRole } from '../entities/User';
import { Profile, Gender } from '../entities/Profile';

interface IUsersCreate {
  id?: string;
  email: string;
  first_name: string;
  last_name: string;
  role?: UserRole;
  password?: string;
  gender?: Gender;
  photo?: string;
  profile_id?: string;
  provider?: string;
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
    gender,
    photo,
    provider,
    password,
  }: IUsersCreate) {
    logger.debug('UsersService create recebido.');

    const userAlreadyExists = await this.usersRepository.findOne({ email });

    if (userAlreadyExists) {
      throw new Error('Usuário já existe!');
    }

    const profile = this.profilesRepository.create({ gender, photo });
    await this.profilesRepository.save(profile);
    logger.debug('profile.');
    logger.debug(profile);

    const user = this.usersRepository.create({
      email,
      first_name,
      last_name,
      role,
      profile,
      provider,
    });
    user.password = password;

    const userCreate = await this.usersRepository.save(user);

    logger.debug(`userCreate ---------------------------------- `);
    logger.debug(userCreate);
    delete userCreate.profile_id;
    delete userCreate.profile;
    delete userCreate.password;
    delete userCreate.password_salt;
    delete userCreate.password_hash;
    return userCreate;
  }

  async update({
    id,
    first_name,
    last_name,
    role,
    password,
    gender,
    photo,
    provider,
  }: IUsersCreate) {
    logger.debug('UsersService update recebido.');

    const userExists = await this.usersRepository.findOne({ id });

    if (!userExists) {
      throw new Error('Usuário não existe!');
    }
    logger.debug('userExists.');
    logger.debug(userExists);

    const profile = this.profilesRepository.create({ gender, photo });
    await this.profilesRepository.save(profile);
    logger.debug('profile.');
    logger.debug(profile);

    const user = this.usersRepository.create({
      id,
      first_name,
      last_name,
      role,
      profile,
      provider,
      password,
    });
    logger.debug(user);

    const userCreate = await this.usersRepository.save(user);

    delete userCreate.password;
    delete userCreate.password_salt;

    return userCreate;
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

  async findById({ id }) {
    logger.debug(`findById UsersService recebido. email = ${id}`);
    const userExists = await this.usersRepository.findOne({
      where: { id },
      relations: ['profile'],
    });

    logger.debug(`Return findById ....`);
    logger.debug(userExists);

    return userExists;
  }
}

export { UsersService };
