import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators, ValidatorFn, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { AsyncDataLoaderService, SubHolder, BaseForComponentWithAsyncData } from '../../shared/async-data-loader';
import { DataService } from '../../data/data.service';
import { SharedValidatorsService } from '../../shared/validators/shared-validators.service';
import { CalculatePatchesService } from '../../shared/calculate-patches/calculate-patches.service';

@Component({
  selector: 'app-admin-parts-and-wastes',
  templateUrl: './admin-parts-and-wastes.component.html',
  styleUrls: ['./admin-parts-and-wastes.component.scss']
})
export class AdminPartsAndWastesComponent extends BaseForComponentWithAsyncData implements OnInit, OnDestroy  {
  asyncDataHolderId = 'AdminPartsAndWastesComponent';
  dataRxHash = {
    btity: this.backend.refreshBtityRx()
  };
  holderPub: SubHolder;

  typesForm: FormGroup;
  // typesFormValueChanges_: Subscription;

  constructor(
    private cp: CalculatePatchesService,
    private sv: SharedValidatorsService,
    private fb: FormBuilder,
    asyncDataLoader: AsyncDataLoaderService,
    backend: DataService
  ) {
    super(asyncDataLoader, backend);
   }

  ngOnInit() {
    super.ngOnInit();
    this.holderPub = this.holder;
    const sub0_ = this.holderPub.isLoadedWithoutErrorRxx
      .filter(v => v)
      .subscribe(() => this.rebuildForm());
    this.subscriptions.push(sub0_);


  }

  rebuildForm() {
    const types = this.holderPub.latestResultRxxHash['btity'].getValue()['types'];

    const parts = (types.parts as {id: string, name: string}[]).sort((a, b) => {
      return a.id.localeCompare(b.id);
    });
    const wastes = (types.wastes as {id: string, name: string}[]).sort((a, b) => {
      return a.id.localeCompare(b.id);
    });

    this.typesForm = this.fb.group({
      parts: this.fb.array(parts.map(p => {
        return this.fb.group({
          id: {value: p.id, disabled: true},
          name: [{value: p.name, disabled: true}, [this.sv.duplicateNameInObjArray(parts)]]
        });
      })),
      wastes: this.fb.array(wastes.map(w => {
        return this.fb.group({
          id: {value: w.id, disabled: true},
          name: [{value: w.name, disabled: true}, [this.sv.duplicateNameInObjArray(wastes)]]
        });
      }))
    });


  }

  onSubmit() {
    const oldTypes = this.holderPub.latestResultRxxHash['btity'].getValue()['types'];
    const newAddons = [
      {parts: this.typesForm.getRawValue().parts},
      {wastes: this.typesForm.getRawValue().wastes},
    ];
    const patches = this.cp.calculatePatches(oldTypes, newAddons);
    // console.log(patches);
    const sub0_ = this.backend.updateTypes(patches)
      .catch(err => Observable.of({
        ok: false,
        err
      }))
      .subscribe(result => {
        if (!result.ok) {console.log('error occured when updating types:', result.err); }
        this.holderPub.refreshAll();
      });
    this.subscriptions.push(sub0_);
  }

}
