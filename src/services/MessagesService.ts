import { getCustomRepository, Repository } from 'typeorm';
import { MessagesRepository } from '../repositories/MessagesRepository';
import { logger } from '../logger';
import { Message } from '../entities/Message';

interface IMessagesCreate {
  admin_id?: number;
  user_id: number;
  text: string;
}

class MessagesService {
  private messagesRepository: Repository<Message>;

  constructor() {
    this.messagesRepository = getCustomRepository(MessagesRepository);
  }

  async create({ admin_id, user_id, text }: IMessagesCreate) {
    logger.debug('/messages MessagesService create recebido.');

    const message = this.messagesRepository.create({
      admin_id,
      text,
      user_id,
    });
    await this.messagesRepository.save(message);
    return message;
  }
  async listByuser(user_id: number) {
    logger.debug('get /messages MessagesService listByuser recebido.');

    const list = this.messagesRepository.find({
      where: { user_id },
      relations: ['user'],
    });

    return list;
  }
}

export { MessagesService };
