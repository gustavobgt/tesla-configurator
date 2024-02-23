import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { FormProviderService } from './form-provider.service';
import { ROUTES } from '../shared/constants/routes';
import { inject } from '@angular/core';

const steps = {
  [ROUTES.STEP_TWO]: 2,
  [ROUTES.STEP_THREE]: 3,
} as const;

export const canActivateFormStep: CanActivateFn = (
  route: ActivatedRouteSnapshot
) => {
  const routerPath = route.routeConfig?.path;

  if (!routerPath) return false;

  if ([`${ROUTES.STEP_TWO}`, `${ROUTES.STEP_THREE}`].includes(routerPath)) {
    const stepPath = routerPath as ROUTES.STEP_TWO | ROUTES.STEP_THREE;
    const step = steps[stepPath];
    const canActivate = inject(FormProviderService).canActivateFormStep(step);
    return canActivate ? true : inject(Router).createUrlTree([`/${ROUTES.STEP_ONE}`]);
  }

  return false;
};
