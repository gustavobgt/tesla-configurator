import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CarModel } from '../models/car-model.model';
import { CarColor } from '../models/car-color.model';
import { BehaviorSubject } from 'rxjs';
import { CarConfig } from '../models/car-config.model';

@Injectable({
  providedIn: 'root',
})
export class FormProviderService {
  private model$ = new BehaviorSubject<CarModel | null>(null);
  selectedModel$ = this.model$.asObservable();
  private carConfig$ = new BehaviorSubject<CarConfig | null>(null);
  selectedCarConfig$ = this.carConfig$.asObservable();
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

  onModelChange(modelCode: CarModel['code'] | null, carModels: CarModel[]) {
    const foundedModel = carModels.find(
      (cardModel) => cardModel.code === modelCode
    );
    if (!foundedModel) return;
    this.model$.next(foundedModel);

    const defaultColor = foundedModel.colors[0].code;

    this.stepsForm.controls['model'].controls['modelColor'].setValue(
      defaultColor
    );

    if (this.configIdControl.value) {
      this.configIdControl.setValue(null);
      this.carConfig$.next(null);
    }

    this.includeTowControl.setValue(false);
    this.includeYokeControl.setValue(false);
  }

  onCarConfigChange(configId: CarConfig['id'] | null, carConfigs: CarConfig[]) {
    if (!configId || carConfigs.length === 0) return;

    const foundedCarConfig = carConfigs.find(
      (carconfig) => carconfig.id === configId
    );

    if (!foundedCarConfig) return;

    this.carConfig$.next(foundedCarConfig);
  }

  getStepsForm() {
    return this.stepsForm;
  }

  get configIdControl() {
    return this.stepsForm.controls['configAndOptions'].controls['configId'];
  }

  get includeTowControl() {
    return this.stepsForm.controls['configAndOptions'].controls['includeTow'];
  }

  get includeYokeControl() {
    return this.stepsForm.controls['configAndOptions'].controls['includeYoke'];
  }
}
