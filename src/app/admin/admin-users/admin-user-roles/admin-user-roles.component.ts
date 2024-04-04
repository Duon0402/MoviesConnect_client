import { AdminService } from './../../../_services/admin.service';
import { Component, OnInit } from '@angular/core';
import { TableColumn } from '../../../_models/tableColumn';
import { UsersWithRolesDto } from '../../../../shared/service-proxies/proxies.service';
import { MatDialog } from '@angular/material/dialog';
import { AdminUserRolesEditComponent } from './admin-user-roles-edit/admin-user-roles-edit.component';
import { auto } from '@popperjs/core';

@Component({
  selector: 'app-admin-user-roles',
  templateUrl: './admin-user-roles.component.html',
  styleUrls: ['./admin-user-roles.component.css'],
})
export class AdminUserRolesComponent implements OnInit {
  keyword?: string;
  tableColumns: TableColumn[] = [
    { displayedColumn: 'id', header: 'ID' },
    { displayedColumn: 'username', header: 'Username' },
    { displayedColumn: 'roles', header: 'Roles' },
  ];
  tableData: UsersWithRolesDto[] = [];
  rowSelected: any;

  constructor(private adminService: AdminService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadUsersWithRoles();
  }

  loadUsersWithRoles() {
    this.adminService
      .getUsersWithRoles(this.keyword)
      .subscribe((data: any[]) => {
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
      // Note: neu rating ko thay doi thi ko can load lai (chua fix dc)
      if (result === true) {
      }
    });
  }
}
