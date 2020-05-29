import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Room} from '../core/model/room.model';
import {Sensor} from '../core/model/sensor.model';
import {URL_BACK} from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  constructor(private http: HttpClient) {}

  getSensors(id: number): Observable<Sensor> {
    return this.http.get<Sensor>(URL_BACK + 'api/room/' + id);
  }

  createSensor(sensor: Sensor): Observable<BigInteger> {
    return this.http.post<BigInteger>(URL_BACK + 'api/sensor', sensor);
  }

  deleteSensor(sensorId: bigint): Observable<BigInteger> {
    return this.http.delete<BigInteger>(URL_BACK + 'api/sensor/' + sensorId);
  }
}
