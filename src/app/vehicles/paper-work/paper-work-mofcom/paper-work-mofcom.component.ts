import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../../../data/data.service';


@Component({
  selector: 'app-paper-work-mofcom',
  templateUrl: './paper-work-mofcom.component.html',
  styleUrls: ['./paper-work-mofcom.component.scss']
})
export class PaperWorkMofcomComponent implements OnInit {
  isBotDown = false;
  isFetchingCaptcha = false;
  isLoggingIn = false;
  isLoggedIn = false;
  captchaBase64 = '';
  captchaCtrl = new FormControl('');
  constructor(
    private backend: DataService) { }

  ngOnInit() {
    this.mofcomInit();
  }

  mofcomInit() {
    console.log('mofcomInit');
    this.isBotDown = false;
    this.isLoggedIn = false;
    this.captchaBase64 = '';
    this.captchaCtrl.reset();
    this.isFetchingCaptcha = true;
    this.backend.mofcomInit()
      .catch(error => Observable.of({
        ok: false, error
      }))
      .subscribe(res => {
        if (res.error) {
          console.log(res.error);
          console.log(res.error.message);
          if (res.error instanceof ProgressEvent) {
            this.isBotDown = true;
          }
          if (res.error.message.indexOf('already logged in') !== -1) {
            this.isLoggedIn = true;
          }
        } else {
          console.log(res);
          this.isFetchingCaptcha = false;
          this.captchaBase64 = res.captchaBase64;
          // console.log(res);
        }
      });
  }


  mofcomLogin() {
    this.isLoggingIn = true;
    this.isLoggedIn = false;
    this.captchaCtrl.disable();
    this.backend.mofcomLogin(this.captchaCtrl.value)
      .catch(error => {
        this.captchaCtrl.enable();
        return Observable.of({
          ok: false, error
        });
      })
      .subscribe(res => {
        this.captchaCtrl.enable();
        console.log(res);
        this.isLoggingIn = false;
        this.isLoggedIn = true;
      });
  }

  mofcomNewVehicle() {
    const vehicle = {
      mofcomRegisterType: '1',
      owner: {
        name: 'xyz',
        isPerson: true,
        idNo: '123',
        tel: '0421',
        address: '双塔区',
        zipCode: '122000'
      },
      agent: {
        name: 'agent',
        idNo: '890'
      }
    }
    this.backend.mofcomNewVehicle(vehicle)
      .catch(error => Observable.of({
        ok: false, error
      }))
      .subscribe(res => {
        if (res.error) {
          switch (true) {
            case res.error.message.indexOf('not logged in') > -1 || res.error.message.indxOf('loggin expired') > -1:
              this.isLoggedIn = false;
              this.mofcomInit();
              break;
          }
          console.log(res.error)
        } else {
          console.log(res)
        }
      });
  }


}
