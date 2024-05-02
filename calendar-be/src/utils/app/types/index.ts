import { Request } from 'express';
import { User } from 'src/modules/user/entity/user.entity';

export interface RequestUser {
  user?: User;
}

export interface CustomRequest extends Request {
  user: RequestUser;
}

export enum AuthorizationHeader {
  BEARER = 'Bearer Authorization',
  BASIC = 'Authorization',
}
