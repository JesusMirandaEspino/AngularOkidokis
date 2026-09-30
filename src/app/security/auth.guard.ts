import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { AuthService } from "./auth.service";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);


  if (authService.isLoggedIn()) {

    const requiredRoles = route.data["roles"] as string[] | undefined;
    if (requiredRoles && !authService.hasRole(requiredRoles)) {
      router.navigate(["/login"]); //  Redirige si no tiene permisos
      return false;
    }
    return true;
  }


  router.navigate(["/login"]);
  return false;
};
