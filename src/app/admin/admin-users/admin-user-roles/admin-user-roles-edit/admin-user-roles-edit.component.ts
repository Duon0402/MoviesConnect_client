import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../../../../_services/admin.service';
import { UsersWithRolesDto } from '../../../../../shared/service-proxies/proxies.service';

@Component({
  selector: 'app-admin-user-roles-edit',
  templateUrl: './admin-user-roles-edit.component.html',
  styleUrl: './admin-user-roles-edit.component.css'
})
export class AdminUserRolesEditComponent implements OnInit{
  roles!: string[];
  userWithRole!: UsersWithRolesDto;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AdminUserRolesEditComponent>,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    console.log(this.data.data);

  }

  editRoles() {
    this.adminService.updateUserRoles(this.data.username, this.roles);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
