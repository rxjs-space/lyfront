import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Route, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router) {}
  checkLoginAndAdmin(attemptedUrl) {
    // switch (true) {
    //   case attemptedUrl.indexOf('admin') && this.authService.isAdmin():
    //     return true;
    //   case attemptedUrl.indexOf('admin') && this.authService.isLoggedIn():
    //     this.router.navigate(['/login']);
    //     break;
    //   case this.authService.isLoggedIn():
    //     return true;
    //   default:
    //     this.authService.attemptedUrl = attemptedUrl;
    //     this.router.navigate(['/login']);
    // }

    if (this.authService.isLoggedIn()) {
      this.authService.isAdmin();
      return true;
    }
    this.authService.attemptedUrl = attemptedUrl;
    this.router.navigate(['/login']);
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkLoginAndAdmin(state.url);
  }

  canLoad(route: Route): boolean {
    const url = `/${route.path}`;
    return this.checkLoginAndAdmin(url);
  }

}
