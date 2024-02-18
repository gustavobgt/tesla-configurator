import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarModel } from '../../models/car-model.model';

@Injectable()
export class CarModelService {
  constructor(private httpClient: HttpClient) {}

  getCarModels() {
    return this.httpClient.get<CarModel[]>('/models');
  }
}
