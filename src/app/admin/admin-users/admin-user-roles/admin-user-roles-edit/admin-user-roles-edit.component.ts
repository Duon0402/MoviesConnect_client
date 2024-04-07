import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../../../../_services/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-user-roles-edit',
  templateUrl: './admin-user-roles-edit.component.html',
  styleUrls: ['./admin-user-roles-edit.component.css'] // Chú ý đến 'styleUrls'
})
export class AdminUserRolesEditComponent implements OnInit {
  userWithRole: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AdminUserRolesEditComponent>,
  ) {}

  ngOnInit(): void {
    this.userWithRole = { ...this.data.data };
  }

  editRole() {
    this.dialogRef.close(this.userWithRole);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
