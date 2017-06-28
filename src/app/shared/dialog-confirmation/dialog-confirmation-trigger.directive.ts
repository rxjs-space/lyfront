import { Directive, Input, HostListener } from '@angular/core';
import { MdDialog } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DialogConfirmationComponent } from './dialog-confirmation.component';


/**
 * an action button (for example, 'confirm') will send out actionTriggerParams by actionTriggerRxx
 * and some ops happen, after the ops finished, actionResultRxx will bring back something
 * and the dialogComponent will act according to the actionResult
 */

@Directive({
  selector: '[appDialogConfirmationTrigger]'
})
export class DialogConfirmationTriggerDirective {
  @Input() dialogTitle: any;
  @Input() dialogContent: any;
  @Input() actionTriggerRxx: BehaviorSubject<any>;
  @Input() actionResultRxx: BehaviorSubject<any>;
  @Input() actionParams: any[];
  // @Input() actionTriggerParams: any;
  @HostListener('click', ['$event']) onClick(e) {
    // console.log(e);
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      disableClose: true,
      data: {
        dialogTitle: this.dialogTitle,
        dialogContent: this.dialogContent,
        actionTriggerRxx: this.actionTriggerRxx,
        actionResultRxx: this.actionResultRxx,
        actionParams: this.actionParams
        // actionTriggerParams: this.actionTriggerParams
      }
    });

    // dialogRef.afterClosed()
    //   .subscribe(v => {
    //     console.log(v);
    //   });
  }
  constructor(private dialog: MdDialog) { }

}
