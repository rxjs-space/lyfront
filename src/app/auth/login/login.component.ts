import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { DataService } from '../../data/data.service';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/observable/merge';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  subscriptions_: Subscription[] = [];
  loginForm: FormGroup;
  authenticateResult: any;
  authenticating = false;
  isConnectionDown = false;
  showUnauthorized = false;
  constructor(
    private fb: FormBuilder, 
    private auth: AuthService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    const sub0_ = Observable.merge(this.loginForm.controls['username'].valueChanges, this.loginForm.controls['password'].valueChanges)
      .subscribe(c => {
        if (this.authenticateResult) {this.authenticateResult = null; }
      });
    this.subscriptions_.push(sub0_);
  }

  ngOnDestroy() {
    this.subscriptions_.forEach(sub_ => sub_.unsubscribe());
  }

  onSubmit() {
    this.authenticating = true;
    this.isConnectionDown = false;
    this.showUnauthorized = false;
    this.auth.authenticate(this.loginForm.value)
      .subscribe(authenticateResult => {
        this.authenticating = false;
        if (authenticateResult.ok === false) {
          if (authenticateResult['errorCode'] === 401) {
            this.showUnauthorized = true;
          } else {
            this.isConnectionDown = true;
          }
        } else {
          this.showUnauthorized = false;
          this.authenticateResult = authenticateResult;
        }
      });
  }
}
