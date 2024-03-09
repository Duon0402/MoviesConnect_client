import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../../../_services/admin.service';
import { UsersWithRolesDto } from '../../../../shared/service-proxies/proxies.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-admin-user-roles',
  templateUrl: './admin-user-roles.component.html',
  styleUrls: ['./admin-user-roles.component.css'],
})
export class AdminUserRolesComponent{
  header =  ['id, name, roles']
}
