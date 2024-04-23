import { Component } from '@angular/core';
import { CertificationOutputDto } from '../../../shared/service-proxies/proxies.service';
import { TableColumn } from '../../_models/tableColumn';
import { AdminService } from '../../_services/admin.service';
import { MovieService } from '../../_services/movie.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

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

  openCreateOrEditDialog(genreId?: any): void {
    // const dialogRef = this.dialog.open(AdminGenresCreateOrEditComponent, {
    //   width: '400px',
    //   height: auto,
    //   data: { genreId },
    // });

    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result === true) {
    //     this.loadGenres();
    //   }
    // });
  }

  loadCertifications() {
    this.movieService.getListCertifications().subscribe((result) => {
      this.tableData = result;
    });
  }
}
