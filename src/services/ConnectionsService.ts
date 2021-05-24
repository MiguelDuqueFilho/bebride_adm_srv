import { getCustomRepository, Repository } from 'typeorm';
import { ConnectionsRepository } from '../repositories/ConnectionsRepository';
import { logger } from '../logger';
import { ConnectionChat } from '../entities/ConnectionChat';

interface IConnectionCreate {
  id?: string;
  socket_id: string;
  user_id: string;
  admin_id?: string;
}

class ConnectionsService {
  private connectionsRepository: Repository<ConnectionChat>;

  constructor() {
    this.connectionsRepository = getCustomRepository(ConnectionsRepository);
  }

  async create({ admin_id, socket_id, user_id }: IConnectionCreate) {
    logger.debug('ConnectionsService create recebido.');

    const connection = await this.connectionsRepository.create({
      admin_id,
      socket_id,
      user_id,
    });
    await this.connectionsRepository.save(connection);
    return connection;
  }

  async findByUserId(user_id: string) {
    logger.debug('ConnectionsService findByUserId recebido.');
    const connection = await this.connectionsRepository.findOne({ user_id });
    return connection;
  }

  async update({ admin_id, socket_id, user_id }: IConnectionCreate) {
    logger.debug('ConnectionsService update recebido.');
    const connection = await this.connectionsRepository
      .createQueryBuilder()
      .update(ConnectionChat)
      .set({ admin_id, socket_id })
      .where('user_id = :user_id', { user_id })
      .execute();

    return connection;
  }

  async findAllWithoutAdmin() {
    logger.debug('ConnectionsService findByUserId recebido.');
    const connection = await this.connectionsRepository.find({
      where: { admin_id: null },
      relations: ['user'],
    });
    return connection;
  }

  async findBySocketId(socket_id: string) {
    logger.debug('ConnectionsService findBySocketId recebido.');
    const connection = await this.connectionsRepository.findOne({
      socket_id,
    });
    return connection;
  }

  async updateAdminId(user_id: string, admin_id: string) {
    logger.debug('ConnectionsService findBySocketId recebido.');
    await this.connectionsRepository
      .createQueryBuilder()
      .update(ConnectionChat)
      .set({ admin_id })
      .where('user_id = :user_id', { user_id })
      .execute();
  }
}

export { ConnectionsService };
