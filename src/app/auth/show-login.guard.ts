import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

/*
  showLogin means if it's true (not logged in), SHOW the LOGIN page
*/
@Injectable()
export class ShowLoginGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.isLoggedIn()) {
      return true; // true for not logged in
    }
    this.router.navigate(['/dashboard']);
  }
}
