import {User} from './user.model';

export class Room {
  id: bigint;
  name: string;
  link: string;
  user: User;
}
