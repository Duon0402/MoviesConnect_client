import { Component } from '@angular/core';
import { TableColumn } from '../../_models/tableColumn';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '../../_services/admin.service';
import { auto } from '@popperjs/core';
import { ReportDto, ReportUpdateDto } from '../../../shared/service-proxies/proxies.service';
import { AdminReportDetailComponent } from './admin-report-detail/admin-report-detail.component';

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
}
