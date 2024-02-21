import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CarModel } from '../models/car-model.model';
import { CarColor } from '../models/car-color.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormProviderService {
  private modelColors$ = new BehaviorSubject<CarColor[] | []>([]);
  selectedModelColors$ = this.modelColors$.asObservable();
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

  onModelChange(modelCode: CarModel['code'] | null, carModels: CarModel[]) {
    const foundedModel = carModels.find(
      (cardModel) => cardModel.code === modelCode
    );
    if (!foundedModel) return;
    this.modelColors$.next(foundedModel.colors);

    const defaultColor = foundedModel.colors[0].code;

    this.stepsForm.controls['model'].controls['modelColor'].setValue(
      defaultColor
    );
  }

  getStepsForm() {
    return this.stepsForm;
  }
}
