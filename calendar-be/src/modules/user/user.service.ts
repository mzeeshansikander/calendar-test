import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'typeorm';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';
import { Repository } from 'typeorm/repository/Repository';
import { UserRegisterDTO } from '../auth/dto/register.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  findByEmail(
    email: string,
    relations?: FindOptionsRelations<User>,
    select?: FindOptionsSelect<User>,
  ) {
    return this.repository.findOne({ where: { email }, relations, select });
  }

  findById(_id: ObjectId) {
    return this.repository.findOne({ where: { _id } });
  }

  register({ email, name, password }: UserRegisterDTO) {
    return this.repository.save({ email, name, password });
  }
}
