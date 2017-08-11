import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators, ValidatorFn, FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { SharedValidatorsService } from '../../validators/shared-validators.service';
import { FormUtilsService } from '../../form-utils/form-utils.service';
import { FormErrorsService } from '../../form-errors/form-errors.service';
import { DataService } from '../../../data/data.service';

@Component({
  selector: 'app-vehicle-details-vehicle',
  templateUrl: './vehicle-details-vehicle.component.html',
  styleUrls: ['./vehicle-details-vehicle.component.scss']
})
export class VehicleDetailsVehicleComponent implements OnDestroy, OnInit {
  fform: FormGroup;
  fformRxx = new BehaviorSubject(null);
  valueChangesRx: Observable<any>;
  formErrorsFormName = 'vehicleDetailsVehicle';
  formErrorsRxxHolder;
  @Input() vehicle: any;
  @Input() btity: any;
  @Input() checkMofcomValidityRxx: any;
  @Input() updateVehicleControlValidatorsOnIsDismantlingReadyRxx: Subject<boolean>;
  subscriptions: Subscription[] = [];
  insertingNewBrand = false;
  constructor(
    private fb: FormBuilder,
    private sv: SharedValidatorsService,
    private fu: FormUtilsService,
    private fe: FormErrorsService,
    private data: DataService
  ) { }

  ngOnInit() {
    const defaultValidators = {
      'vehicle.brand': [this.sv.notListedButCanBeEmpty(this.btity.brands.map(brand => brand.name))],
      'vehicle.model': [],
      'vehicle.engineNo': [],
      'vehicle.registrationDate': [],
      'vehicle.curbWeightKG': [],
      'vehicle.totalMassKG': [Validators.pattern(/^[0-9]+$/)],
      'vehicle.lengthOverallMM': [Validators.pattern(/^[0-9]+$/)],
      'vehicle.fuelType': [this.sv.notListedButCanBeEmpty(this.btity.types.fuelTypes.map(type => type.name))],
      'vehicle.seats': [Validators.pattern(/^[0-9]{1,2}$/)],
      'vehicle.conditionOnEntrance': [this.sv.startedWithSpace(), Validators.required],
    };
    this.fform = this.fb.group({
      vehicle: this.fb.group({
        plateNo: [this.vehicle.vehicle.plateNo, [Validators.required, Validators.pattern(/^.{7,7}$/), this.sv.startedWithSpace()]],
        vehicleType: [this.fu.idToName(this.vehicle.vehicle.vehicleType, this.btity.types['vehicleTypes']), [
          Validators.required,
          this.sv.notListedButCanBeEmpty(this.btity.types.vehicleTypes.map(type => type.name))
        ]],
        useCharacter: [this.fu.idToName(this.vehicle.vehicle.useCharacter, this.btity.types['useCharacters']), [
          this.sv.notListedButCanBeEmpty(this.btity.types.useCharacters.map(type => type.name)),
          Validators.required
        ]],
        brand: [this.fu.idToName(this.vehicle.vehicle.brand, this.btity.brands), defaultValidators['vehicle.brand']],
        model: [this.vehicle.vehicle.model, this.sv.startedWithSpace()],
        conditionOnEntrance: [this.vehicle.vehicle.conditionOnEntrance, defaultValidators['vehicle.conditionOnEntrance']],
        residualValueBeforeFD: [this.vehicle.vehicle.residualValueBeforeFD, Validators.pattern(/^[0-9]+$/)],
        engineNo: [this.vehicle.vehicle.engineNo, this.sv.startedWithSpace()],
        registrationDate: [this.vehicle.vehicle.registrationDate],
        curbWeightKG: [this.vehicle.vehicle.curbWeightKG, Validators.pattern(/^[0-9]+$/)],
        totalMassKG: [this.vehicle.vehicle.totalMassKG, defaultValidators['vehicle.totalMassKG']],
        lengthOverallMM: [this.vehicle.vehicle.lengthOverallMM, defaultValidators['vehicle.lengthOverallMM']],
        color: [this.vehicle.vehicle.color, this.sv.startedWithSpace()],
        aquisitionType: [this.fu.idToName(this.vehicle.vehicle.aquisitionType, this.btity.types['aquisitionTypes']), [
          this.sv.notListedButCanBeEmpty(this.btity.types.aquisitionTypes.map(type => type.name))
        ]],
        aquisitionOtherTypeDetail: [this.vehicle.vehicle.aquisitionOtherTypeDetail, this.sv.startedWithSpace()],
        displacementML: [this.vehicle.vehicle.displacementML, Validators.pattern(/^[0-9]+$/)],
        // displacementL: [this.vehicle.vehicle.displacementL], // todo: delete this line once ver1 show-vehicle-details is gone
        fuelType: [this.fu.idToName(this.vehicle.vehicle.fuelType, this.btity.types['fuelTypes']), defaultValidators['vehicle.fuelType']],
        seats: [this.vehicle.vehicle.seats, defaultValidators['vehicle.seats']],
        isNEV: [this.vehicle.vehicle.isNEV ? true : false, [this.sv.shouldBeBoolean(), Validators.required]],
        batterySlotCount: [this.vehicle.vehicle.batterySlotCount, [Validators.pattern(/^[0-9]+$/), Validators.required]]
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

    this.checkMofcomValidityRxx.subscribe((mofcomRegisterType) => {
      console.log(mofcomRegisterType);
      switch (mofcomRegisterType) {
        case '1':
        case '2':
          const requiredFields = [
            'vehicle.brand',
            'vehicle.model',
            'vehicle.engineNo',
            'vehicle.registrationDate',
            'vehicle.totalMassKG',
            'vehicle.lengthOverallMM',
            'vehicle.fuelType',
            'vehicle.seats',
          ];
          requiredFields.forEach(f => {
            this.fform.get(f).setValidators(defaultValidators[f].concat(Validators.required));
            this.fform.get(f).updateValueAndValidity();
          });
          break;
      }






    });
    this.updateVehicleControlValidatorsOnIsDismantlingReadyRxx
      .subscribe(v => {
        // console.log(v);
        if (v) { // only setup validators on 'true', without clearing validators on 'false'
          const requiredFields = [
            'vehicle.brand',
            'vehicle.model',
            'vehicle.registrationDate',
            'vehicle.curbWeightKG',
            'vehicle.conditionOnEntrance'
          ];
          requiredFields.forEach(f => {
            this.fform.get(f).setValidators(defaultValidators[f].concat(Validators.required));
            this.fform.get(f).updateValueAndValidity();
          });

        }
      })
    // // send errors to formErrorsService
    // this.formErrorsRxxHolder = this.fe.ini(this.formErrorsFormName);
    // const sub0_ = this.fform.valueChanges
    //   .subscribe(() => {
    //     const allErrors = {};
    //     const brandErrors = this.fform.get('vehicle.brand').errors;
    //     if (brandErrors) {
    //       this.formErrorsRxxHolder.next(Object.assign(allErrors, {
    //         brand: brandErrors
    //       }));
    //     }
    //     console.log(allErrors);
    //     this.formErrorsRxxHolder.next(allErrors);
    //   });

    // this.subscriptions.push(sub0_);
  }

  onBrandBlur(event) {
    console.log(event);
  }

  createNewBrand(brandName) {
    // insert brand, update this.btity, update data.btityRxx, reset validator
    this.insertingNewBrand = true;
    this.data.insertBrands({name: brandName})
      .catch(error => Observable.of({
        ok: false, error
      }))
      .subscribe(result => {
        if (result.error) {
          console.log('something went wrong while inserting brand');
        }
        const newBrands = this.btity.brands.concat(...result.ops);
        this.btity.brands = newBrands;
        this.data.btityRxx.next(Object.assign({}, this.btity, {
          brands: newBrands
        }));
        this.fform.get('vehicle.brand').setValidators([
          this.sv.notListedButCanBeEmpty(this.btity.brands.map(brand => brand.name))
        ]);
        this.fform.get('vehicle.brand').updateValueAndValidity();
        this.insertingNewBrand = false;
      });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub_ => sub_.unsubscribe());
  }

}


        // brand: [this.fu.idToName(this.vehicle.vehicle.brand, this.btity.brands), [
        //   this.sv.notListedButCanBeEmpty(this.btity.brands.map(brand => brand.name))
        // ]],