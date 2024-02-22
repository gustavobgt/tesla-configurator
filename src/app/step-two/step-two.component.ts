import { Component, OnInit } from '@angular/core';
import { CarOptionsService } from './services/car-options.service';
import { FormProviderService } from '../services/form-provider.service';
import { StepsForm } from '../services/form-provider.model';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CarConfig } from '../models/car-config.model';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-step-two',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule, NgFor, NgIf, CurrencyPipe],
  providers: [CarOptionsService],
  templateUrl: './step-two.component.html',
  styleUrl: './step-two.component.scss',
})
export class StepTwoComponent implements OnInit {
  stepsForm!: StepsForm;
  carConfigs: CarConfig[] = [];
  selectedCarConfig: CarConfig | null = null;

  constructor(
    private formProviderService: FormProviderService,
    private carOptionsService: CarOptionsService
  ) {}

  ngOnInit(): void {
    this.getCarConfigs();
    this.stepsForm = this.formProviderService.getStepsForm();
    this.handleCarConfigChanges();
  }

  getCarConfigs() {
    const carModelCode = this.formProviderService
      .getStepsForm()
      .get('model.modelCode')?.value;
    if (!carModelCode) return;

    this.carOptionsService.getCarOptions(carModelCode).subscribe((data) => {
      this.carConfigs = data.configs;
    });
  }

  handleCarConfigChanges() {
    const configIdControl = this.stepsForm.get('configAndOptions.configId');

    if (!configIdControl) return;
    // TODO: unsubscribe ????
    configIdControl.valueChanges.subscribe((configId) =>
      this.formProviderService.onCarConfigChange(configId, this.carConfigs)
    );
    this.formProviderService.selectedCarConfig$.subscribe((value) => {
      this.selectedCarConfig = value;
    });
  }
}
