import { Routes } from '@angular/router';
import { ROUTES } from './shared/constants/routes';
import { canActivateFormStep } from './services/form.guard';

export const routes: Routes = [
  { path: '', redirectTo: ROUTES.STEP_ONE, pathMatch: 'full' },
  {
    path: ROUTES.STEP_ONE,
    loadComponent: () =>
      import('./step-one/step-one.component').then(
        (mod) => mod.StepOneComponent
      ),
  },
  {
    path: ROUTES.STEP_TWO,
    loadComponent: () =>
      import('./step-two/step-two.component').then(
        (mod) => mod.StepTwoComponent
      ),
    canActivate: [canActivateFormStep],
  },
  {
    path: ROUTES.STEP_THREE,
    loadComponent: () =>
      import('./step-three/step-three.component').then(
        (mod) => mod.StepThreeComponent
      ),
    canActivate: [canActivateFormStep],
  },
];
