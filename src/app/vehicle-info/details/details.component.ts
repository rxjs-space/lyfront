import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, ValidatorFn, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-vehicle-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  vehicleForm: FormGroup;
  @Input() vehicle;
  @Input() types;
  @Input() titles;

  filteredBrandNamesRx: Observable<any[]>;
  filteredVTypesRx: Observable<any[]>;
  filteredVTypeNamesRx: Observable<any[]>;
  filteredUseCharacterNamesRx: Observable<any[]>;
  filteredAquistionTypeNamesRx: Observable<any[]>;
  filteredFuelTypeNamesRx: Observable<any[]>;
  aquisitionTypeNames: any[];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.vehicleForm = this.fb.group({
      id: {value: this.vehicle.id, disabled: true},
      mofcomRegistryType: [this.vehicle.mofcomRegistryType, [
        this.validatorNotListedInObjList(this.types.mofcomRegistryTypes)
      ]],
      entranceDate: [this.vehicle.entranceDate],
      vehicle: this.fb.group({
        plateNo: [this.vehicle.vehicle.plateNo, [Validators.required, Validators.pattern(/^.{7,7}$/)]],
        vehicleType: [this.vehicle.vehicle.vehicleType, [
          this.validatorNotListedInObjList(this.types.vehicleTypes)
        ]],
        useCharacterName: [this.vehicle.vehicle.useCharacter.name, [
          this.notListedValidator(this.types.useCharacters.map(obj => obj.name))
        ]],
        brandName: [this.vehicle.vehicle.brand.name],
        model: [this.vehicle.vehicle.model],
        engineNo: [this.vehicle.vehicle.engineNo],
        registrationDate: [this.vehicle.vehicle.registrationDate],
        totalMassKG: [this.vehicle.vehicle.totalMassKG, Validators.pattern(/^[0-9]+$/)],
        lengthOverallMM: [this.vehicle.vehicle.lengthOverallMM, Validators.pattern(/^[0-9]+$/)],
        color: [this.vehicle.vehicle.color],
        aquisitionTypeName: [this.vehicle.vehicle.aquisition.type.name, [
          this.notListedValidator(this.types.aquisitionTypes.map(obj => obj.name))
        ]],
        aquisitionTypeDetail: [
          this.vehicle.vehicle.aquisition.type.name === '其他' && this.vehicle.vehicle.aquisition.type.detail ?
             this.vehicle.vehicle.aquisition.type.detail : ''
        ],
        displacementL: [this.vehicle.vehicle.displacementL, Validators.pattern(/^[0-9]{1,2}\.?[0-9]?$/)],
        fuelTypeName: [this.vehicle.vehicle.fuelType.name],
        seats: [this.vehicle.vehicle.seats, Validators.pattern(/^[0-9]{1,2}$/)],
        isNEV: [this.vehicle.vehicle.isNEV ? true : false, [this.validatorIsBoolean()]],

      }),
      owner: this.fb.group({
        name: [this.vehicle.owner.name, Validators.required],
        addressShort: [this.vehicle.owner.addressShort],
        addressLong: [this.vehicle.owner.addressLong],
        zipCode: [this.vehicle.owner.zipCode, Validators.pattern(/^[0-9]{6,6}$/)],
        idNo: [this.vehicle.owner.idNo],
        tel: [this.vehicle.owner.tel, Validators.pattern(/^[0-9]{7,11}$/)],
        isPerson: [this.vehicle.owner.isPerson]
      })
    });


    this.filteredBrandNamesRx = this.vehicleForm.get('vehicle.brandName').valueChanges
        .startWith(null)
        .map(value => this.filterObjList(this.types.brands, value));

    this.filteredVTypesRx = this.valueChangesToFilteredObjListRx(
      this.vehicleForm, 'vehicle.vehicleType', this.types.vehicleTypes, this.filterObjList2
    );
    
    
    // this.vehicleForm.get('vehicle.vehicleType').valueChanges
    //   .startWith(null)
    //   .map(value => this.filterObjList2(this.types.vehicleTypes, value));

    this.filteredUseCharacterNamesRx = this.vehicleForm.get('vehicle.useCharacterName').valueChanges
      .startWith(null)
      .map(value => this.filterObjList(this.types.useCharacters, value));

    this.filteredAquistionTypeNamesRx = this.vehicleForm.get('vehicle.useCharacterName').valueChanges
      .startWith(null)
      .map(value => this.filterObjList(this.types.aquisitionTypes, value));

    this.filteredFuelTypeNamesRx = this.vehicleForm.get('vehicle.fuelTypeName').valueChanges
      .startWith(null)
      .map(value => this.filterObjList(this.types.fuelTypes, value));

    this.aquisitionTypeNames = this.types.aquisitionTypes.map(obj => obj.name);
  }

  valueChangesToFilteredObjListRx(fg: FormGroup, ctrlPath: string, objList: {[key: string]: any}[], filterFn) {
    console.log(JSON.stringify(objList));
    return fg.get(ctrlPath).valueChanges
      .startWith(null)
      .map(value => filterFn(objList, value));
  }


  filterObjList(objList: {[key: string]: any}[], value: any): any[] {
    const list = objList.map(obj => obj.name);
    return value ? list.filter(item => new RegExp(`^${value}`, 'gi').test(item)) : list;
  }

  filterObjList2(objList: {[key: string]: any}[], value: any): any[] {
    return value ? objList.filter(item => new RegExp(`^${value}`, 'gi').test(item.name)) : objList;
  }

  notListedValidator(list: any[]): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      const value = control.value;
      const notListed = list.indexOf(value) === -1;
      return notListed ? {'notListed': {value}} : null;
    };
  }

  validatorNotListedInObjList(objList: {[key: string]: any}[]): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      const value = control.value;
      let notListed = true;
      for (let i = 0; i < objList.length; i++) {
        if (this.isEquivalent(objList[i], value)) {
          notListed = false;
          break;
        }
      }
      return notListed ? {'notListed': {value}} : null;
    };
  }

  validatorIsBoolean(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      const value = control.value;
      const isBoolean = typeof value === 'boolean';
      return isBoolean ? null : {'notBooleanValue': {value}};
    }
  }

  isEquivalent(a, b) {
      // Create arrays of property names
      const aProps = Object.getOwnPropertyNames(a);
      const bProps = Object.getOwnPropertyNames(b);

      // If number of properties is different,
      // objects are not equivalent
      if (aProps.length != bProps.length) {
          return false;
      }

      for (let i = 0; i < aProps.length; i++) {
          const propName = aProps[i];

          // If values of same property are not equal,
          // objects are not equivalent
          if (a[propName] !== b[propName]) {
              return false;
          }
      }

      // If we made it this far, objects
      // are considered equivalent
      return true;
  }


  displayFnBoolean(ctrlValue) {
    return ctrlValue ? '是' : '否';
  }

  displayFnObj(ctrlValue) {
    return ctrlValue.name;
  }

}
