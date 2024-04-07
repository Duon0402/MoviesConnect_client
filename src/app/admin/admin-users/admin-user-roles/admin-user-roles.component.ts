import { AdminService } from './../../../_services/admin.service';
import { Component, OnInit } from '@angular/core';
import { TableColumn } from '../../../_models/tableColumn';
import { UsersWithRolesDto } from '../../../../shared/service-proxies/proxies.service';
import { MatDialog } from '@angular/material/dialog';
import { AdminUserRolesEditComponent } from './admin-user-roles-edit/admin-user-roles-edit.component';
import { auto } from '@popperjs/core';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-admin-user-roles',
  templateUrl: './admin-user-roles.component.html',
  styleUrls: ['./admin-user-roles.component.css'],
})
export class AdminUserRolesComponent implements OnInit {
  tableColumns: TableColumn[] = [
    { displayedColumn: 'id', header: 'ID' },
    { displayedColumn: 'username', header: 'Username' },
    { displayedColumn: 'roles', header: 'Roles' },
  ];
  tableData: UsersWithRolesDto[] = [];
  rowSelected: any;

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadUsersWithRoles();
  }

  loadUsersWithRoles() {
    this.adminService.getUsersWithRoles().subscribe((data: any[]) => {
      this.tableData = data;
    });
  }
  onRowSelected(selectedRow: any) {
    this.rowSelected = selectedRow;
  }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(AdminUserRolesEditComponent, {
      width: '500px',
      height: auto,
      data: { data: this.rowSelected },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        this.editRole(result.username, [result.roles]);
      }
    });
  }

  editRole(username: any, role: any[]) {
    this.adminService
      .updateUserRoles(username, role)
      .pipe(
        finalize(() => {
          this.toastr.success('Change Role User Successfully');
        })
      )
      .subscribe(() => {
        this.loadUsersWithRoles();
      });
  }
}
