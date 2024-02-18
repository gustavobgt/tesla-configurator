import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CarModelService } from './services/car-model.service';
import { Observable } from 'rxjs';
import { CarModel } from '../models/car-model.model';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-step-one',
  standalone: true,
  imports: [HttpClientModule, NgFor, AsyncPipe, NgIf],
  providers: [CarModelService],
  templateUrl: './step-one.component.html',
  styleUrl: './step-one.component.scss',
})
export class StepOneComponent implements OnInit {
  carModels$!: Observable<CarModel[]>;

  constructor(private carModelService: CarModelService) {}

  ngOnInit(): void {
    this.carModels$ = this.getCarModels();
  }

  getCarModels() {
    return this.carModelService.getCarModels();
  }
}
