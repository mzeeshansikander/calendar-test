import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('event')
export class Event {
  @ObjectIdColumn()
  _id: string;

  @Column({ type: 'string' })
  description: string;

  @Column({ type: 'number' })
  price: number;

  @Column({ type: 'timestamp' })
  at: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
