import { EntityRepository, Repository } from 'typeorm';
import { ConnectionChat } from '../entities/ConnectionChat';

@EntityRepository(ConnectionChat)
class ConnectionsRepository extends Repository<ConnectionChat> {}

export { ConnectionsRepository };
