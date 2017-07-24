import { Component, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { DialogMofcomLoginComponent } from './dialog-mofcom-login.component';
import { DialogMofcomProgressComponent } from '../dialog-mofcom-progress/dialog-mofcom-progress.component';
import { DataService } from '../../data/data.service';
import { FormUtilsService } from '../form-utils/form-utils.service';

@Component({
  selector: 'app-dialog-mofcom-login-trigger',
  templateUrl: './dialog-mofcom-login-trigger.component.html',
  styleUrls: ['./dialog-mofcom-login-trigger.component.scss']
})
export class DialogMofcomLoginTriggerComponent implements OnInit, OnDestroy {
  @Input() isLoginAndSubmit: boolean;
  @Input() disabledInput: any;
  @Input() vehicle: any;
  @Input() btity: any;
  messageRxx = new BehaviorSubject('');
  resultBase64Rxx = new BehaviorSubject(null);
  captchaBase64Rxx = new BehaviorSubject(null);


  subscriptions: Subscription[] = [];
  constructor(
    private fu: FormUtilsService,
    public backend: DataService,
    private dialog: MdDialog) { }

  ngOnInit() {

    const mofcomBotMessages_ = this.backend.mofcomBotGetMessageRxx
      // .switchMap() // notLoggedIn, loggedIn, finishedInput
      .subscribe(message => {
        switch (true) {
          case message.message && message.message.indexOf('notLoggedIn') > -1:
            this.messageRxx.next('输入登录验证码...');
            this.captchaBase64Rxx.next(message.data.captchaBase64);
            // dialogRefLogin = this.dialog.open(DialogMofcomLoginComponent, {
            //   width: '400px',
            //   disableClose: true,
            //   data: message.data
            // });
            break;
          case message.message && message.message.indexOf('loggedIn') > -1:
            this.messageRxx.next('已登录。继续发送数据...');
            console.log('loggedIn');
            // dialogRefLogin.close();
            this.backend.mofcomBotSendMessage({
              bot: 'mofcom',
              action: 'newEntryAgain'
            });
            break;
          case message.message && message.message.indexOf('finishedInput') > -1:
            this.messageRxx.next('完成录入。');
            console.log('finishedInput');
            this.resultBase64Rxx.next(message.data.resultBase64);
            // setTimeout(() => {dialogRefProgress.close(); }, 1000)
            break;
        }
      });
    this.subscriptions.push(mofcomBotMessages_);

  }

  // openDialog() {

  //   const dialogRef = this.dialog.open(DialogMofcomLoginComponent, {
  //     // disableClose: true,
  //     width: '400px'
  //   });

  //   dialogRef.afterClosed()
  //     .subscribe(console.log);
  // }

  prepareVehicleCopy() {
    const vehicleCopy = JSON.parse(JSON.stringify(this.vehicle));
    vehicleCopy['vehicle']['vehicleType'] = this.fu.idToName(vehicleCopy['vehicle']['vehicleType'], this.btity['types']['vehicleTypes']);
    vehicleCopy['vehicle']['useCharacter'] = this.fu.idToName(vehicleCopy['vehicle']['useCharacter'], this.btity['types']['useCharacters']);
    return vehicleCopy;
  }

  mofcomGo() {
    this.messageRxx.next('发送数据...');
    this.resultBase64Rxx.next(null);
    this.captchaBase64Rxx.next(null);
    const dialogRefProgress = this.dialog.open(DialogMofcomProgressComponent, {
      disableClose: true,
      data: {
        messageRxx: this.messageRxx,
        resultBase64Rxx: this.resultBase64Rxx,
        captchaBase64Rxx: this.captchaBase64Rxx}
    });
    const vehicle = this.prepareVehicleCopy();
    // let dialogRefLogin: MdDialogRef<DialogMofcomLoginComponent>;

    // send newEntry message to start the process
    this.backend.mofcomBotSendMessage({
      bot: 'mofcom',
      action: 'newEntry',
      data: {vehicle}
    });
  }
  // loginAndSubmit() {
  //   const vehicleCopy = JSON.parse(JSON.stringify(this.vehicle));
  //   vehicleCopy['vehicle']['useCharacter'] = this.fu.idToName(vehicleCopy['vehicle']['useCharacter'], this.btity['types']['useCharacters']);
  //   console.log('useCharacter');
  //   console.log(vehicleCopy);
  //   console.log(vehicleCopy['vehicle']['useCharacter']);
  //   const openingLoginDialogMessage = 'opening login dialog';
  //   const sub0_ = (this.backend.mofcomLoggedInRxx as Observable<boolean>)
  //     .delay(0)
  //     .switchMap(v => {
  //       console.log(v);
  //       if (!v) {
  //         const dialogRef = this.dialog.open(DialogMofcomLoginComponent, {
  //           width: '400px'
  //         });
  //         return Observable.of(openingLoginDialogMessage);
  //       } else {
  //         return this.backend.mofcomNewVehicle(vehicleCopy);
  //       }
  //     })
  //     .filter(v => v !== openingLoginDialogMessage)
  //     .subscribe(
  //       result => console.log('this is the end:', result),
  //       error => {
  //         if (error.message.indexOf('login expired') > -1) {
  //           this.backend.mofcomLoggedInRxx.next(false);
  //           console.log('login expired. will log in again.')
  //         } else {
  //           console.log(error);
  //         }
  //       }
  //     );

  //   this.subscriptions.push(sub0_);
  // }

  ngOnDestroy() {
    this.subscriptions.forEach(sub_ => sub_.unsubscribe());
  }

}



