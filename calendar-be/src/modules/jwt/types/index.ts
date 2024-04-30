import { ObjectId } from 'mongodb';

export interface JWT {
  _id: ObjectId;
  email: string;
}
