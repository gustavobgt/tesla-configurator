import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormProviderService } from '../../services/form-provider.service';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
})
export class TabsComponent {

  constructor(
    private router: Router,
    private formProviderService: FormProviderService
  ) {}

  onNavigate(path: string) {
    this.router.navigate([path])
  }

  get isStepOneValid () {
    return this.stepsForm.controls['model'].valid
  }

  get isStepTwoValid () {
    return this.stepsForm.controls['configAndOptions'].valid
  }

  get stepsForm() {
    return this.formProviderService.getStepsForm();
  }
}
