import { Component, inject } from '@angular/core';
import { FormProviderService } from '../services/form-provider.service';
import { AsyncPipe, CurrencyPipe, NgIf } from '@angular/common';
import { CartService } from '../services/cart.service';
import { CarModelImgDirective } from '../directives/car-model-img.directive';

@Component({
  selector: 'app-step-three',
  standalone: true,
  imports: [NgIf, CurrencyPipe, AsyncPipe, CarModelImgDirective],
  templateUrl: './step-three.component.html',
})
export class StepThreeComponent {
  cartService = inject(CartService);
  selectedCarConfig = this.cartService.selectedCarConfig;
  selectedModel = this.cartService.selectedModel;
  selectedModelColor = this.cartService.selectedModelColor;
  totalCost = this.cartService.totalCost;
  formProviderService = inject(FormProviderService);
  includeTow = this.formProviderService.includeTow;
  includeYoke = this.formProviderService.includeYoke;
}
