import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormProviderService } from '../../services/form-provider.service';
import { StepsForm } from '../../services/form-provider.model';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
})
export class TabsComponent implements OnInit {
  stepsForm!: StepsForm;

  constructor(
    private router: Router,
    private formProviderService: FormProviderService
  ) {}

  ngOnInit(): void {
    this.stepsForm = this.formProviderService.getStepsForm();
  }

  onNavigate(path: string) {
    this.router.navigate([path])
  }

  get isStepOneValid () {
    return this.stepsForm.controls['model'].valid
  }
}
