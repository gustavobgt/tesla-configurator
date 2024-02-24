import { Component, OnInit } from '@angular/core';
import { CarOptionsService } from './services/car-options.service';
import { FormProviderService } from '../services/form-provider.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CarConfig } from '../models/car-config.model';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-step-two',
  standalone: true,
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    NgFor,
    NgIf,
    CurrencyPipe,
    AsyncPipe,
  ],
  providers: [CarOptionsService],
  templateUrl: './step-two.component.html',
})
export class StepTwoComponent implements OnInit {
  carConfigs: CarConfig[] = [];
  selectedCarConfig$?: Observable<CarConfig | null>;
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
    // TODO: unsubscribe ???? Usar async pipe
    configIdControl.valueChanges.subscribe((configId) =>
      this.formProviderService.onCarConfigChange(configId, this.carConfigs)
    );
    this.selectedCarConfig$ = this.formProviderService.selectedCarConfig$;
  }

  get stepsForm() {
    return this.formProviderService.getStepsForm();
  }
}
