import { MemberService } from './../../../_services/member.service';
import { Component, Input, OnInit } from '@angular/core';
import {
  AccountOutputDto,
  PointTransactionOutputDto,
  ProxiesService,
} from '../../../../shared/service-proxies/proxies.service';
import { TableColumn } from '../../../_models/tableColumn';
import { AccountService } from '../../../_services/account.service';
import { take } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-member-point',
  templateUrl: './member-point.component.html',
  styleUrl: './member-point.component.css',
})
export class MemberPointComponent implements OnInit {
  @Input() memberPoints!: any;

  tableColumns: TableColumn[] = [
    {
      displayedColumn: 'transactionDate',
      header: 'Transaction Date',
      dateColumn: true,
    },
    { displayedColumn: 'pointsChange', header: 'Points Change' },
    { displayedColumn: 'description', header: 'Description' },
  ];

  tableData: PointTransactionOutputDto[] = [];  currentUser!: AccountOutputDto | null;

  constructor(
    private _service: ProxiesService,
    private memberService: MemberService,
    private accountService: AccountService,
    public dialogRef: MatDialogRef<MemberPointComponent>
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((currentUser) => (this.currentUser = currentUser));
  }

  ngOnInit(): void {
    this.loadListPointTransactions();
  }

  loadListPointTransactions() {
    this._service.getListPointTransactions().subscribe((result) => {
      this.tableData = result;
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
