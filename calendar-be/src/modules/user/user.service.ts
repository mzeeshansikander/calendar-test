import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { Repository } from 'typeorm/repository/Repository';
import { UserRegisterDTO } from '../auth/dto/register.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  findByEmail(email: string) {
    return this.repository.findOne({ where: { email } });
  }

  findById(_id: ObjectId | string) {
    return this.repository.findOne({ where: { _id: new ObjectId(_id) } });
  }

  register({ email, name, password }: UserRegisterDTO) {
    return this.repository.save({ email, name, password });
  }
}
