import { getCustomRepository, Repository } from 'typeorm';
import { PersonsRepository } from '../repositories/PersonsRepository';
import { logger } from '../logger';
import { Person, Gender } from '../entities/Person';
import { User } from '../entities/User';
import { Event } from '../entities/Event';

interface IPersonsCreate {
  id?: string;
  name: string;
  gender: Gender;
  user_id: string;
  event_id: string;
}

class PersonsService {
  private PersonsRepository: Repository<Person>;

  constructor() {
    this.PersonsRepository = getCustomRepository(PersonsRepository);
  }

  async create({ name, gender, user_id, event_id }: IPersonsCreate) {
    logger.debug('/Persons PersonsService create recebido.');

    const PersonAlreadyExists = await this.PersonsRepository.findOne({
      user_id,
      event_id,
    });

    if (PersonAlreadyExists) {
      throw new Error('Usuário já existe para este evento!');
    }

    const person = this.PersonsRepository.create({
      name,
      gender,
      user_id,
      event_id,
    });
    logger.debug(person);
    await this.PersonsRepository.save(person);
    return person;
  }

  async findByPersonID({ id }) {
    logger.debug(`findByEmail PersonsService recebido. email = ${id}`);
    const PersonExists = await this.PersonsRepository.findOne({
      where: { id },
      relations: ['user', 'event'],
    });
    logger.debug(`PersonExists ....`);
    logger.debug(PersonExists);
    return PersonExists;
  }
}

export { PersonsService };
