import { getCustomRepository, Repository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';
import { ProfilesRepository } from '../repositories/ProfilesRepository';
import { logger } from '../logger';
import { lError, catchError } from '../messages/langMessage';
import { User, UserRole } from '../entities/User';
import { Profile, Gender } from '../entities/Profile';

interface IUsersCreate {
  id?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
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
      throw new lError('userExiste', 200);
    }

    const profile = this.profilesRepository.create({ gender, photo });
    await this.profilesRepository.save(profile);

    const user = this.usersRepository.create({
      email,
      first_name,
      last_name,
      role,
      provider,
      profile,
    });
    user.password = password;

    const userCreate = await this.usersRepository.save(user);

    const userFind = await this.usersRepository.findOne({
      select: ['id', 'email', 'first_name', 'last_name', 'role', 'provider'],
      where: { id: userCreate.id },
      relations: ['profile'],
    });

    logger.trace('>>> UsersService create return ..............');
    logger.trace(userFind);
    logger.trace('<<< UsersService create return ..............');
    return userFind;
  }

  async update({
    id,
    first_name,
    last_name,
    provider,
    role,
    password,
    gender,
    photo,
  }: IUsersCreate) {
    logger.debug('>>> UsersService update.');

    let userFindOne = await this.usersRepository.findOne({
      where: { id },
      relations: ['profile'],
    });

    if (!userFindOne) {
      throw new lError('userNotFound', 200);
    }
    logger.trace('userFindOne before update.');
    logger.trace(userFindOne);

    /**
     * update profile
     */

    const updateProfile = { gender, photo };
    logger.trace('updateProfile.');
    logger.trace(updateProfile);

    const profile = this.profilesRepository.create({
      ...userFindOne.profile,
      ...updateProfile,
    });

    logger.trace('profilesRepository create.');
    logger.trace(profile);

    const profileUpdate = await this.profilesRepository.save(profile);
    logger.trace('>>> profileUpdate ..............................');
    logger.trace(profileUpdate);
    logger.trace('<<< profileUpdate ..............................');

    /**
     * update user
     */

    let updateUser = {
      first_name,
      last_name,
      provider,
      role,
    };

    const user = this.usersRepository.create({
      ...userFindOne,
      ...updateUser,
    });

    if (password) user.password = password;

    const userUpdate = await this.usersRepository.save(user);

    logger.trace('>>> userUpdate ..............................');
    logger.trace(userUpdate);
    logger.trace('<<< userUpdate ..............................');

    const userFind = await this.usersRepository.findOne({
      select: ['id', 'email', 'first_name', 'last_name', 'role', 'provider'],
      where: { id: userUpdate.id },
      relations: ['profile'],
    });

    return userFind;
  }

  async findByEmail({ email }) {
    logger.debug(`findByEmail UsersService recebido. email = ${email}`);
    const user = await this.usersRepository.findOne({
      select: ['id', 'email', 'first_name', 'last_name', 'role', 'provider'],
      where: { email },
      relations: ['profile'],
    });

    logger.trace(`>>> Return findByEmail ....`);
    logger.trace(user);
    logger.trace(`<<< Return findByEmail ....`);
    return user;
  }

  async findById({ id }) {
    logger.debug(`findById UsersService recebido. email = ${id}`);
    const user = await this.usersRepository.findOne({
      select: ['id', 'email', 'first_name', 'last_name', 'role', 'provider'],
      where: { id },
      relations: ['profile'],
    });

    logger.trace(`>>> Return findById ....`);
    logger.trace(user);
    logger.trace(`>>> Return findById ....`);

    return user;
  }

  async login({ email, password }) {
    logger.debug(`login UsersService email = ${email} e password`);

    const user = await this.usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new lError('userNotFound', 401);
    }

    user.password = password;

    logger.trace(`>>> login findOne ....`);
    logger.trace(user);
    logger.trace(`>>> login findOne ....`);

    if (!user.checkPassword) {
      throw new lError('userOrPswInv', 401);
    }

    const payload = { ...user.generateToken };

    return { status: 200, user: { ...payload } };
  }
}

export { UsersService };
