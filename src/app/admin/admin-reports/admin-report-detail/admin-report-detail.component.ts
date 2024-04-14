import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-report-detail',
  templateUrl: './admin-report-detail.component.html',
  styleUrls: ['./admin-report-detail.component.css']
})
export class AdminReportDetailComponent {
  report: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AdminReportDetailComponent>,
  ) {}

  ngOnInit(): void {
    this.report = { ...this.data.data };
  }

  save() {
    this.dialogRef.close(this.report);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
