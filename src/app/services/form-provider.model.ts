import { FormControl, FormGroup } from '@angular/forms';
import { CarModel } from '../models/car-model.model';
import { CarColor } from '../models/car-color.model';

export type StepsForm = FormGroup<{
  model: FormGroup<{
    modelCode: FormControl<CarModel['code'] | null>;
    modelColor: FormControl<CarColor['code'] | null>;
  }>;
}>;
