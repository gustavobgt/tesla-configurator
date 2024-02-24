import { Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CarModel } from '../models/car-model.model';
import { CarColor } from '../models/car-color.model';
import { CarConfig } from '../models/car-config.model';

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
    configAndOptions: new FormGroup({
      configId: new FormControl<CarConfig['id'] | null>(null, [
        Validators.required,
      ]),
      includeTow: new FormControl<boolean>(false),
      includeYoke: new FormControl<boolean>(false),
    }),
  });
  modelCode = toSignal(
    this.stepsForm.controls['model'].controls['modelCode'].valueChanges,
    { initialValue: null }
  );
  modelColor = toSignal(
    this.stepsForm.controls['model'].controls['modelColor'].valueChanges,
    { initialValue: null }
  );
  configId = toSignal(
    this.stepsForm.controls['configAndOptions'].controls['configId']
      .valueChanges,
    { initialValue: null }
  );
  includeTow = toSignal(
    this.stepsForm.controls['configAndOptions'].controls['includeTow']
      .valueChanges,
    { initialValue: false }
  );
  includeYoke = toSignal(
    this.stepsForm.controls['configAndOptions'].controls['includeYoke']
      .valueChanges,
    { initialValue: false }
  );

  getStepsForm() {
    return this.stepsForm;
  }

  canActivateFormStep(step: 2 | 3) {
    const steps = {
      2: this.stepsForm.controls['model'].valid,
      3: this.stepsForm.controls['configAndOptions'].valid,
    };
    return steps[step];
  }
}
