import { AdminService } from './../../../_services/admin.service';
import { Component, OnInit } from '@angular/core';
import { TableColumn } from '../../../_models/tableColumn';
import { UsersWithRolesDto } from '../../../../shared/service-proxies/proxies.service';

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
}
