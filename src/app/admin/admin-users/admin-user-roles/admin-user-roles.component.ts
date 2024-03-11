import { AdminService } from './../../../_services/admin.service';
import { Component, OnInit } from '@angular/core';
import { TableColumn } from '../../../_models/tableColumn';
import { UsersWithRolesDto } from '../../../../shared/service-proxies/proxies.service';
import { MatTableDataSource } from '@angular/material/table';

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
    { displayedColumn: 'actions', header: 'Actions' },
  ];
  tableData: UsersWithRolesDto[] = [];

  constructor(private adminService: AdminService) {}

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

  onDetail(row: UsersWithRolesDto) {
    console.log('Detail action clicked for user:', row);
    // Implement your detail action logic here
  }
}
