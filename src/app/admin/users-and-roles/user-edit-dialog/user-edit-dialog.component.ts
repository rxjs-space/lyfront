import { Component, Inject, Input, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { AsyncDataLoaderService, SubHolder, BaseForComponentWithAsyncData } from '../../../shared/async-data-loader';
import { SharedValidatorsService } from '../../../shared/validators/shared-validators.service';
import { DataService } from '../../../data/data.service';


@Component({
  selector: 'app-user-edit-dialog',
  templateUrl: './user-edit-dialog.component.html',
  styleUrls: ['./user-edit-dialog.component.scss']
})
export class UserEditDialogComponent extends BaseForComponentWithAsyncData  implements OnInit, OnDestroy {
  @Input() userId: any;
  asyncDataHolderId = 'UserEditDialogComponent' + Math.random();
  dataRxHash = {
    user: this.backend.getUserById(this.dataFromTrigger.userId),
    roles: this.backend.getRoles()
  };
  holderPub: SubHolder;
  userForm: FormGroup;
  isNew: boolean;
  duplicateUsername_: Subscription;

  constructor(
    private sv: SharedValidatorsService,
    private fb: FormBuilder,
    public dialogRef: MdDialogRef<UserEditDialogComponent>,
    @Inject(MD_DIALOG_DATA) public dataFromTrigger: any,
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
      .subscribe(() => {
        this.rebuildForm();
      });
    this.subscriptions.push(sub0_);

  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.duplicateUsername_.unsubscribe();
  }

  rebuildForm() {
    // console.log(this.holderPub.latestResultRxxHash['user'].getValue());
    const user = this.holderPub.latestResultRxxHash['user'].getValue();
    this.isNew = user._id ? false : true;
    const roles = this.holderPub.latestResultRxxHash['roles'].getValue();

    this.userForm = this.fb.group({
      username: [
        user.username,
        [Validators.required]
      ],
      isActive: [user.isActive, Validators.required],
      roles: [user.roles]
    });

    if (this.duplicateUsername_) {this.duplicateUsername_.unsubscribe(); }
    this.duplicateUsername_ = this.userForm.get('username').valueChanges
      .do(v => {
        if (v) {
          this.userForm.get('username').setErrors({checkingDuplicateUsername: true});
        }
      })
      .debounceTime(500)
      .switchMap(v => {
        return this.backend.getUserByUserName(v)
          .map(res => {
            this.userForm.get('username').setErrors({duplicateUsername: v});
          })
          .catch(error => {
            this.userForm.get('username').setErrors(null);
            return Observable.of(null);
          });
      })
      .subscribe();

    // if (this.isNew) {
      const passwordCtrl = new FormControl(user.password, [Validators.required]);
      const passwordConfirmCtrl = new FormControl('', [
        Validators.required, this.sv.notMatchingOtherControl(passwordCtrl)
      ]);
      this.userForm.addControl('password', passwordCtrl);
      this.userForm.addControl('passwordConfirm', passwordConfirmCtrl);
      const backCheckSamePassword_ = passwordCtrl.valueChanges
        .subscribe(v => {
          if (passwordConfirmCtrl.value) {
            passwordConfirmCtrl.updateValueAndValidity();
          }
        });
      this.subscriptions.push(backCheckSamePassword_);
    // }


  }

  onSubmit() {
    const user = this.userForm.getRawValue();
    delete user.passwordConfirm;
    console.log(user);
    const sub0_ = this.backend.insertUser(user)
      .catch(error => Observable.of({
        ok: false, error
      }))
      .subscribe(res => {
        console.log(res);
        console.log(res._id);
        if (res.error) {
          console.log(res.error);
        } else {
          // close this dialog and open a new one
        }

      });
      this.subscriptions.push(sub0_);

    }


}
