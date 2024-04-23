import { AdminMoviesCreateOrEditComponent } from './admin-movies-create-or-edit/admin-movies-create-or-edit.component';
import { AdminService } from './../../_services/admin.service';
import { Component, OnInit } from '@angular/core';
import { TableColumn } from '../../_models/tableColumn';
import { Movie } from '../../../shared/service-proxies/proxies.service';
import { auto } from '@popperjs/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../_forms/delete-dialog/delete-dialog.component';
import { finalize } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-movies',
  templateUrl: './admin-movies.component.html',
  styleUrl: './admin-movies.component.css',
})
export class AdminMoviesComponent implements OnInit {
  tableColumns: TableColumn[] = [
    { displayedColumn: 'id', header: 'ID' },
    { displayedColumn: 'title', header: 'Title' },
    { displayedColumn: 'durationMinutes', header: 'Duration Minutes' },
    {
      displayedColumn: 'releaseDate',
      dateColumn: true,
      header: 'Release Date',
    },
    { displayedColumn: 'status', header: 'Status' },
  ];
  tableData: Movie[] = [];
  rowSelected: any;

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}

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

  openCreateOrEditDialog(movieId?: any): void {
    const dialogRef = this.dialog.open(AdminMoviesCreateOrEditComponent, {
      width: '800px',
      height: auto,
      data: { movieId: movieId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if(result.fileBanner) {
          this.createOrEditMovie(result.movieData, result.movieId, result.fileBanner);
        }
        else {
          this.createOrEditMovie(result.movieData, result.movieId);
        }
      }
    });
  }

  // create or edit movie
  createOrEditMovie(movieData: any, movieId?: number, fileBanner?: any) {
    this.adminService.createOrEditMovie(movieData, movieId).subscribe(() => {
      if (fileBanner != null) {
        this.adminService.changeBanner(fileBanner, movieId).subscribe(() => {
          this.loadMovies();
        });
      }
      const message = movieId ? 'Edit' : 'Create';
      this.toastr.success(`${message} movie successful`);
      this.loadMovies();
    });
  }

  openDeleteDialog(movieId: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      height: auto,
      data: { movieId: movieId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.deleteMovie(this.rowSelected.id);
      }
    });
  }

  deleteMovie(movieId: any) {
    this.adminService
      .deleteMovie(movieId)
      .subscribe(() => {
        this.loadMovies();
        this.toastr.success('Delete Succesfully');
      });
  }
}
