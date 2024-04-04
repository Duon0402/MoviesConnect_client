import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../../../../_services/admin.service';
import { UsersWithRolesDto } from '../../../../../shared/service-proxies/proxies.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-user-roles-edit',
  templateUrl: './admin-user-roles-edit.component.html',
  styleUrl: './admin-user-roles-edit.component.css'
})
export class AdminUserRolesEditComponent implements OnInit{
  roles!: string[];
  userWithRole!: UsersWithRolesDto | any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AdminUserRolesEditComponent>,
    private adminService: AdminService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.userWithRole = this.data.data;

    console.log(this.userWithRole);

  }

  editRole() {
    this.adminService.updateUserRoles(this.userWithRole.username, this.roles)
      .subscribe(() => {
        this.toastr.success("Change Role User Successfuly");
      })
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}
