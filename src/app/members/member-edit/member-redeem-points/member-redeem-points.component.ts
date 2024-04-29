import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Voucher } from '../../../../shared/service-proxies/proxies.service';
import { auto } from '@popperjs/core';
import { ConfirmDialogComponent } from '../../../_forms/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-member-redeem-points',
  templateUrl: './member-redeem-points.component.html',
  styleUrl: './member-redeem-points.component.css',
})
export class MemberRedeemPointsComponent {
  vouchers: any[] = [
    { points: 200, value: 1 },
    { points: 400, value: 2 },
    { points: 1000, value: 5 },
  ];

  isSelected: number | null = null;

  constructor(
    public dialogRef: MatDialogRef<MemberRedeemPointsComponent>,
    private dialog: MatDialog
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  onCardClick(index: number) {
    if (this.isSelected === index) {
      this.isSelected = null;
    } else {
      this.isSelected = index;
    }
  }

  change() {
    if (this.isSelected !== null) {
      const selectedVoucher = this.vouchers[this.isSelected];
      this.dialogRef.close(selectedVoucher);
    }
  }

  openConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      height: auto,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.change();
      }
    });
  }
}
