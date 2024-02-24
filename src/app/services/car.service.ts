import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarModel } from '../models/car-model.model';
import { CarOptions } from '../models/car-options.model';

@Injectable({ providedIn: 'root' })
export class CarService {
  constructor(private httpClient: HttpClient) {}

  getCarModels() {
    return this.httpClient.get<CarModel[]>('/models');
  }

  getCarOptions(carModelCode: CarModel['code']) {
    return this.httpClient.get<CarOptions>(`/options/${carModelCode}`);
  }
}
