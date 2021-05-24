import { getCustomRepository, Repository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';
import { logger } from '../logger';
import { User, UserRole } from '../entities/User';

interface IUsersCreate {
  name?: string;
  email: string;
  password?: string;
  role?: UserRole;
  provider?: string;
  image?: string;
}

class UsersService {
  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository);
  }

  async create({ name, email, password, role, provider, image }: IUsersCreate) {
    logger.debug('/users UsersService create recebido.');

    const userAlreadyExists = await this.usersRepository.findOne({ email });

    if (userAlreadyExists) {
      throw new Error('Usuário já existe!');
    }

    const user = this.usersRepository.create({
      name,
      email,
      password,
      role,
      provider,
      image,
    });
    logger.debug(user);
    await this.usersRepository.save(user);
    return user;
  }

  async findByEmail({ email }) {
    logger.debug(`findByEmail UsersService recebido. email = ${email}`);
    const userAlreadyExists = await this.usersRepository.findOne({ email });
    logger.debug(`userAlreadyExists ....`);
    logger.debug(userAlreadyExists);
    return userAlreadyExists;
  }
}

export { UsersService };
