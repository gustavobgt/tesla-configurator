import { Component, OnInit } from '@angular/core';
import { CarOptionsService } from './services/car-options.service';
import { FormProviderService } from '../services/form-provider.service';
import { StepsForm } from '../services/form-provider.model';
import { CarOptions } from '../models/car-options.model';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-step-two',
  standalone: true,
  imports: [HttpClientModule],
  providers: [CarOptionsService],
  templateUrl: './step-two.component.html',
  styleUrl: './step-two.component.scss',
})
export class StepTwoComponent implements OnInit {
  stepsForm!: StepsForm;
  carOptions!: CarOptions;

  constructor(
    private formProviderService: FormProviderService,
    private carOptionsService: CarOptionsService
  ) {}

  ngOnInit(): void {
    const carModelCode = this.formProviderService
      .getStepsForm()
      .get('model.modelCode')?.value;
    if (!carModelCode) return;
    this.carOptionsService.getCarOptions(carModelCode).subscribe((data) => {
      console.log(data);
      this.carOptions = data;
    });
  }
}
