import { Component, OnInit } from '@angular/core';
import { CarOptionsService } from './services/car-options.service';
import { FormProviderService } from '../services/form-provider.service';
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
  carConfigs: CarConfig[] = [];
  selectedCarConfig: CarConfig | null = null;
  hasIncludeTowCheckbox: boolean = false;
  hasIncludeYokeCheckbox: boolean = false;

  constructor(
    private formProviderService: FormProviderService,
    private carOptionsService: CarOptionsService
  ) {}

  ngOnInit(): void {
    this.getCarConfigs();
    this.handleCarConfigChanges();
  }

  getCarConfigs() {
    const carModelCode = this.formProviderService
      .getStepsForm()
      .get('model.modelCode')?.value;
    if (!carModelCode) return;

    this.carOptionsService.getCarOptions(carModelCode).subscribe((data) => {
      this.carConfigs = data.configs;
      this.hasIncludeTowCheckbox = data.towHitch;
      this.hasIncludeYokeCheckbox = data.yoke;
    });
  }

  handleCarConfigChanges() {
    const configIdControl = this.stepsForm.get('configAndOptions.configId');

    if (!configIdControl) return;
    // TODO: unsubscribe ????
    configIdControl.valueChanges.subscribe((configId) =>
      this.formProviderService.onCarConfigChange(configId, this.carConfigs)
    );
    // TODO: unsubscribe ????
    this.formProviderService.selectedCarConfig$.subscribe((value) => {
      this.selectedCarConfig = value;
    });
  }

  get stepsForm() {
    return this.formProviderService.getStepsForm();
  }
}
