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
  filteredVTypeNamesRx: Observable<any[]>;
  filteredUseCharacterNamesRx: Observable<any[]>;
  aquisitionTypeNames: any[];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.vehicleForm = this.fb.group({
      id: {value: this.vehicle.id, disabled: true},
      vehicle: this.fb.group({
        plateNo: [this.vehicle.vehicle.plateNo, [Validators.required, Validators.pattern(/^.{7,7}$/)]],
        // switch to vehicleType obj when submitting the form
        vehicleTypeName: [this.vehicle.vehicle.vehicleType.name, [
          this.notListedValidator(this.types.vehicleTypes.map(obj => obj.name))]
        ],
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
        aquisitionTypeName: [this.vehicle.vehicle.aquisition.type.name],
        aquisitionTypeDetail: [
          this.vehicle.vehicle.aquisition.type.name === '其他' && this.vehicle.vehicle.aquisition.type.detail ?
             this.vehicle.vehicle.aquisition.type.detail : ''
        ]

      }),
      owner: this.fb.group({
        name: [this.vehicle.owner.name, Validators.required],
        addressShort: [this.vehicle.owner.addressShort],
        addressLong: [this.vehicle.owner.addressLong],
        zipCode: [this.vehicle.owner.zipCode, Validators.pattern(/^[0-9]{6,6}$/)],
        idNo: [this.vehicle.owner.idNo],
        tel: [this.vehicle.owner.tel]
      })
    });

    this.filteredBrandNamesRx = this.vehicleForm.get('vehicle.brandName').valueChanges
        .startWith(null)
        .map(value => this.filterObjList(this.types.brands, value));

    this.filteredVTypeNamesRx = this.vehicleForm.get('vehicle.vehicleTypeName').valueChanges
      .startWith(null)
      .map(value => this.filterObjList(this.types.vehicleTypes, value));

    this.filteredUseCharacterNamesRx = this.vehicleForm.get('vehicle.useCharacterName').valueChanges
      .startWith(null)
      .map(value => this.filterObjList(this.types.useCharacters, value));

    this.aquisitionTypeNames = this.types.aquisitionTypes.map(obj => obj.name);
  }


  filterObjList(objList: {[key: string]: any}[], value: any): any[] {
    const list = objList.map(obj => obj.name);
    return value ? list.filter(item => new RegExp(`^${value}`, 'gi').test(item)) : list;
  }


  notListedValidator(list: any[]): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      const value = control.value;
      const notListed = list.indexOf(value) === -1;
      return notListed ? {'notListed': {value}} : null;
    };
  }

}
