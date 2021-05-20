import { getCustomRepository, Repository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';
import { logger } from '../logger';
import { User } from '../entities/User';

interface IUsersCreate {
  name?: string;
  email: string;
  password?: string;
  role?: string;
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
      throw new Error('User Already exists!');
    }

    const user = this.usersRepository.create({
      name,
      email,
      password,
      role,
      provider,
      image,
    });
    await this.usersRepository.save(user);
    return user;
  }
}

export { UsersService };
