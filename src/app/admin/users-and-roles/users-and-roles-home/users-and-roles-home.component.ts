import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

import { UserEditDialogComponent } from '../user-edit-dialog/user-edit-dialog.component';
@Component({
  selector: 'app-users-and-roles-home',
  templateUrl: './users-and-roles-home.component.html',
  styleUrls: ['./users-and-roles-home.component.scss']
})
export class UsersAndRolesHomeComponent implements OnInit {

  constructor(
    private dialog: MdDialog
  ) { }

  ngOnInit() {
  }

  openUserEditDialog(userId) {
    this.dialog.open(UserEditDialogComponent, {
      width: '300px',
      disableClose: true,
      data: {
        userId
      }
    })
  }

}
