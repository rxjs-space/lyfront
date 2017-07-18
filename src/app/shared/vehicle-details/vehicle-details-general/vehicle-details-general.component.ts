import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators, ValidatorFn, FormControl } from '@angular/forms';
import { SharedValidatorsService } from '../../validators/shared-validators.service';
import { FormUtilsService } from '../../form-utils/form-utils.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-vehicle-details-general',
  templateUrl: './vehicle-details-general.component.html',
  styleUrls: ['./vehicle-details-general.component.scss']
})
export class VehicleDetailsGeneralComponent implements OnInit {
  valueChangesRx: Observable<any>;
  fform: FormGroup;
  @Input() vehicle: any;
  @Input() btity: any;
  @Input() isNew: boolean;
  @Input() checkMofcomValidityRxx: any;
  constructor(
    private fb: FormBuilder,
    private sv: SharedValidatorsService,
    private fu: FormUtilsService
  ) { }

  ngOnInit() {
    this.fform = this.fb.group({
      vin: [this.vehicle.vin, Validators.required],
      batchId: [this.vehicle.batchId, this.sv.startedWithSpace()],
      source: [this.fu.idToName(this.vehicle.source, this.btity.types['sources']), [
        this.sv.notListedButCanBeEmpty(this.btity.types.sources.map(t => t.name))
      ]],
      // isToDeregister: [this.vehicle.isToDeregister], // replaced by consignmentType
      mofcomRegisterType: [this.fu.idToName(this.vehicle.mofcomRegisterType, this.btity.types['mofcomRegisterTypes']), [
        this.sv.notListedButCanBeEmpty(this.btity.types.mofcomRegisterTypes.map(t => t.name)),
        Validators.required
      ]],
      consignmentType: [this.fu.idToName(this.vehicle.consignmentType, this.btity.types['consignmentTypes']), [
        Validators.required,
        this.sv.notListedButCanBeEmpty(this.btity.types.consignmentTypes.map(t => t.name))
      ]],
      mofcomRegisterRef: [this.vehicle.mofcomRegisterRef, this.sv.startedWithSpace()],
      entranceDate: [this.vehicle.entranceDate || (new Date()).toISOString().slice(0, 10), [Validators.required]],
      facility: [{
        value: this.fu.idToName(this.vehicle.facility, this.btity.types.facilities),
        disabled: this.vehicle.facility ? true : false
      }, [Validators.required, this.sv.notListedButCanBeEmpty(this.btity.types.facilities.map(t => t.name))]],
      metadata: this.fb.group({
        isDeleted: [this.vehicle.metadata.isDeleted],
        deletedFor: [this.vehicle.metadata.deletedFor],
        deletedBy: [this.vehicle.metadata.deletedBy],
        deletedAt: [this.vehicle.metadata.deletedAt],
      }),
      internalSurveyor: [this.vehicle.internalSurveyor, this.sv.startedWithSpace()]
    });

    /* setting up vinConfirm based on isNew*/
    if (this.isNew) {
      const vinConfirmCtrl = new FormControl('', [
          Validators.required,
          this.sv.notMatchingOtherControl(this.fform.get('vin'))
        ], [this.sv.duplicateVINAsync()]
      );
      this.fform.addControl('vinConfirm', vinConfirmCtrl);
    } else {
      this.fform.get('vin').disable();
    }

    this.valueChangesRx = this.fform.valueChanges
      .startWith(null)
      .map(v => {
        // if (this.fform.valid) {
          const allV = this.fform.getRawValue();
          allV.source = this.fu.nameToId(allV.source, this.btity.types['sources']);
          allV.mofcomRegisterType = this.fu.nameToId(allV.mofcomRegisterType, this.btity.types['mofcomRegisterTypes']);
          allV.consignmentType = this.fu.nameToId(allV.consignmentType, this.btity.types['consignmentTypes']);
          allV.facility = this.fu.nameToId(allV.facility, this.btity.types['facilities']);
          return allV;
        // }

      });

    this.checkMofcomValidityRxx.subscribe((mofcomRegisterType) => {
      // no validation rule needs to be changed for general part
    });

  }

}
