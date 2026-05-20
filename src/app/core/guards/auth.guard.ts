import { inject, Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { CredentialService } from "../services/credential.service";

@Injectable()
export class AuthGuard implements CanActivate {

  #router = inject(Router);
  #credential = inject(CredentialService);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.#credential.isLoggedIn()) {
      return true;
    } else {
      this.#router.navigate(["/session/login"], {
        queryParams: {
          return: state.url
        }
      });
      return false;
    }

  }
}
