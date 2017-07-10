import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { UsersAndRolesRoutingModule } from './users-and-roles-routing.module';
import { UsersAndRolesHomeComponent } from './users-and-roles-home/users-and-roles-home.component';
import { UserEditDialogComponent } from './user-edit-dialog/user-edit-dialog.component';

@NgModule({
  imports: [
    SharedModule,
    UsersAndRolesRoutingModule
  ],
  declarations: [UsersAndRolesHomeComponent, UserEditDialogComponent],
  entryComponents: [UserEditDialogComponent]
})
export class UsersAndRolesModule { }
