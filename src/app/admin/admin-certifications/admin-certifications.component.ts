import { Component } from '@angular/core';
import { CertificationOutputDto } from '../../../shared/service-proxies/proxies.service';
import { TableColumn } from '../../_models/tableColumn';
import { AdminService } from '../../_services/admin.service';
import { MovieService } from '../../_services/movie.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AdminCertificationsCreateOrEditComponent } from './admin-certifications-create-or-edit/admin-certifications-create-or-edit.component';
import { auto } from '@popperjs/core';
import { DeleteDialogComponent } from '../../_forms/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-admin-certifications',
  templateUrl: './admin-certifications.component.html',
  styleUrl: './admin-certifications.component.css'
})
export class AdminCertificationsComponent {
  tableColumns: TableColumn[] = [
    { displayedColumn: 'id', header: 'ID' },
    { displayedColumn: 'name', header: 'Name' },
    { displayedColumn: 'description', header: 'Description' },
    { displayedColumn: 'minimumAge', header: 'Minimum Age' },
  ];
  tableData: CertificationOutputDto[] = [];
  rowSelected: any;

  constructor(
    private adminService: AdminService,
    private movieService: MovieService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadCertifications();
  }

  onRowSelected(selectedRow: any) {
    this.rowSelected = selectedRow;
  }

  openCreateOrEditDialog(certiId?: any): void {
    const dialogRef = this.dialog.open(AdminCertificationsCreateOrEditComponent, {
      width: '400px',
      height: auto,
      data: { certiId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.createOrEditCerti(result.certiId, result.certiData);
      }
    });
  }

  loadCertifications() {
    this.movieService.getListCertifications().subscribe((result) => {
      this.tableData = result;
    });
  }

  createOrEditCerti(certiId: number, certiData: any) {
    this.adminService.createOrEditCerti(certiData, certiId).subscribe(() => {
      const message = certiId ? 'Edit' : 'Create';
      this.toastr.success(`${message} certification successful`);
      this.loadCertifications();
    })
  }

  openDeleteDialog(certiId: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '600px',
      height: auto,
      data: { certiId: certiId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.deleteCerti(this.rowSelected.id);
      }
    });
  }

  deleteCerti(certiId: number) {
    this.adminService.deleteCerti(certiId).subscribe(() => {
      this.toastr.success("Delete certification successfull");
      this.loadCertifications();
    })
  }
}
