import { getCustomRepository, Repository } from 'typeorm';
import { EventsRepository } from '../repositories/EventsRepository';
import { logger } from '../logger';
import { Event, EventStatus } from '../entities/Event';

interface IEventsCreate {
  id?: string;
  title: string;
  status: EventStatus;
  initial_date: Date;
  event_date: Date;
}

class EventsService {
  private EventsRepository: Repository<Event>;

  constructor() {
    this.EventsRepository = getCustomRepository(EventsRepository);
  }

  async create({ title, status, initial_date, event_date }: IEventsCreate) {
    logger.debug('/Events EventsService create recebido.');

    const event = this.EventsRepository.create({
      title,
      status,
      initial_date,
      event_date,
    });
    logger.debug(event);
    await this.EventsRepository.save(event);
    return event;
  }

  async findByID({ id }) {
    logger.debug(`EventsService recebido. email = ${id}`);
    const eventExists = await this.EventsRepository.findOne({
      id,
    });
    logger.debug(`eventExists ....`);
    logger.debug(eventExists);
    return eventExists;
  }
}

export { EventsService };
