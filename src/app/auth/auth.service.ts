import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  attemptedUrl: string;
  constructor() { }

  isLoggedIn() {
    return true;
  }

}
