import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../_services/admin.service';
import { MovieService } from '../../_services/movie.service';
import { TableColumn } from '../../_models/tableColumn';
import { GenreOutputDto } from '../../../shared/service-proxies/proxies.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { auto } from '@popperjs/core';
import { AdminGenresCreateOrEditComponent } from './admin-genres-create-or-edit/admin-genres-create-or-edit.component';

@Component({
  selector: 'app-admin-genres',
  templateUrl: './admin-genres.component.html',
  styleUrl: './admin-genres.component.css',
})
export class AdminGenresComponent implements OnInit {
  tableColumns: TableColumn[] = [
    { displayedColumn: 'id', header: 'ID' },
    { displayedColumn: 'name', header: 'Name' },
  ];
  tableData: GenreOutputDto[] = [];
  rowSelected: any;

  constructor(
    private adminService: AdminService,
    private movieService: MovieService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadGenres();
  }

  onRowSelected(selectedRow: any) {
    this.rowSelected = selectedRow;
  }

  openCreateOrEditDialog(genreId?: any): void {
    const dialogRef = this.dialog.open(AdminGenresCreateOrEditComponent, {
      width: '400px',
      height: auto,
      data: { genreId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.loadGenres();
      }
    });
  }

  loadGenres() {
    this.movieService.getListGenres().subscribe((result) => {
      this.tableData = result;
    });
  }
}
