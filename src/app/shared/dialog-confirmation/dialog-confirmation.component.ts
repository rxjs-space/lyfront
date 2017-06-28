import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-dialog-confirmation',
  templateUrl: './dialog-confirmation.component.html',
  styleUrls: ['./dialog-confirmation.component.scss']
})
export class DialogConfirmationComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  isUpdating = false;
  constructor(
    public dialogRef: MdDialogRef<DialogConfirmationComponent>,
    @Inject(MD_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    if (this.data.actionResultRxx) {
      const sub0_ = this.data.actionResultRxx
        .filter(r => r)
        .subscribe(r => {
          this.isUpdating = false;
          if (r && r.error) {
            console.log(r.error);
          } else {
            this.dialogRef.close(r);
          }
        });
      this.subscriptions.push(sub0_);
    }
  }

  onConfirm() {
    this.isUpdating = true;
    this.data.actionTriggerRxx.next(this.data.actionParams);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub_ => sub_.unsubscribe());
  }

}
