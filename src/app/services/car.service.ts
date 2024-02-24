import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarModel } from '../models/car-model.model';
import { CarOptions } from '../models/car-options.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CarService {
  constructor(private httpClient: HttpClient) {}

  getCarModels(): Observable<CarModel[]> {
    return this.httpClient.get<CarModel[]>('/models');
  }

  getCarOptions(carModelCode: CarModel['code']): Observable<CarOptions> {
    return this.httpClient.get<CarOptions>(`/options/${carModelCode}`);
  }
}
