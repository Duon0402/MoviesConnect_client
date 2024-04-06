import { AdminMoviesCreateOrEditComponent } from './admin-movies-create-or-edit/admin-movies-create-or-edit.component';
import { AdminService } from './../../_services/admin.service';
import { Component, OnInit } from '@angular/core';
import { TableColumn } from '../../_models/tableColumn';
import { Movie } from '../../../shared/service-proxies/proxies.service';
import { auto } from '@popperjs/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-movies',
  templateUrl: './admin-movies.component.html',
  styleUrl: './admin-movies.component.css',
})
export class AdminMoviesComponent implements OnInit {
  tableColumns: TableColumn[] = [
    { displayedColumn: 'id', header: 'ID' },
    { displayedColumn: 'title', header: 'Title' },
    { displayedColumn: 'summary', header: 'Summary' },
    { displayedColumn: 'durationMinutes', header: 'Duration Minutes' },
    { displayedColumn: 'releaseDate', dateColumn: true, header: 'Release Date' },
    { displayedColumn: 'status', header: 'Status' },
  ];
  tableData: Movie[] = [];
  rowSelected: any;

  constructor(private adminService: AdminService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies() {
    this.adminService.getMovies().subscribe((data: any[]) => {
      this.tableData = data;
    });
  }

  onRowSelected(selectedRow: any) {
    this.rowSelected = selectedRow;
  }

  openCreateOrEditDialog(): void {
    const dialogRef = this.dialog.open(AdminMoviesCreateOrEditComponent, {
      width: '80%',
      height: auto,
      data: { data: this.rowSelected },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.loadMovies();
      }
    });
  }
}
