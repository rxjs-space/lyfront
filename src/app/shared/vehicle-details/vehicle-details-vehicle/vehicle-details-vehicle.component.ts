import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators, ValidatorFn, FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { SharedValidatorsService } from '../../validators/shared-validators.service';
import { FormUtilsService } from '../../form-utils/form-utils.service';

@Component({
  selector: 'app-vehicle-details-vehicle',
  templateUrl: './vehicle-details-vehicle.component.html',
  styleUrls: ['./vehicle-details-vehicle.component.scss']
})
export class VehicleDetailsVehicleComponent implements OnInit {
  fform: FormGroup;
  fformRxx = new BehaviorSubject(null);
  valueChangesRx: Observable<any>;
  @Input() vehicle: any;
  @Input() btity: any;
  constructor(
    private fb: FormBuilder,
    private sv: SharedValidatorsService,
    private fu: FormUtilsService
  ) { }

  ngOnInit() {
    this.fform = this.fb.group({
      vehicle: this.fb.group({
        plateNo: [this.vehicle.vehicle.plateNo, [Validators.required, Validators.pattern(/^.{7,7}$/)]],
        vehicleType: [this.fu.idToName(this.vehicle.vehicle.vehicleType, this.btity.types['vehicleTypes']), [
          Validators.required,
          this.sv.notListedButCanBeEmpty(this.btity.types.vehicleTypes.map(type => type.name))
        ]],
        useCharacter: [this.fu.idToName(this.vehicle.vehicle.useCharacter, this.btity.types['useCharacters']), [
          this.sv.notListedButCanBeEmpty(this.btity.types.useCharacters.map(type => type.name))
        ]],
        brand: [this.fu.idToName(this.vehicle.vehicle.brand, this.btity.brands), [
          this.sv.notListedButCanBeEmpty(this.btity.brands.map(brand => brand.name))
        ]],
        model: [this.vehicle.vehicle.model],
        conditionOnEntrance: [this.vehicle.vehicle.conditionOnEntrance],
        residualValueBeforeFD: [this.vehicle.vehicle.residualValueBeforeFD, Validators.pattern(/^[0-9]+$/)],
        engineNo: [this.vehicle.vehicle.engineNo],
        registrationDate: [this.vehicle.vehicle.registrationDate],
        totalMassKG: [this.vehicle.vehicle.totalMassKG, Validators.pattern(/^[0-9]+$/)],
        lengthOverallMM: [this.vehicle.vehicle.lengthOverallMM, Validators.pattern(/^[0-9]+$/)],
        color: [this.vehicle.vehicle.color],
        aquisitionType: [this.fu.idToName(this.vehicle.vehicle.aquisitionType, this.btity.types['aquisitionTypes']), [
          this.sv.notListedButCanBeEmpty(this.btity.types.aquisitionTypes.map(type => type.name))
        ]],
        aquisitionOtherTypeDetail: [this.vehicle.vehicle.aquisitionOtherTypeDetail],
        displacementML: [this.vehicle.vehicle.displacementML, Validators.pattern(/^[0-9]+$/)],
        displacementL: [this.vehicle.vehicle.displacementL], // todo: delete this line once ver1 show-vehicle-details is gone
        fuelType: [this.fu.idToName(this.vehicle.vehicle.fuelType, this.btity.types['fuelTypes']), [
          this.sv.notListedButCanBeEmpty(this.btity.types.fuelTypes.map(type => type.name))
        ]],
        seats: [this.vehicle.vehicle.seats, Validators.pattern(/^[0-9]{1,2}$/)],
        isNEV: [this.vehicle.vehicle.isNEV ? true : false, [this.sv.shouldBeBoolean()]],
      }),
    });

    this.fformRxx.next(this.fform);
    this.valueChangesRx = this.fform.valueChanges
      .startWith(null)
      .map(v => {
        // if (this.fform.valid) {
          const allV = this.fform.getRawValue();
          allV['vehicle']['vehicleType'] = this.fu.nameToId(allV['vehicle']['vehicleType'], this.btity.types['vehicleTypes']);
          allV['vehicle']['useCharacter'] = this.fu.nameToId(allV['vehicle']['useCharacter'], this.btity.types['useCharacters']);
          allV['vehicle']['brand'] = this.fu.nameToId(allV['vehicle']['brand'], this.btity.brands);
          allV['vehicle']['aquisitionType'] = this.fu.nameToId(allV['vehicle']['aquisitionType'], this.btity.types['aquisitionTypes']);
          allV['vehicle']['fuelType'] = this.fu.nameToId(allV['vehicle']['fuelType'], this.btity.types['fuelTypes']);
          return allV;
        // }
      });

  }

  onBrandBlur(event) {
    console.log(event);
  }

}