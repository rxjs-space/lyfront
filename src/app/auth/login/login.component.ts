import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../../data/data.service';
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
  authenticateResult: Boolean | Number;
  constructor(private fb: FormBuilder, private data: DataService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    console.log(this.loginForm.controls['username']);
    const sub0_ = Observable.merge(this.loginForm.controls['username'].valueChanges, this.loginForm.controls['password'].valueChanges)
      .subscribe(c => {
        if (this.authenticateResult) this.authenticateResult = null;
      });
    this.subscriptions_.push(sub0_);
  }

  ngOnDestroy() {
    this.subscriptions_.forEach(sub_ => sub_.unsubscribe());
  }

  onSubmit() {
    console.log('submitting');
    this.data.authenticate(this.loginForm.value)
      .subscribe(authenticateResult => {
        this.authenticateResult = authenticateResult;
      });
  }
}
