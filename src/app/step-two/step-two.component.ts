import { Component, inject } from '@angular/core';
import { FormProviderService } from '../services/form-provider.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-step-two',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule, NgFor, NgIf, CurrencyPipe],
  templateUrl: './step-two.component.html',
})
export class StepTwoComponent {
  formProviderService = inject(FormProviderService);
  cartService = inject(CartService);
  hasTowCheckbox = this.formProviderService.hasTowCheckbox;
  hasYokeCheckbox = this.formProviderService.hasYokeCheckbox;
  carConfigs = this.cartService.carConfigs;
  selectedCarConfig = this.cartService.selectedCarConfig;
  stepsForm = this.formProviderService.getStepsForm();
}
