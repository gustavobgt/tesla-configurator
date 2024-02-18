import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'step-one', pathMatch: 'full' },
  {
    path: 'step-one',
    loadComponent: () =>
      import('./step-one/step-one.component').then(
        (mod) => mod.StepOneComponent
      ),
  },
  {
    path: 'step-two',
    loadComponent: () =>
      import('./step-two/step-two.component').then(
        (mod) => mod.StepTwoComponent
      ),
  },
  {
    path: 'step-three',
    loadComponent: () =>
      import('./step-three/step-three.component').then(
        (mod) => mod.StepThreeComponent
      ),
  },
];
