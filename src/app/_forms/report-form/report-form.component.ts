import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReportCreateDto } from '../../../shared/service-proxies/proxies.service';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrl: './report-form.component.css'
})
export class ReportFormComponent implements OnInit {
  report: ReportCreateDto = {
    content: ''
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ReportFormComponent>
  ) {}
  ngOnInit(): void {
    this.report.objectId = this.data.objectId;
    this.report.objectId2 = this.data.objectId2;
    this.report.objectType = this.data.objectType;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  sendReport() {
    this.dialogRef.close(this.report);
  }
}
