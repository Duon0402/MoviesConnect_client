import { DeleteDialogComponent } from './../../../_forms/delete-dialog/delete-dialog.component';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../../../_services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogComponent } from '../../../_forms/confirm-dialog/confirm-dialog.component';
import { auto } from '@popperjs/core';
import { MovieOutputDto, RatingOutputDto } from '../../../../shared/service-proxies/proxies.service';
import { MovieService } from '../../../_services/movie.service';

@Component({
  selector: 'app-admin-report-handle',
  templateUrl: './admin-report-handle.component.html',
  styleUrl: './admin-report-handle.component.css'
})
export class AdminReportHandleComponent {
  report: any;
  rating!: RatingOutputDto;
  movie!: MovieOutputDto;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AdminReportHandleComponent>,
    private adminService: AdminService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.report = { ...this.data.data };
    this.loadRating(this.report.objectId, this.report.objectId2);
    this.loadMovie(this.report.objectId);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  loadRating(movieId: number, userId: number) {
    this.adminService.loadRating(userId, movieId).subscribe(result => {
      this.rating = result;
    })
  }

  loadMovie(movieId: number){
    this.movieService.getMovie(movieId).subscribe(result => {
      this.movie = result;
    })
  }

  openConfirmDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      height: auto,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (true) {
        this.isViolationRating();
      }
    });
  }

  isViolationRating() {
    const rating = {
      movieId: this.report.objectId,
      userId: this.report.objectId2,
      purpose: 'violation'
    }
    this.dialogRef.close(rating);
  }
}
