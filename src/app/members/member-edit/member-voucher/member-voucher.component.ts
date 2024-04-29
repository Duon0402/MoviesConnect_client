import { Component, Input, OnInit } from '@angular/core';
import {
  AccountOutputDto,
  ProxiesService,
  Voucher,
  VoucherOutputDto,
} from '../../../../shared/service-proxies/proxies.service';
import { TableColumn } from '../../../_models/tableColumn';
import { MemberPointComponent } from '../member-point/member-point.component';
import { MatDialog } from '@angular/material/dialog';
import { auto } from '@popperjs/core';
import { MemberRedeemPointsComponent } from '../member-redeem-points/member-redeem-points.component';
import { MemberService } from '../../../_services/member.service';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../../_services/account.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-member-voucher',
  templateUrl: './member-voucher.component.html',
  styleUrl: './member-voucher.component.css',
})
export class MemberVoucherComponent implements OnInit {
  memberPoints!: any;
  tableColumns: TableColumn[] = [
    { displayedColumn: 'code', header: 'Code' },
    { displayedColumn: 'value', header: 'Value($)' },
    {
      displayedColumn: 'expiryDate',
      header: 'Expiry Date',
      dateColumn: true,
    },
  ];

  tableData: VoucherOutputDto[] = [];
  rowSelected: any;
  currentUser!: AccountOutputDto | null;

  constructor(
    private _service: ProxiesService,
    private dialog: MatDialog,
    private memberService: MemberService,
    private toastr: ToastrService,
    private accountService: AccountService
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((currentUser) => (this.currentUser = currentUser));
  }

  ngOnInit(): void {
    this.loadVouchers();
    this.loadmemberPoints();
  }

  loadVouchers() {
    this._service.getListVoucherByUserId().subscribe((result) => {
      this.tableData = result;
    });
  }

  onRowSelected(selectedRow: any) {
    this.rowSelected = selectedRow;
  }

  openPointTransactionHistoryDialog() {
    const dialogRef = this.dialog.open(MemberPointComponent, {
      width: '800px',
      height: auto,
    });
  }

  openConvertPointsToVoucherDialog() {
    const dialogRef = this.dialog.open(MemberRedeemPointsComponent, {
      width: '80%',
      height: auto,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        this.convertPointToVoucher(result.points);
      }
    });
  }

  convertPointToVoucher(points: any) {
    this.memberService.convertPointToVoucher(points).subscribe((result) => {
      this.loadVouchers();
      this.loadmemberPoints();
      this.toastr.success('Get voucher successfull');
    });
  }

  loadmemberPoints() {
    this.memberService.getMemberById(this.currentUser?.id).subscribe(result => {
      this.memberPoints = result.contributionPoints;
    })
  }
}
