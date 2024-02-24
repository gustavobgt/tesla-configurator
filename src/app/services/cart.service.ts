import { Injectable, computed, inject, signal } from '@angular/core';
import { CarModel } from '../models/car-model.model';
import { CarService } from './car.service';
import { FormProviderService } from './form-provider.service';
import { CarConfig } from '../models/car-config.model';
import { Subscription } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class CartService {
  carModels = signal<CarModel[]>([]);
  carConfigs = signal<CarConfig[]>([]);
  formProviderService = inject(FormProviderService);
  private hasTowCheckbox = this.formProviderService.hasTowCheckbox;
  private hasYokeCheckbox = this.formProviderService.hasYokeCheckbox;
  modelCode = this.formProviderService.modelCode;
  modelColor = this.formProviderService.modelColor;
  modelCode$ = toObservable(this.modelCode);
  selectedModel = computed(() =>
    this.carModels().find((carModel) => carModel.code === this.modelCode())
  );
  selectedModelColor = computed(() => {
    return this.selectedModel()?.colors.find(
      (carColor) => carColor.code === this.modelColor()
    );
  });
  configId = this.formProviderService.configId;
  selectedCarConfig = computed(() =>
    this.carConfigs().find((carConfig) => carConfig.id === this.configId())
  );
  includeTow = this.formProviderService.includeTow;
  includeYoke = this.formProviderService.includeYoke;
  totalCost = computed(() => {
    const carConfigPrice = this.selectedCarConfig()?.price || 0;
    const modelColoPrice = this.selectedModelColor()?.price || 0;
    const includeTowPrice = this.includeTow() ? 1000 : 0;
    const includeYokePrice = this.includeYoke() ? 1000 : 0;

    return carConfigPrice + modelColoPrice + includeTowPrice + includeYokePrice;
  });
  stepsForm = this.formProviderService.getStepsForm();
  modelCodeSubscription?: Subscription;

  constructor(private carService: CarService) {}

  initializeCart() {
    this.modelCodeSubscription = this.modelCode$.subscribe((modelCode) => {
      this.formProviderService.handleOptionsCleanup();

      if (modelCode) {
        this.setCartOptions(modelCode);
      }

      const defaultColor = this.selectedModel()?.colors[0];

      if (!defaultColor) return;

      this.stepsForm.controls['model'].controls['modelColor'].setValue(
        defaultColor.code
      );
    });
    this.carService
      .getCarModels()
      .subscribe((carModels) => this.carModels.set(carModels));
  }

  cleanupAllSubscriptions() {
    this.modelCodeSubscription?.unsubscribe();
  }

  setCartOptions(carModelCode: string) {
    return this.carService.getCarOptions(carModelCode).subscribe((data) => {
      this.carConfigs.set(data.configs);
      this.hasTowCheckbox.set(data.towHitch);
      this.hasYokeCheckbox.set(data.yoke);
    });
  }
}
