import { Component, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { DialogMofcomLoginComponent } from './dialog-mofcom-login.component';
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
  subscriptions: Subscription[] = [];
  constructor(
    private fu: FormUtilsService,
    public backend: DataService,
    private dialog: MdDialog) { }

  ngOnInit() {
  }

  openDialog() {

    const dialogRef = this.dialog.open(DialogMofcomLoginComponent, {
      // disableClose: true,
      width: '400px'
    });

    dialogRef.afterClosed()
      .subscribe(console.log);
  }

  loginAndSubmit() {
    const vehicleCopy = JSON.parse(JSON.stringify(this.vehicle));
    vehicleCopy['vehicle']['useCharacter'] = this.fu.idToName(vehicleCopy['vehicle']['useCharacter'], this.btity['types']['useCharacters']);
    console.log('useCharacter');
    console.log(vehicleCopy);
    console.log(vehicleCopy['vehicle']['useCharacter']);
    const openingLoginDialogMessage = 'opening login dialog';
    const sub0_ = (this.backend.mofcomLoggedInRxx as Observable<boolean>)
      .delay(0)
      .switchMap(v => {
        console.log(v);
        if (!v) {
          const dialogRef = this.dialog.open(DialogMofcomLoginComponent, {
            width: '400px'
          });
          return Observable.of(openingLoginDialogMessage);
        } else {
          return this.backend.mofcomNewVehicle(vehicleCopy);
        }
      })
      .filter(v => v !== openingLoginDialogMessage)
      .subscribe(
        result => console.log('this is the end:', result),
        error => {
          if (error.message.indexOf('login expired') > -1) {
            this.backend.mofcomLoggedInRxx.next(false);
            console.log('login expired. will log in again.')
          } else {
            console.log(error);
          }
        }
      );

    this.subscriptions.push(sub0_);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub_ => sub_.unsubscribe());
  }

}



