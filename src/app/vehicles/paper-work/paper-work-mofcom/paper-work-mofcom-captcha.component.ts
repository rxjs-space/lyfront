import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-paper-work-mofcom-captcha',
  templateUrl: './paper-work-mofcom-captcha.component.html',
  styleUrls: ['./paper-work-mofcom-captcha.component.scss']
})
export class PaperWorkMofcomCaptchaComponent implements OnInit {
  @Input() captchaBase64: string;
  captchaString: string;
  constructor(public domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.captchaString = 'data:image/png;base64, ' + this.captchaBase64;
  }

}
