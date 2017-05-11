import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, ValidatorFn, FormControl } from '@angular/forms';
import { SharedValidatorsService } from '../../shared/validators/shared-validators.service';

@Component({
  selector: 'app-vehicle-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  vehicleForm: FormGroup;

  constructor(private fb: FormBuilder, private sv: SharedValidatorsService) { }

  ngOnInit() {
    // this.vehicleForm = this.fb.group({
    //   id: '',
    //   mofcomRegistryType: ['', [
    //     this.validatorNotListedInObjList(this.types.mofcomRegistryTypes)
    //   ]],
    //   entranceDate: [this.vehicle.entranceDate],
    //   metadata: this.fb.group({
    //     isDeleted: [this.vehicle.metadata.isDeleted],
    //     deletedFor: [this.vehicle.metadata.deletedFor],
    //   }),
    //   vehicle: this.fb.group({
    //     plateNo: [this.vehicle.vehicle.plateNo, [Validators.required, Validators.pattern(/^.{7,7}$/)]],
    //     vehicleType: [this.vehicle.vehicle.vehicleType, [
    //       this.validatorNotListedInObjList(this.types.vehicleTypes)
    //     ]],
    //     useCharacter: [this.vehicle.vehicle.useCharacter, [
    //       this.validatorNotListedInObjList(this.types.useCharacters)
    //     ]],
    //     useCharacterName: [this.vehicle.vehicle.useCharacter.name, [
    //       this.notListedValidator(this.types.useCharacters.map(obj => obj.name))
    //     ]],
    //     brand: [this.vehicle.vehicle.brand],
    //     model: [this.vehicle.vehicle.model],
    //     engineNo: [this.vehicle.vehicle.engineNo],
    //     registrationDate: [this.vehicle.vehicle.registrationDate],
    //     totalMassKG: [this.vehicle.vehicle.totalMassKG, Validators.pattern(/^[0-9]+$/)],
    //     lengthOverallMM: [this.vehicle.vehicle.lengthOverallMM, Validators.pattern(/^[0-9]+$/)],
    //     color: [this.vehicle.vehicle.color],
    //     aquisitionType: [this.vehicle.vehicle.aquisitionType, [
    //       this.validatorNotListedInObjList(this.types.aquisitionTypes)
    //     ]],
    //     aquisitionDetail: [
    //       this.vehicle.vehicle.aquisitionType.name === '其他' && this.vehicle.vehicle.aquisitionDetail ?
    //          this.vehicle.vehicle.aquisitionDetail : ''
    //     ],
    //     displacementL: [this.vehicle.vehicle.displacementL, Validators.pattern(/^[0-9]{1,2}\.?[0-9]?$/)],
    //     fuelType: [this.vehicle.vehicle.fuelType, [
    //       this.validatorNotListedInObjList(this.types.fuelTypes)
    //     ]],
    //     seats: [this.vehicle.vehicle.seats, Validators.pattern(/^[0-9]{1,2}$/)],
    //     isNEV: [this.vehicle.vehicle.isNEV ? true : false, [this.validatorIsBoolean()]],
    //   }),
    //   owner: this.fb.group({
    //     name: [this.vehicle.owner.name, Validators.required],
    //     address: [this.vehicle.owner.address],
    //     zipCode: [this.vehicle.owner.zipCode, Validators.pattern(/^[0-9]{6,6}$/)],
    //     idType: [this.vehicle.owner.idType],
    //     idNo: [this.vehicle.owner.idNo],
    //     tel: [this.vehicle.owner.tel, Validators.pattern(/^[0-9]{7,11}$/)],
    //     isPerson: [this.vehicle.owner.isPerson],
    //     isRemote: [this.vehicle.owner.isRemote]
    //   }),
    //   agent: this.fb.group({
    //     name: [this.vehicle.agent.name],
    //     idType: [this.vehicle.owner.idType],
    //     idNo: [this.vehicle.agent.idNo],
    //     tel: [this.vehicle.agent.tel, Validators.pattern(/^[0-9]{7,11}$/)],
    //   }),
    //   docsProvided: this.fb.group({
    //     vRegistrationCert: [this.vehicle.docsProvided.vRegistrationCert ? this.vehicle.docsProvided.vRegistrationCert : false],
    //     vLicenseA: [this.vehicle.docsProvided.vLicenseA],
    //     vLicenseB: [this.vehicle.docsProvided.vLicenseB],
    //     plateCount: [this.vehicle.docsProvided.plateCount, Validators.pattern(/^[0-2]$/)]
    //   }),
    // });

  }

}
