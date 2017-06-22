import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators, ValidatorFn, FormControl } from '@angular/forms';
import { SharedValidatorsService } from '../../validators/shared-validators.service';
import { FormUtilsService } from '../../form-utils/form-utils.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-vehicle-details-docs-provided',
  templateUrl: './vehicle-details-docs-provided.component.html',
  styleUrls: ['./vehicle-details-docs-provided.component.scss']
})
export class VehicleDetailsDocsProvidedComponent implements OnInit {

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
      docsProvided: this.fb.group({
        vRegistrationCert: [this.vehicle.docsProvided.vRegistrationCert],
        vLicenseA: [this.vehicle.docsProvided.vLicenseA],
        vLicenseB: [this.vehicle.docsProvided.vLicenseB],
        plateCount: [this.vehicle.docsProvided.plateCount, Validators.pattern(/^[0-2]$/)],
        infoQueryForm: [this.vehicle.docsProvided.infoQueryForm],
        ownerOIdCopy: [this.vehicle.docsProvided.ownerOIdCopy],
        ownerPIdCopy: [this.vehicle.docsProvided.ownerPIdCopy],
        agentIdCopy: [this.vehicle.docsProvided.agentIdCopy],
        registrationTransferDeregistrationApplication: [this.vehicle.docsProvided.registrationTransferDeregistrationApplication],
        surveyRecords: [this.vehicle.docsProvided.surveyRecords],
        powerOfAttorney: [this.vehicle.docsProvided.powerOfAttorney],
        orgDeregistrationFormCopy: [this.vehicle.docsProvided.orgDeregistrationFormCopy],
        orgRenamingDoc: [this.vehicle.docsProvided.orgRenamingDoc],
        statementOfLossOnNewspaper: [this.vehicle.docsProvided.statementOfLossOnNewspaper],
        ownershipCert: [this.vehicle.docsProvided.ownershipCert],
        affiliationAgreement: [this.vehicle.docsProvided.affiliationAgreement],
        others: [this.vehicle.docsProvided.others],
      }),
    });

    this.valueChangesRx = this.fform.valueChanges
      .startWith(null)
      .map(v => {
        // if (this.fform.valid) {
          const allV = this.fform.getRawValue();
          return allV;
        // }
      });

  }

}
