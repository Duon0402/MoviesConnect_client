import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../../../_services/admin.service';

@Component({
  selector: 'app-admin-report-handle',
  templateUrl: './admin-report-handle.component.html',
  styleUrl: './admin-report-handle.component.css'
})
export class AdminReportHandleComponent {
  report: any;
  rating: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AdminReportHandleComponent>,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.report = { ...this.data.data };
    console.log(this.report);
    this.loadRating(this.report.objectId2, this.report.objectId);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  loadRating(movieId: number, userId: number) {
    this.adminService.loadRating(userId, movieId).subscribe(result => {
      this.rating = result;
      console.log(this.rating);
    })
  }
}
