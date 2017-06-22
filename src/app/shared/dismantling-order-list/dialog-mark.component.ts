import { Component, Inject, OnInit } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import jsonpatch from 'fast-json-patch';

import { DataService } from '../../data/data.service';
import { AsyncMonitorService } from '../async-monitor/async-monitor.service';

@Component({
  selector: 'app-dialog-mark',
  templateUrl: './dialog-mark.component.html',
  styleUrls: ['./dialog-mark.component.scss']
})
export class DialogMarkComponent implements OnInit {
  updating = false;
  asyncMonitorId = 'dialogDismantlingOrderMark';
  asyncMonitorHolder: any;
  constructor(
    private asyncMonitor: AsyncMonitorService,
    private data: DataService,
    public dialogRef: MdDialogRef<DialogMarkComponent>,
    @Inject(MD_DIALOG_DATA) public dataFromTrigger: any,
  ) { }

  ngOnInit() {
    this.asyncMonitorHolder = this.asyncMonitor.init(this.asyncMonitorId);
  }

  mark(target: 'startedAt' | 'completedAt') {
    this.updating = true;
    this.asyncMonitorHolder.next({done: false, value: null});

    const oldDismantlingOrder = JSON.parse(JSON.stringify(this.dataFromTrigger.dismantlingOrder));
    const changes = {
      [target]: (new Date()).toISOString()
    }
    // const startedAt = (new Date()).toISOString();
    // const newDismantlingOrder = Object.assign({}, oldDismantlingOrder, {
    //   startedAt
    // });
    const newDismantlingOrder = Object.assign({}, oldDismantlingOrder, changes);
    const dismantlingOrderPatches = jsonpatch.compare(oldDismantlingOrder, newDismantlingOrder);
    // console.log(dismantlingOrderPatches)
    this.data.updateDismantlingOrder(newDismantlingOrder._id, oldDismantlingOrder.vin, dismantlingOrderPatches)
      .catch(error => Observable.of({
        ok: false, error
      }))
      .subscribe(result => {
        this.updating = false;
        this.asyncMonitorHolder.next({
          done: true,
          value: result.error ? result.error : newDismantlingOrder
        });
        if (result.error) {
          console.log('something went wrong');
          console.log(result.error);
        } else {
          this.dialogRef.close(newDismantlingOrder);
        }
      });
  }
  // markStarted() {
  //   this.updating = true;
  //   this.asyncMonitorHolder.next({done: false, value: null});

  //   const oldDismantlingOrder = JSON.parse(JSON.stringify(this.dataFromTrigger.dismantlingOrder));
  //   const startedAt = (new Date()).toISOString();
  //   const newDismantlingOrder = Object.assign({}, oldDismantlingOrder, {
  //     startedAt
  //   });
  //   const dismantlingOrderPatches = jsonpatch.compare(oldDismantlingOrder, newDismantlingOrder);
  //   // console.log(dismantlingOrderPatches)
  //   this.data.updateDismantlingOrder(newDismantlingOrder._id, dismantlingOrderPatches)
  //     .catch(error => Observable.of({
  //       ok: false, error
  //     }))
  //     .subscribe(result => {
  //       this.updating = false;
  //       this.asyncMonitorHolder.next({
  //         done: true,
  //         value: result.error ? result.error : newDismantlingOrder
  //       });
  //       if (result.error) {
  //         console.log('something went wrong');
  //         console.log(result.error);
  //       } else {
  //         this.dialogRef.close(newDismantlingOrder);
  //       }
  //     });
  // }

  // markCompleted() {
  //   const oldDismantlingOrder = JSON.parse(JSON.stringify(this.dataFromTrigger.dismantlingOrder));
  //   const completedAt = (new Date()).toISOString();
  //   const newDismantlingOrder = Object.assign({}, oldDismantlingOrder, {
  //     completedAt
  //   });
  //   const dismantlingOrderPatches = jsonpatch.compare(oldDismantlingOrder, newDismantlingOrder);
  //   // console.log(dismantlingOrderPatches);
  //   this.data.updateDismantlingOrder(newDismantlingOrder._id, dismantlingOrderPatches)
  //     .catch(error => Observable.of({
  //       ok: false, error
  //     }))
  //     .subscribe(result => {
  //       this.updating = false;
  //       this.asyncMonitorHolder.next({
  //         done: true,
  //         value: result.error ? result.error : newDismantlingOrder
  //       });
  //       if (result.error) {
  //         console.log('something went wrong');
  //         console.log(result.error);
  //       } else {
  //         this.dialogRef.close(newDismantlingOrder);
  //       }
  //     });


  // }
}
