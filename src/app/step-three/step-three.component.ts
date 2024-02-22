import { Component, OnInit } from '@angular/core';
import { CarModel } from '../models/car-model.model';
import { FormProviderService } from '../services/form-provider.service';
import {
  AsyncPipe,
  CurrencyPipe,
  NgIf,
  NgTemplateOutlet,
} from '@angular/common';
import { CarConfig } from '../models/car-config.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-step-three',
  standalone: true,
  imports: [NgIf, CurrencyPipe, AsyncPipe],
  templateUrl: './step-three.component.html',
})
export class StepThreeComponent implements OnInit {
  selectedModel: CarModel | null = null;
  selectedCarConfig: CarConfig | null = null;

  constructor(private formProviderService: FormProviderService) {}

  ngOnInit(): void {
    this.formProviderService.selectedModel$.subscribe((selectedModel) => {
      this.selectedModel = selectedModel;
    });
    this.formProviderService.selectedCarConfig$.subscribe(
      (selectedCarConfig) => {
        this.selectedCarConfig = selectedCarConfig;
      }
    );
  }

  get selectedModelColor() {
    const modelColorCode =
      this.stepsForm.controls['model'].controls['modelColor'].value;
    return this.selectedModel?.colors.find((selectedModelColor) => {
      return selectedModelColor.code === modelColorCode;
    });
  }

  get hasTowHitchPackage() {
    return this.stepsForm.controls['configAndOptions'].controls['includeTow']
      .value;
  }

  get hasYokePackage() {
    return this.stepsForm.controls['configAndOptions'].controls['includeYoke']
      .value;
  }

  get stepsForm() {
    return this.formProviderService.getStepsForm();
  }
}
