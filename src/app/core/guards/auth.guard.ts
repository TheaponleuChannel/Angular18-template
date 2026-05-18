import { inject, Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {

  private router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isLoggedIn = true;
    if (isLoggedIn) {
      return true;
    } else {
      this.router.navigate(["/session/login"]);
      return false;
    }
  }
}
