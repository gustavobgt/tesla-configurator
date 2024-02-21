import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarModel } from '../../models/car-model.model';
import { CarOptions } from '../../models/car-options.model';

@Injectable()
export class CarOptionsService {
  constructor(private httpClient: HttpClient) {}

  getCarOptions(carModelCode: CarModel['code']) {
    return this.httpClient.get<CarOptions>(`/options/${carModelCode}`);
  }
}
