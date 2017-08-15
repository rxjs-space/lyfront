import { Component, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators, ValidatorFn, FormControl } from '@angular/forms';
import { SharedValidatorsService } from '../../validators/shared-validators.service';
import { FormUtilsService } from '../../form-utils/form-utils.service';
import { TimeCalculationService } from '../../time-calculation/time-calculation.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-vehicle-details-general',
  templateUrl: './vehicle-details-general.component.html',
  styleUrls: ['./vehicle-details-general.component.scss']
})
export class VehicleDetailsGeneralComponent implements OnInit, OnDestroy {
  valueChangesRx: Observable<any>;
  fform: FormGroup;
  @Input() vehicle: any;
  @Input() btity: any;
  @Input() isNew: boolean;
  facilityObjList: any;
  // @Input() checkMofcomValidityRxx: any;
  updateVehicleControlValidatorsOnIsDismantlingReadyRxx = new Subject();
  subscriptions: Subscription[] = [];
  surveyRoundsHash = [
    {value: 'zero', displayValue: '0'},
    {value: 'one', displayValue: '1'},
    {value: 'two', displayValue: '2'},
  ]
  constructor(
    private fb: FormBuilder,
    private sv: SharedValidatorsService,
    private fu: FormUtilsService,
    private tc: TimeCalculationService
  ) { }

  ngOnInit() {
    this.facilityObjList = this.btity.types.facilities.filter(i => i.name !== '隆运总部');
    this.fform = this.fb.group({
      vin: [this.vehicle.vin, [Validators.required, this.sv.startedWithSpace()]],
      batchId: [this.vehicle.batchId, this.sv.startedWithSpace()],
      source: [this.fu.idToName(this.vehicle.source, this.btity.types['sources']), [
        Validators.required,
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
      entranceDate: [this.vehicle.entranceDate || this.tc.getTodayDateBeijing(), [Validators.required]],
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
      internalSurveyor: [
        this.fu.idToName(this.vehicle.internalSurveyor,
        this.btity.staffs, 'displayName'), [this.sv.startedWithSpace(), Validators.required]
      ],
      isSurveyNecessary: [this.vehicle.isSurveyNecessary, [this.sv.shouldBeBoolean(), Validators.required]],
      surveyRounds: [this.vehicle.surveyRounds, [Validators.required]],
      status2: this.fb.group({
        isSurveyReady: [this.vehicle.status2.isSurveyReady, [this.sv.shouldBeBoolean(), Validators.required]],
        isSurveyNotReadyReason: [this.vehicle.status2.isSurveyNotReadyReason],
        isSurveyNotReadySince: [this.vehicle.status2.isSurveyNotReadySince],
        isSurveyNotReadyTill: [this.vehicle.status2.isSurveyNotReadyTill],
        isDismantlingReady: [this.vehicle.status2.isDismantlingReady, [this.sv.shouldBeBoolean(), Validators.required]],
        isDismantlingNotReadyReason: [this.vehicle.status2.isDismantlingNotReadyReason],
        isDismantlingNotReadySince: [this.vehicle.status2.isDismantlingNotReadySince],
        isDismantlingNotReadyTill: [this.vehicle.status2.isDismantlingNotReadyTill],
        dismantlingOrderId: [this.vehicle.status2.dismantlingOrderId]
        // dismantling: this.vehicle.status2.dismantling,
        // auctioning: this.vehicle.status2.auctioning,
      }),
      estimatedSurveyDateFirst: [this.vehicle.estimatedSurveyDateFirst],
      estimatedSurveyDateSecond: [this.vehicle.estimatedSurveyDateSecond],
      // estimatedSurveyDatesUseDefault: ['']
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

    const sub0_ = this.fform.get('status2.isDismantlingReady').valueChanges
    .startWith(this.vehicle.status2.isDismantlingReady)
    .subscribe(v => {
      const isDismantlingNotReadyReasonCtrl = this.fform.get('status2.isDismantlingNotReadyReason');
      const isDismantlingNotReadySinceCtrl = this.fform.get('status2.isDismantlingNotReadySince');
      if (!v) { // when dismantling is not ready, set validators for isDismantlingNotReadyReason
        // console.log('setting validators');
        this.updateVehicleControlValidatorsOnIsDismantlingReadyRxx.next(false);
        isDismantlingNotReadyReasonCtrl.setValidators([
          this.sv.startedWithSpace(), Validators.required
        ]);
        isDismantlingNotReadyReasonCtrl.markAsDirty();
        isDismantlingNotReadyReasonCtrl.updateValueAndValidity();

        if ((typeof isDismantlingNotReadySinceCtrl.value !== 'string') || !isDismantlingNotReadySinceCtrl.value) {
          isDismantlingNotReadySinceCtrl.setValue((new Date()).toISOString().slice(0, 10));
        }
      } else {
        this.updateVehicleControlValidatorsOnIsDismantlingReadyRxx.next(true);
        isDismantlingNotReadyReasonCtrl.clearValidators();
        isDismantlingNotReadyReasonCtrl.updateValueAndValidity();
      }
    });

    this.subscriptions.push(sub0_);

    const sub1_ = Observable.combineLatest(
      this.fform.get('status2.isSurveyReady').valueChanges.startWith(this.vehicle.status2.isSurveyReady),
      this.fform.get('surveyRounds').valueChanges.startWith(this.fform.get('surveyRounds').value),
    ).subscribe(combo => {
      // console.log(combo);
      const isSurveyReady = combo[0];
      const surveyRounds = combo[1];

      const isSurveyNotReadyReasonCtrl = this.fform.get('status2.isSurveyNotReadyReason');
      const isSurveyNotReadySinceCtrl = this.fform.get('status2.isSurveyNotReadySince');
      const firstSurveyDateCtrl = this.fform.get('estimatedSurveyDateFirst');
      const secondSurveyDateCtrl = this.fform.get('estimatedSurveyDateSecond');

      switch (true) {
        case !isSurveyReady && surveyRounds !== 'zero':
          isSurveyNotReadyReasonCtrl.setValidators([
            this.sv.startedWithSpace(), Validators.required
          ]);
          isSurveyNotReadyReasonCtrl.updateValueAndValidity();
          if ((typeof isSurveyNotReadySinceCtrl.value !== 'string') || !isSurveyNotReadySinceCtrl.value) {
            isSurveyNotReadySinceCtrl.setValue((new Date()).toISOString().slice(0, 10));
          }

          firstSurveyDateCtrl.clearValidators();
          firstSurveyDateCtrl.updateValueAndValidity();
          secondSurveyDateCtrl.clearValidators();
          secondSurveyDateCtrl.updateValueAndValidity();
          break;
        case isSurveyReady && surveyRounds === 'one':
          isSurveyNotReadyReasonCtrl.clearValidators();
          isSurveyNotReadyReasonCtrl.updateValueAndValidity();
          firstSurveyDateCtrl.setValidators(Validators.required);
          firstSurveyDateCtrl.updateValueAndValidity();
          secondSurveyDateCtrl.clearValidators();
          secondSurveyDateCtrl.updateValueAndValidity();
          break;
        case isSurveyReady && surveyRounds === 'two':
          isSurveyNotReadyReasonCtrl.clearValidators();
          isSurveyNotReadyReasonCtrl.updateValueAndValidity();
          firstSurveyDateCtrl.setValidators(Validators.required);
          firstSurveyDateCtrl.updateValueAndValidity();
          secondSurveyDateCtrl.setValidators(Validators.required);
          secondSurveyDateCtrl.updateValueAndValidity();
          break;

      }
    });

    // .subscribe(v => {
    //   const isSurveyNotReadyReasonCtrl = this.fform.get('status2.isSurveyNotReadyReason');
    //   const isSurveyNotReadySinceCtrl = this.fform.get('status2.isSurveyNotReadySince');
    //   const firstSurveyDateCtrl = this.fform.get('estimatedSurveyDateFirst');
    //   const secondSurveyDateCtrl = this.fform.get('estimatedSurveyDateSecond');
    //   if (!v) { // when survey is not ready, set validators for isSurveyNotReadyReason
    //     isSurveyNotReadyReasonCtrl.setValidators([
    //       this.sv.startedWithSpace(), Validators.required
    //     ]);
    //     isSurveyNotReadyReasonCtrl.updateValueAndValidity();
    //     if ((typeof isSurveyNotReadySinceCtrl.value !== 'string') || !isSurveyNotReadySinceCtrl.value) {
    //       isSurveyNotReadySinceCtrl.setValue((new Date()).toISOString().slice(0, 10));
    //     }

    //     firstSurveyDateCtrl.clearValidators();
    //     firstSurveyDateCtrl.updateValueAndValidity();
    //     secondSurveyDateCtrl.clearValidators();
    //     secondSurveyDateCtrl.updateValueAndValidity();
    //   } else {
    //     isSurveyNotReadyReasonCtrl.clearValidators();
    //     isSurveyNotReadyReasonCtrl.updateValueAndValidity();
    //     firstSurveyDateCtrl.setValidators(Validators.required);
    //     firstSurveyDateCtrl.updateValueAndValidity();
    //     secondSurveyDateCtrl.setValidators(Validators.required);
    //     secondSurveyDateCtrl.updateValueAndValidity();
    //   }
    // });

    this.subscriptions.push(sub1_);

    const sub2_ = this.fform.get('source').valueChanges
    .startWith(this.vehicle.source)
    .subscribe(v => {
      if (v === '交警') {
        this.fform.get('batchId').setValidators([Validators.required]);
        this.fform.get('batchId').updateValueAndValidity();
      } else {
        this.fform.get('batchId').clearValidators();
        this.fform.get('batchId').updateValueAndValidity();
      }
    });

    this.valueChangesRx = this.fform.valueChanges
      .startWith(null)
      .map(v => {
        // if (this.fform.valid) {

          const allV = this.fform.getRawValue();
          allV.source = this.fu.nameToId(allV.source, this.btity.types['sources']);
          allV.mofcomRegisterType = this.fu.nameToId(allV.mofcomRegisterType, this.btity.types['mofcomRegisterTypes']);
          allV.consignmentType = this.fu.nameToId(allV.consignmentType, this.btity.types['consignmentTypes']);
          allV.facility = this.fu.nameToId(allV.facility, this.btity.types['facilities']);
          allV.internalSurveyor = this.fu.nameToId(allV.internalSurveyor, this.btity.staffs, 'displayName');
          return allV;
        // }

      });

    // this.checkMofcomValidityRxx.subscribe((mofcomRegisterType) => {
    //   // no validation rule needs to be changed for general part
    // });

    // const subOnDismantlingReady_ = this.updateVehicleControlValidatorsOnIsDismantlingReadyRxx.subscribe(v => {
    //   if (v && this.fform.get('isSurveyNecessary').value) {
    //     this.fform.get('status2.isSurveyReady').setValue(true);
    //   }
    // });

    // this.subscriptions.push(subOnDismantlingReady_);



    const onIsDismantlingReadyAndSurveyRoundsChange_ = Observable.combineLatest(
      this.fform.get('status2.isDismantlingReady').valueChanges.startWith(this.fform.get('status2.isDismantlingReady').value),
      this.fform.get('surveyRounds').valueChanges.startWith(this.fform.get('surveyRounds').value),
    ).subscribe(combo => {
      const isDismantlingReady = combo[0];
      const surveyRounds = combo[1];
      const isSurveyReadyCtrl = this.fform.get('status2.isSurveyReady');
      switch (true) {
        case surveyRounds === 'zero':
          isSurveyReadyCtrl.setValue(false);
          break;
        case isDismantlingReady:
          isSurveyReadyCtrl.setValue(true);
          break;
      }

      switch (true) {
        case isDismantlingReady:
          isSurveyReadyCtrl.disable(); break;
        case !isDismantlingReady:
          isSurveyReadyCtrl.enable(); break;
      }
    });
    this.subscriptions.push(onIsDismantlingReadyAndSurveyRoundsChange_);

  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub_ => sub_.unsubscribe());
  }

}
