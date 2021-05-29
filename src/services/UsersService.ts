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
    logger.debug('>>> UsersService create.');

    const userAlreadyExists = await this.usersRepository.findOne({ email });

    if (userAlreadyExists) {
      throw new Error('Usuário já existe!');
    }

    const profile = this.profilesRepository.create({ gender, photo });
    await this.profilesRepository.save(profile);

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

    const userFind = await this.findById({ id: userCreate.id });
    logger.trace('>>> UsersService create return ..............');
    logger.trace(userFind);
    logger.trace('<<< UsersService create return ..............');
    return userFind;
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
    logger.debug('>>> UsersService update.');

    const userExists = await this.usersRepository.findOne({ id });

    if (!userExists) {
      throw new Error('Usuário não existe!');
    }
    logger.debug('userExists.');
    logger.debug(userExists);

    const profile = this.profilesRepository.create({ gender, photo });
    const profileCreate = await this.profilesRepository.save(profile);
    logger.trace('>>> profileCreate ..............................');
    logger.trace(profileCreate);
    logger.trace('<<< profileCreate ..............................');

    const user = this.usersRepository.create({
      id,
      first_name,
      last_name,
      role,
      profile,
      provider,
      password,
    });

    const userCreate = await this.usersRepository.save(user);

    const userFind = await this.findById({ id: userCreate.id });

    return userFind;
  }

  async findByEmail({ email }) {
    logger.debug(`findByEmail UsersService recebido. email = ${email}`);
    const userAlreadyExists = await this.usersRepository.findOne({
      select: [
        'id',
        'email',
        'first_name',
        'last_name',
        'role',
        'provider',
        'password_hash',
      ],
      where: { email },
      relations: ['profile'],
    });

    logger.trace(`>>> Return findByEmail ....`);
    logger.trace(userAlreadyExists);
    logger.trace(`<<< Return findByEmail ....`);
    return userAlreadyExists;
  }

  async findById({ id }) {
    logger.debug(`findById UsersService recebido. email = ${id}`);
    const userExists = await this.usersRepository.findOne({
      select: ['id', 'email', 'first_name', 'last_name', 'role', 'provider'],
      where: { id },
      relations: ['profile'],
    });

    logger.trace(`>>> Return findById ....`);
    logger.trace(userExists);
    logger.trace(`>>> Return findById ....`);

    return userExists;
  }
}

export { UsersService };
