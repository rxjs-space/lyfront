import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-mofcom-captch',
  templateUrl: './mofcom-captch.component.html',
  styleUrls: ['./mofcom-captch.component.scss']
})
export class MofcomCaptchComponent implements OnInit {
  @Input() imgBase64: string;
  imgPropertyString: string;
  imgAlt = 'captcha';
  constructor(public domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.imgPropertyString = 'data:image/png;base64, ' + this.imgBase64;
  }
}

