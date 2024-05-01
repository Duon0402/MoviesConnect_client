import { Component } from '@angular/core';
import { TableColumn } from '../../_models/tableColumn';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '../../_services/admin.service';
import { auto } from '@popperjs/core';
import { ReportDto, ReportUpdateDto } from '../../../shared/service-proxies/proxies.service';
import { AdminReportDetailComponent } from './admin-report-detail/admin-report-detail.component';
import { AdminMoviesCreateOrEditComponent } from '../admin-movies/admin-movies-create-or-edit/admin-movies-create-or-edit.component';
import { AdminReportHandleComponent } from './admin-report-handle/admin-report-handle.component';

@Component({
  selector: 'app-admin-reports',
  templateUrl: './admin-reports.component.html',
  styleUrl: './admin-reports.component.css',
})
export class AdminReportsComponent {
  tableColumns: TableColumn[] = [
    { displayedColumn: 'id', header: 'ID' },
    { displayedColumn: 'objectType', header: 'Type' },
    { displayedColumn: 'status', header: 'Status' },
    { displayedColumn: 'reporterId', header: 'Reporter ID' },
    { displayedColumn: 'handlerId', header: 'Handler ID' },
  ];
  tableData: ReportDto[] = [];
  rowSelected: any;

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports() {
    this.adminService.getReports().subscribe((data: any[]) => {
      this.tableData = data;
    });
  }
  onRowSelected(selectedRow: any) {
    this.rowSelected = selectedRow;
  }

  openDetailDialog(): void {
    const dialogRef = this.dialog.open(AdminReportDetailComponent, {
      width: '500px',
      height: auto,
      data: { data: this.rowSelected },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.updateStatusReport(result.id, result.status);
      }
    });
  }
  updateStatusReport(reportId: number, status: string) {
    const reportUpdateDto: ReportUpdateDto = { status: status };
    this.adminService.updateStatusReport(reportId, reportUpdateDto).subscribe(() => {
      this.toastr.success('Update status report successful');
      this.loadReports();
    });
  }

  deleteRating(movieId: number, userId: number) {
    this.adminService.deleteRating(userId, movieId).subscribe(() => {
      this.toastr.success("Delete rating succesful");
    })
  }

  violationRating(movieId: number, userId: number) {
    this.adminService.updateStatusRating(userId, movieId).subscribe(() => {
      this.toastr.success("Mark rating as violation succesful");
    })
  }

  openHandleDialog(): void {
    if(this.rowSelected && this.rowSelected.objectType === 'Rating') {
      const dialogRef = this.dialog.open(AdminReportHandleComponent, {
        width: '500px',
        height: auto,
        data: { data: this.rowSelected },
      });

      dialogRef.afterClosed().subscribe((result: any) => {
        if (result) {
          if (result.purpose == 'violation') {
            this.violationRating(result.movieId, result.userId);
          }
          if(result.purpose == 'delete') {
            this.deleteRating(result.movieId, result.userId);
          }
        }
      });
    }
    if(this.rowSelected && this.rowSelected.objectType === 'Movie') {
      const dialogRef = this.dialog.open(AdminMoviesCreateOrEditComponent, {
        width: '800px',
        height: '100vh',
        data: { movieId: this.rowSelected.objectId},
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          console.log(result);
          if(result.fileBanner) {
            this.createOrEditMovie(result.movieData, result.movieId, result.fileBanner);
          }
          else {
            this.createOrEditMovie(result.movieData, result.movieId);
          }
        }
      });
    }
  }
    // create or edit movie
    createOrEditMovie(movieData: any, movieId?: number, fileBanner?: any) {
      this.adminService.createOrEditMovie(movieData, movieId).subscribe(() => {
        if (fileBanner != null) {
          this.adminService.changeBanner(fileBanner, movieId).subscribe(() => {
          });
        }
        const message = movieId ? 'Edit' : 'Create';
        this.toastr.success(`${message} movie successful`);
      });
    }
}
