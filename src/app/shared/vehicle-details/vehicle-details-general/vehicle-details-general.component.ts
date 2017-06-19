import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators, ValidatorFn, FormControl } from '@angular/forms';
import { SharedValidatorsService } from '../../validators/shared-validators.service';
import { FormUtilsService } from '../../form-utils/form-utils.service';

@Component({
  selector: 'app-vehicle-details-general',
  templateUrl: './vehicle-details-general.component.html',
  styleUrls: ['./vehicle-details-general.component.scss']
})
export class VehicleDetailsGeneralComponent implements OnInit {
  fform: FormGroup;
  @Input() vehicle: any;
  @Input() btity: any;
  @Input() isNew: boolean;
  constructor(
    private fb: FormBuilder,
    private sv: SharedValidatorsService,
    private fu: FormUtilsService
  ) { }

  ngOnInit() {
    this.fform = this.fb.group({
      vin: [this.vehicle.vin, Validators.required],
      batchId: [this.vehicle.batchId],
      source: [this.fu.idToName(this.vehicle.source, this.btity.types['sources']), [
        this.sv.notListedButCanBeEmpty(this.btity.types.sources.map(t => t.name))
      ]],
      isToDeregister: [this.vehicle.isToDeregister],
      mofcomRegisterType: [this.fu.idToName(this.vehicle.mofcomRegisterType, this.btity.types['mofcomRegisterTypes']), [
        this.sv.notListedButCanBeEmpty(this.btity.types.mofcomRegisterTypes.map(t => t.name))
      ]],
      mofcomRegisterRef: [this.vehicle.mofcomRegisterRef],
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


  }

}
