import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CarModelService } from './services/car-model.service';
import { CarModel } from '../models/car-model.model';
import { NgFor, NgIf } from '@angular/common';
import { CarColor } from '../models/car-color.model';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CarModelImgDirective } from './directives/car-model-img.directive';
import { FormProviderService } from '../services/form-provider.service';

@Component({
  selector: 'app-step-one',
  standalone: true,
  imports: [
    HttpClientModule,
    NgFor,
    NgIf,
    ReactiveFormsModule,
    CarModelImgDirective,
  ],
  providers: [CarModelService],
  templateUrl: './step-one.component.html',
  styleUrl: './step-one.component.scss',
})
export class StepOneComponent implements OnInit {
  carModels!: CarModel[];
  selectedModelColors?: CarColor[];
  stepsForm!: FormGroup<{
    model: FormGroup<{
      modelCode: FormControl<string | null>;
      modelColor: FormControl<string | null>;
    }>;
  }>;

  constructor(
    private carModelService: CarModelService,
    private formProviderService: FormProviderService
  ) {}

  ngOnInit(): void {
    this.getCarModels().subscribe((carModels) => (this.carModels = carModels));
    // TODO: unsubscribe ????
    this.stepsForm = this.formProviderService.getStepsForm();

    this.stepsForm
      .get('model.modelCode')
      ?.valueChanges.subscribe((modelCode) => this.onModelChange(modelCode));
  }

  onModelChange(modelCode: CarModel['code'] | null) {
    const foundedModel = this.carModels.find(
      (cardModel) => cardModel.code === modelCode
    );
    if (!foundedModel) return;
    this.selectedModelColors = foundedModel.colors;

    const defaultColor = this.selectedModelColors[0].code;

    this.stepsForm.controls['model'].controls['modelColor'].setValue(
      defaultColor
    );
  }

  getCarModels() {
    return this.carModelService.getCarModels();
  }
}
