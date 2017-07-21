import { Component, Inject, OnInit } from '@angular/core';
// import { AsyncDataLoaderService, SubHolder, BaseForComponentWithAsyncData } from '../async-data-loader';
import { AbstractControl, FormBuilder, FormGroup, Validators, ValidatorFn, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { DataService } from '../../data/data.service';

@Component({
  selector: 'app-dialog-mofcom-login',
  templateUrl: './dialog-mofcom-login.component.html',
  styleUrls: ['./dialog-mofcom-login.component.scss']
})
export class DialogMofcomLoginComponent /* extends BaseForComponentWithAsyncData */ implements OnInit {
  // asyncDataHolderId = 'DialogMofcomLoginComponent';
  // dataRxHash = {
  //   captchaImgBase64: this.backend.mofcomInit(),
  // };
  // holderPub: SubHolder;
  loginForm: FormGroup;
  isSubmitting = false;

  constructor(
    @Inject(MD_DIALOG_DATA) public dataFromTrigger,
    private dialogRef: MdDialogRef<DialogMofcomLoginComponent>,
    private fb: FormBuilder,
    /* asyncDataLoader: AsyncDataLoaderService, */  
    private backend: DataService
  ) {
    // super(asyncDataLoader, backend);
   }

  ngOnInit() {
    // super.ngOnInit();
    // this.holderPub = this.holder;
    this.loginForm = this.fb.group({
      captcha: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log('submitting');
    const captchaCtrl = this.loginForm.get('captcha');
    const captcha = captchaCtrl.value;
    this.isSubmitting = true;
    captchaCtrl.disable();
    this.backend.mofcomBotSendMessage({
      bot: 'mofcom',
      action: 'login',
      data: {captcha}
    });
  }
  // onSubmit() {
  //   console.log('submitting');
  //   const captchaCtrl = this.loginForm.get('captcha');
  //   this.isSubmitting = true;
  //   captchaCtrl.disable();
  //   const sub0_ = this.backend.mofcomLogin(captchaCtrl.value)
  //     .first()
  //     .subscribe(
  //       res => {
  //         console.log(res);
  //         this.dialogRef.close({isLoggedIn: true});
  //       },
  //       error => {
  //         console.log(error);
  //         captchaCtrl.enable();
  //         this.isSubmitting = false;
  //       }
  //     );
  // }


}
