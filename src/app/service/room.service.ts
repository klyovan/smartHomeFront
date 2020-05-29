import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Room} from '../core/model/room.model';
import {Observable} from 'rxjs';
import {URL_BACK} from '../app.component';


@Injectable({
  providedIn: 'root'
})
export class RoomService {
  rooms: Array<Room>;

  constructor(private http: HttpClient) {
  }

  getRooms(): Observable<Room> {
    return this.http.get<Room>(URL_BACK + 'api/room');
  }

  createRoom(room: Room): Observable<BigInteger> {
    return this.http.post<BigInteger>(URL_BACK + 'api/room', room);
  }

  deleteRoom(roomId: bigint): Observable<BigInteger> {
    return this.http.delete<BigInteger>(URL_BACK + 'api/room/' + roomId);
  }
}
