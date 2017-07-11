import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MdDialog } from '@angular/material';

import { DataService } from '../../data/data.service';
import { AsyncDataLoaderService, SubHolder } from '../async-data-loader/async-data-loader.service';
import { DialogVehicleComponent } from '../dialog-vehicle/dialog-vehicle.component';
import { AsyncMonitorService } from '../async-monitor/async-monitor.service';
import { FormUtilsService } from '../form-utils/form-utils.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent implements OnInit, OnDestroy {
  @Input() dataFromTrigger: any;
  @Input() selectAllRxx: BehaviorSubject<any>;
  @Input() isInPrintMode: boolean;
  asyncDataLoaderSource = 'vehicleList' + Math.random();

  btity1: any;
  vehicleList1: any;
  subscriptions: Subscription[] = [];
  isListRefreshed = false;
  dialogDismantlingOrderAsyncMonitorHolder: any;

  itemRxHash = {};
  holder: SubHolder;
  asyncDataId = 'VehicleListComponent' + Math.random();

  formSelectedVehicleList: FormGroup;
  formSelectedVehicleListValueChangesRxx = new BehaviorSubject(null);
  constructor(
    private fu: FormUtilsService,
    private fb: FormBuilder,
    public dialog: MdDialog,
    public asyncDataLoader: AsyncDataLoaderService,
    private data: DataService,
    private asyncMonitor: AsyncMonitorService
  ) { }


  openDialogVehicle(vin, vehicle?) {
    this.dialog.open(DialogVehicleComponent, {
      width: '80%',
      // panelClass: '',
      disableClose: true,
      data: {
        types: this.btity1.types,
        titles: this.btity1.titles,
        vin,
        vehicle
      }
    });
  }

  ngOnInit() {
    this.itemRxHash = {
      btity: this.data.btityRxx,
      vehicleList: this.data.getVehicles(this.dataFromTrigger.searchQuery)
    };
    this.holder = this.asyncDataLoader.init(this.asyncDataId, this.itemRxHash);
    this.holder.refreshAll();

    const sub9_ = this.holder.isLoadedWithoutErrorRxx
      .filter(() => this.holder.latestResultRxxHash['btity'].getValue() && this.holder.latestResultRxxHash['vehicleList'].getValue())
      .subscribe(() => {
        this.btity1 = this.holder.latestResultRxxHash['btity'].getValue();
        this.vehicleList1 = this.holder.latestResultRxxHash['vehicleList'].getValue();
        this.sortVehicleListByVehicleType();
        this.vehicleList1 = this.vehicleList1.map(vehicle => {
          vehicle.vehicle.vehicleType = this.fu.idToName(vehicle.vehicle.vehicleType, this.btity1.types.vehicleTypes);
          vehicle.vehicle.brand = this.fu.idToName(vehicle.vehicle.brand, this.btity1.brands);
          // const typeId = vehicle.vehicle.vehicleType;
          // const typeName = this.btity1.types.vehicleTypes.find(item => item.id === typeId)['name'];
          // vehicle.vehicle.vehicleType = typeName;
          return vehicle;
        });
        if (this.vehicleList1 && this.vehicleList1.length) {
          // init formSelectedVehicleList
          if (this.dataFromTrigger.source === '待验车辆' && this.dataFromTrigger.surveyStatus.value > 1) {
            this.formSelectedVehicleList = this.fb.group({
              vehicleList: this.fb.array(this.vehicleList1.map(v => this.fb.group({
                  vin: v.vin,
                  selected: false
                })
              ))
            });

            const sub7_ = this.formSelectedVehicleList.valueChanges.subscribe(
              this.formSelectedVehicleListValueChangesRxx
            );
            this.subscriptions.push(sub7_);

            this.selectAllRxx.subscribe((itemsToExclude: number[]) => {
              if (itemsToExclude) {
                (this.formSelectedVehicleList.get('vehicleList') as FormArray).controls.forEach((ctrl, index) => {
                  if (itemsToExclude.indexOf(index) === -1) {
                    ctrl.get('selected').setValue(true);
                  }
                });
              } else {
                (this.formSelectedVehicleList.get('vehicleList') as FormArray).controls.forEach((ctrl, index) => {
                  ctrl.get('selected').setValue(false);
                });
              }

            })
            // console.log(this.formSelectedVehicleList.getRawValue());

          }


          // listening on dismantling status change
          this.dialogDismantlingOrderAsyncMonitorHolder = this.asyncMonitor.init('dialogDismantlingOrder');
          const sub8_ = this.dialogDismantlingOrderAsyncMonitorHolder.subscribe(result => {
            if (result.value && result.value.result.ok) {
              const vinDismantling = result.value.ops[0].vin;
              const vehicleDismantling = this.vehicleList1.find(vehicle => vehicle.vin === vinDismantling);
              console.log(vehicleDismantling);
              vehicleDismantling['status2']['dismantling'] = true;
            }
          });
          this.subscriptions.push(sub8_);
        }
      });

  }


  ngOnDestroy() {
    this.subscriptions.forEach(sub_ => sub_.unsubscribe());
    this.holder.destroy();
  }

  sortVehicleListByVehicleType(ascending = true) {
    this.vehicleList1.sort((a, b) => {
      return a.vehicle.vehicleType > b.vehicle.vehicleType ? 1 : -1;
    });
  }


}
