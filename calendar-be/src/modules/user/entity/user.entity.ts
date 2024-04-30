import { ObjectId } from 'mongodb';
import { Entity } from 'typeorm';
import { Column } from 'typeorm/decorator/columns/Column';
import { CreateDateColumn } from 'typeorm/decorator/columns/CreateDateColumn';
import { ObjectIdColumn } from 'typeorm/decorator/columns/ObjectIdColumn';
import { UpdateDateColumn } from 'typeorm/decorator/columns/UpdateDateColumn';

@Entity('user')
export class User {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ type: 'string' })
  name: string;

  @Column({ type: 'string', unique: true })
  email: string;

  @Column({ type: 'string', select: false })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
