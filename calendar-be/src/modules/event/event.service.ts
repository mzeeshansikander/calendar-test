import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventCreateDTO } from './dto/create.dto';
import { Event } from './entity/event.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private repository: Repository<Event>,
  ) {}

  create({ description, price, at }: EventCreateDTO) {}
}
