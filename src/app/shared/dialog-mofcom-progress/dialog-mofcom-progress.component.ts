import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../data/data.service';

@Component({
  selector: 'app-dialog-mofcom-progress',
  templateUrl: './dialog-mofcom-progress.component.html',
  styleUrls: ['./dialog-mofcom-progress.component.scss']
})
export class DialogMofcomProgressComponent implements OnInit, OnDestroy {
  message: any;
  resultBase64;
  captchaBase64;
  captchaForm: FormGroup;
  subscriptions: Subscription[] = [];
  isSubmitting = false;
  constructor(
    private dialogRef: MdDialogRef<DialogMofcomProgressComponent>,
    @Inject(MD_DIALOG_DATA) public dataFromTrigger,
    public domSanitizer: DomSanitizer,
    private fb: FormBuilder,
    private backend: DataService
  ) { }

  ngOnInit() {
    this.captchaForm = this.fb.group({
      captcha: ['', Validators.required]
    });

    const sub0_ = this.dataFromTrigger.resultBase64Rxx.subscribe(r => {
      if (r) {
        this.resultBase64 = 'data:image/png;base64, ' + r;
      }
    });

    this.subscriptions.push(sub0_);

    const sub1_ = this.dataFromTrigger.captchaBase64Rxx.subscribe(c => {
      if (c) {
        this.captchaBase64 = 'data:image/png;base64, ' + c;
      }
    });

    this.subscriptions.push(sub1_);

    const sub2_ = this.dataFromTrigger.messageRxx.subscribe(m => {
      this.message = m;
      if (m.indexOf('已登录') > -1) {
        this.captchaBase64 = ''; // this will hide the log-in button
        this.isSubmitting = false;
      }
    });

    this.subscriptions.push(sub2_);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onSubmit() {
    console.log('logging in...');
    const captchaCtrl = this.captchaForm.get('captcha');
    const captcha = captchaCtrl.value;
    this.isSubmitting = true;
    captchaCtrl.disable();
    this.backend.mofcomBotSendMessage({
      bot: 'mofcom',
      action: 'login',
      data: {captcha}
    });
    // how to deal with login failure?
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub_ => sub_.unsubscribe());
  }

}
