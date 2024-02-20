import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CarModel } from '../models/car-model.model';
import { CarColor } from '../models/car-color.model';

@Injectable({
  providedIn: 'root',
})
export class FormProviderService {
  stepsForm = new FormGroup({
    model: new FormGroup({
      modelCode: new FormControl<CarModel['code'] | null>(null, [
        Validators.required,
      ]),
      modelColor: new FormControl<CarColor['code'] | null>(null, [
        Validators.required,
      ]),
    }),
  });

  getStepsForm() {
    return this.stepsForm;
  }
}
