import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators, ValidatorFn, FormControl } from '@angular/forms';
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
  pTypes: any;
  oTypes: any;
  subscriptions: Subscription[] = [];
  constructor(
    private fb: FormBuilder,
    private sv: SharedValidatorsService,
    private fu: FormUtilsService
  ) { }

  ngOnInit() {

    this.pTypes = this.btity.types.idTypes.filter(t => t.id.indexOf('o') === -1);
    this.oTypes = this.btity.types.idTypes.filter(t => t.id.indexOf('p') === -1);


    this.fform = this.fb.group({
      owner: this.fb.group({
        name: [this.vehicle.owner.name, Validators.required],
        address: [this.vehicle.owner.address],
        zipCode: [this.vehicle.owner.zipCode, Validators.pattern(/^[0-9]{6,6}$/)],
        idType: [this.fu.idToName(this.vehicle.owner.idType, this.btity.types['idTypes']), [
          this.sv.notListedBasedOnOtherControlTFButCanBeEmpty('isPerson', [
            this.btity.types.oIdTypes.map(type => type.name),
            this.btity.types.pIdTypes.map(type => type.name),
          ])
        ]],
        idOtherTypeName: [this.vehicle.owner.idOtherTypeName],
        idNo: [this.vehicle.owner.idNo],
        tel: [this.vehicle.owner.tel, Validators.pattern(/^[0-9]{7,11}$/)],
        isPerson: [this.vehicle.owner.isPerson, [this.sv.shouldBeBoolean()]],
        isByAgent: [this.vehicle.owner.isByAgent, [this.sv.shouldBeBoolean()]]
      }),
      agent: this.fb.group({
        name: [this.vehicle.agent ? this.vehicle.agent.name : ''],
        idType: [this.fu.idToName(this.vehicle.agent.idType, this.btity.types['idTypes']),
          this.sv.notListedButCanBeEmpty(this.btity.types.pIdTypes.map(type => type.name))],
        idOtherTypeName: [this.vehicle.owner.idOtherTypeName],
        idNo: [this.vehicle.agent.idNo],
        tel: [this.vehicle.agent.tel, Validators.pattern(/^[0-9]{7,11}$/)],
      }),
    });

    const isPersonChange_ = this.fform.get('owner.isPerson').valueChanges
      .subscribe(value => {
        this.fform.get('owner.idType').setValue('');
        if (!value) { // if value === false, that is 'organization', isByAgent is always true
          this.fform.get('owner.isByAgent').setValue(true);
          this.fform.get('owner.isByAgent').disable();
        } else {
          this.fform.get('owner.isByAgent').enable();
        }
      });
    this.subscriptions.push(isPersonChange_);


    this.valueChangesRx = this.fform.valueChanges
      .startWith(null)
      .map(v => {
        if (this.fform.valid) {
          const allV = this.fform.getRawValue();
          allV['owner']['idType'] = this.fu.nameToId(allV['owner']['idType'], this.btity.types['idTypes']);
          allV['agent']['idType'] = this.fu.nameToId(allV['agent']['idType'], this.btity.types['idTypes']);
          return allV;
        }
      });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub_ => sub_.unsubscribe());
  }
}
