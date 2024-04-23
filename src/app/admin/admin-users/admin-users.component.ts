import { Component, OnInit } from '@angular/core';
import { TableColumn } from '../../_models/tableColumn';
import { MemberDto, ProxiesService } from '../../../shared/service-proxies/proxies.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css'
})
export class AdminUsersComponent implements OnInit{
  tableColumns: TableColumn[] = [
    { displayedColumn: 'id', header: 'ID' },
    { displayedColumn: 'username', header: 'Username' },
    { displayedColumn: 'fullName', header: 'Full Name' },
    { displayedColumn: 'avatar', header: 'Avatar', imageColumn: true, dateColumn: false},
    { displayedColumn: 'gender', header: 'Gender' },
    { displayedColumn: 'dateOfBirth', header: 'Date Of Birth', dateColumn: true },
    { displayedColumn: 'isPrivate', header: 'Is Private' },
  ];

  tableData: MemberDto[] = [];
  rowSelected: any;

  constructor(
    private _service: ProxiesService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this._service.getListUsers().subscribe(result => {
      this.tableData = result;
    })
  }
}
