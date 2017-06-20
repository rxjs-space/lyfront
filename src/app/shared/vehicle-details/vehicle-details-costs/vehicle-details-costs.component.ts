import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators, ValidatorFn, FormControl } from '@angular/forms';
import { SharedValidatorsService } from '../../validators/shared-validators.service';
import { FormUtilsService } from '../../form-utils/form-utils.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-vehicle-details-costs',
  templateUrl: './vehicle-details-costs.component.html',
  styleUrls: ['./vehicle-details-costs.component.scss']
})
export class VehicleDetailsCostsComponent implements OnInit {
  isCollapsed = true;
  valueChangesRx: Observable<any>;
  fform: FormGroup;
  @Input() vehicle: any;
  @Input() btity: any;
  @Input() isPersonRxx: BehaviorSubject<boolean>;
  constructor(
    private fb: FormBuilder,
    private sv: SharedValidatorsService,
    private fu: FormUtilsService
  ) { }
  ngOnInit() {
    this.fform = this.fb.group({
      vehicleCosts: this.fb.array(this.vehicle.vehicleCosts.map(vC => this.fb.group({
        fooBar: '',
        type: [{value: this.fu.idToName(vC.type, this.btity.types['vehicleCostTypes']), disabled: true}],
        details: [{value: vC.details, disabled: true}],
        amount: [{value: vC.amount, disabled: true}]
      }))),

    });

    this.valueChangesRx = this.fform.valueChanges
      .startWith(null)
      .map(v => {
        if (this.fform.valid) {
          const allV = this.fform.getRawValue();
          allV.vehicleCosts.forEach(vC => {
            delete vC.fooBar;
            vC.type = this.fu.nameToId(vC.type, this.btity.types['vehicleCostTypes']);
          });
          return allV;
        }
      });

  }

  onYesNoClose(event, index) {
    if (event) {
      (this.fform.get('vehicleCosts') as FormArray).removeAt(index);
      this.fform.markAsTouched();
      this.fform.markAsDirty();
    }
  }

  openDialogNewVehicleCosts() {
    console.log('open');
  }


}
