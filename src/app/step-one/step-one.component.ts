import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CarModelService } from './services/car-model.service';
import { CarModel } from '../models/car-model.model';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { CarColor } from '../models/car-color.model';
import { ReactiveFormsModule } from '@angular/forms';
import { CarModelImgDirective } from './directives/car-model-img.directive';
import { FormProviderService } from '../services/form-provider.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-step-one',
  standalone: true,
  imports: [
    HttpClientModule,
    NgFor,
    NgIf,
    ReactiveFormsModule,
    CarModelImgDirective,
    AsyncPipe,
  ],
  providers: [CarModelService],
  templateUrl: './step-one.component.html',
})
export class StepOneComponent implements OnInit {
  carModels: CarModel[] = [];
  selectedModel$?: Observable<CarModel | null>;

  constructor(
    private carModelService: CarModelService,
    private formProviderService: FormProviderService
  ) {}

  ngOnInit(): void {
    this.getCarModels();
    this.handleModelCodeChanges();
    this.selectedModel$ = this.formProviderService.selectedModel$;
  }

  getCarModels() {
    this.carModelService
      .getCarModels()
      .subscribe((carModels) => (this.carModels = carModels));
  }

  handleModelCodeChanges() {
    const modelCodeControl = this.stepsForm.get('model.modelCode');

    if (!modelCodeControl) return;
    // TODO: COLOCAR ESSA REGRA NO FORMS PROVIDER
    modelCodeControl.valueChanges.subscribe((modelCode) =>
      this.formProviderService.onModelChange(modelCode, this.carModels)
    );
  }

  get modelCode() {
    return this.stepsForm.get('model.modelCode')?.value;
  }

  get modelColor() {
    return this.stepsForm.get('model.modelColor')?.value;
  }

  get stepsForm() {
    return this.formProviderService.getStepsForm();
  }
}
