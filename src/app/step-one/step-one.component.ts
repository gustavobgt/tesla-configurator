import { Component, inject } from '@angular/core'
import { NgFor, NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CarModelImgDirective } from '../directives/car-model-img.directive';
import { FormProviderService } from '../services/form-provider.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-step-one',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule, CarModelImgDirective],
  providers: [],
  templateUrl: './step-one.component.html',
})
export class StepOneComponent {
  cartService = inject(CartService);
  formProviderService = inject(FormProviderService);
  carModels = this.cartService.carModels;
  selectedModel = this.cartService.selectedModel;
  modelCode = this.formProviderService.modelCode;
  modelColor = this.formProviderService.modelColor;
  stepsForm =  this.formProviderService.getStepsForm();
}
