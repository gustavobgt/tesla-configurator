import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CarModelService } from './services/car-model.service';
import { Observable } from 'rxjs';
import { CarModel } from '../models/car-model.model';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { CarColor } from '../models/car-color.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-step-one',
  standalone: true,
  imports: [HttpClientModule, NgFor, NgIf, ReactiveFormsModule],
  providers: [CarModelService],
  templateUrl: './step-one.component.html',
  styleUrl: './step-one.component.scss',
})
export class StepOneComponent implements OnInit {
  carModels!: CarModel[];
  selectedModelColors?: CarColor[];
  stepOneForm = new FormGroup({
    modelCode: new FormControl<CarModel['code'] | null>(null, [
      Validators.required,
    ]),
    modelColor: new FormControl<CarColor['code'] | null>(null, [
      Validators.required,
    ]),
  });

  constructor(private carModelService: CarModelService) {}

  ngOnInit(): void {
    this.getCarModels().subscribe((carModels) => (this.carModels = carModels));
    // TODO: unsubscribe ????
    this.stepOneForm
      .get('modelCode')
      ?.valueChanges.subscribe((modelCode) => this.onModelChange(modelCode));
  }

  onModelChange(modelCode: CarModel['code'] | null) {
    const foundedModel = this.carModels.find(
      (cardModel) => cardModel.code === modelCode
    );
    if (!foundedModel) return;
    this.selectedModelColors = foundedModel.colors;

    const defaultColor = this.selectedModelColors[0].code;

    this.stepOneForm.controls['modelColor'].setValue(defaultColor);
  }

  getCarModels() {
    return this.carModelService.getCarModels();
  }
}
