import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { throwHttpException } from 'src/utils/app/http-exception';
import { FindOptionsWhere, Repository } from 'typeorm';
import { User } from '../user/entity/user.entity';
import { EventCreateDTO } from './dto/create.dto';
import { EventUpdateDTO } from './dto/update.dto';
import { Event } from './entity/event.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private repository: Repository<Event>,
  ) {}

  getDateRange(start?: string, end?: string) {
    if (!start || !end) {
      return null;
    }

    const startDate = new Date(start);
    const endDate = new Date(end);
    const isStartValid = !isNaN(startDate.getTime());
    const isEndValid = !isNaN(endDate.getTime());
    if (!isStartValid || !isEndValid) {
      throwHttpException('Invalid start or end date', HttpStatus.BAD_REQUEST);
    }

    const startMillis = startDate.getTime();
    const endMillis = endDate.getTime();

    if (endMillis < startMillis) {
      throwHttpException(
        'End date cannot be before start date',
        HttpStatus.BAD_REQUEST,
      );
    }

    return { start: startDate.toISOString(), end: endDate.toISOString() };
  }

  create(user: User, { description, price, at }: EventCreateDTO) {
    const event = this.repository.create({
      at,
      price,
      description,
      owner: user._id,
    });
    return this.repository.save(event);
  }

  findById(_id: ObjectId | string) {
    return this.repository.findOne({ where: { _id: new ObjectId(_id) } });
  }

  async get(limit = 10, offset = 0, start?: string, end?: string, user?: User) {
    const { start: startDate, end: endDate } =
      this.getDateRange(start, end) || {};

    let where: FindOptionsWhere<Event> = {};

    if (startDate && endDate) {
      where.at = {
        $gte: startDate,
        $lte: endDate,
      } as unknown as Date;
    }

    if (user) {
      where.owner = new ObjectId(user._id);
    }

    const [events, total] = await this.repository.findAndCount({
      where,
      take: limit,
      skip: offset,
    });

    return {
      events,
      meta: {
        total,
        limit,
        offset,
        page: Math.ceil(offset / limit) + 1,
      },
    };
  }

  async update(
    { _id: userId }: User,
    _id: string,
    { at, description, price }: EventUpdateDTO,
  ) {
    const event = await this.shouldExist(_id);
    const { owner } = event;
    if (owner.toString() !== userId.toString()) {
      throwHttpException('Event not found', HttpStatus.NOT_FOUND);
    }

    event.at = at || event.at;
    event.description = description || event.description;
    event.price = price || event.price;

    return this.repository.save(event);
  }

  async delete({ _id: userId }: User, _id: string) {
    const event = await this.shouldExist(_id);
    const { owner } = event;
    if (owner.toString() !== userId.toString()) {
      throwHttpException('Event not found', HttpStatus.NOT_FOUND);
    }

    return this.repository.remove(event);
  }

  async shouldExist(_id: string) {
    const event = await this.findById(_id);
    if (!event) throwHttpException('Event not found', HttpStatus.NOT_FOUND);
    return event;
  }
}
