import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators, ValidatorFn, FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { SharedValidatorsService } from '../../validators/shared-validators.service';
import { FormUtilsService } from '../../form-utils/form-utils.service';

@Component({
  selector: 'app-vehicle-details-owner-agent',
  templateUrl: './vehicle-details-owner-agent.component.html',
  styleUrls: ['./vehicle-details-owner-agent.component.scss']
})
export class VehicleDetailsOwnerAgentComponent implements OnInit, OnDestroy {

  fform: FormGroup;
  valueChangesRx: Observable<any>;
  @Input() vehicle: any;
  @Input() btity: any;
  @Input() checkMofcomValidityRxx: any;
  pTypes: any;
  oTypes: any;
  subscriptions: Subscription[] = [];
  isPersonRxx = new BehaviorSubject(false);
  constructor(
    private fb: FormBuilder,
    private sv: SharedValidatorsService,
    private fu: FormUtilsService
  ) { }

  ngOnInit() {
    this.isPersonRxx.next(this.vehicle.owner.isPerson);
    this.pTypes = this.btity.types.idTypes.filter(t => t.id.indexOf('o') === -1);
    this.oTypes = this.btity.types.idTypes.filter(t => t.id.indexOf('p') === -1);


    this.fform = this.fb.group({
      owner: this.fb.group({
        name: [this.vehicle.owner.name, [Validators.required, this.sv.startedWithSpace()]],
        address: [this.vehicle.owner.address, [Validators.required, this.sv.startedWithSpace()]],
        zipCode: [this.vehicle.owner.zipCode, Validators.pattern(/^[0-9]{6,6}$/)],
        idType: [this.fu.idToName(this.vehicle.owner.idType, this.btity.types['idTypes']), [
          this.sv.notListedBasedOnOtherControlTFButCanBeEmpty('isPerson', [
            this.oTypes.map(type => type.name),
            this.pTypes.map(type => type.name),
          ])
        ]],
        idOtherTypeName: [this.vehicle.owner.idOtherTypeName, this.sv.startedWithSpace()],
        idNo: [this.vehicle.owner.idNo, this.sv.startedWithSpace()],
        tel: [this.vehicle.owner.tel, Validators.pattern(/^[0-9]{7,11}$/)],
        isPerson: [this.vehicle.owner.isPerson, [this.sv.shouldBeBoolean(), Validators.required]],
        isByAgent: [this.vehicle.owner.isByAgent, [this.sv.shouldBeBoolean(), Validators.required]]
      }),
      agent: this.fb.group({
        name: [this.vehicle.agent.name, this.sv.startedWithSpace()],
        idType: [this.fu.idToName(this.vehicle.agent.idType, this.btity.types['idTypes']),
          this.sv.notListedButCanBeEmpty(this.pTypes.map(type => type.name))],
        idOtherTypeName: [this.vehicle.agent.idOtherTypeName, this.sv.startedWithSpace()],
        idNo: [this.vehicle.agent.idNo, this.sv.startedWithSpace()],
        tel: [this.vehicle.agent.tel, Validators.pattern(/^[0-9]{7,11}$/)],
      }),
    });

    const isByAgentChange_ = this.fform.get('owner.isByAgent').valueChanges
      .subscribe(value => {
        const agentNameCtrl = this.fform.get('agent.name');
        if (value) {
          agentNameCtrl.setValidators([Validators.required]);
          agentNameCtrl.updateValueAndValidity();
        } else {
          agentNameCtrl.clearValidators();
          agentNameCtrl.updateValueAndValidity();
        }
      });
    this.subscriptions.push(isByAgentChange_);

    const isPersonChange_ = this.fform.get('owner.isPerson').valueChanges
      .subscribe(value => {
        this.fform.get('owner.idType').setValue('');
        if (!value) { // if value === false, that is 'organization', isByAgent is always true
          this.fform.get('owner.isByAgent').setValue(true);
          this.fform.get('owner.isByAgent').disable();
        } else {
          this.fform.get('owner.isByAgent').enable();
        }
        this.isPersonRxx.next(value);
      });
    this.subscriptions.push(isPersonChange_);


    this.valueChangesRx = this.fform.valueChanges
      .startWith(null)
      .map(v => {
        // if (this.fform.valid) {
          const allV = this.fform.getRawValue();
          allV['owner']['idType'] = this.fu.nameToId(allV['owner']['idType'], this.btity.types['idTypes']);
          allV['agent']['idType'] = this.fu.nameToId(allV['agent']['idType'], this.btity.types['idTypes']);
          return allV;
        // }
      });

    this.checkMofcomValidityRxx.subscribe((mofcomRegisterType) => {
      console.log(mofcomRegisterType);
      this.fform.get('owner.idNo').setValidators([Validators.required]);
      this.fform.get('owner.idNo').updateValueAndValidity();
      // const markAllAsTouched = (control: AbstractControl) => {
      //   if (control.hasOwnProperty('controls')) {
      //     control.markAsTouched(); // mark group
      //     const ctrl = <any>control;
      //     for (const innerId in ctrl.controls) {
      //       markAllAsTouched(ctrl.controls[innerId] as AbstractControl);
      //     }
      //   } else {
      //     (<FormControl>(control)).markAsTouched();  // mark single control
      //   }
      // };

      // markAllAsTouched(this.fform);

      // this.fform.get('owner.idNo').updateValueAndValidity();
    });

  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub_ => sub_.unsubscribe());
  }
}
