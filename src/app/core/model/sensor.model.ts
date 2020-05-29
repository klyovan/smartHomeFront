import {User} from './user.model';
import {Room} from './room.model';

export class Sensor {
  id: BigInteger;
  name: string;
  link: string;
  room: Room;
  topic: string;
  msgOn: string;
  msgOff: string;
}
