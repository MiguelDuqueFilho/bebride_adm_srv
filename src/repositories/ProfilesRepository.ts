import { EntityRepository, Repository } from 'typeorm';
import { Profile } from '../entities/Profile';

@EntityRepository(Profile)
class ProfilesRepository extends Repository<Profile> {}

export { ProfilesRepository };
