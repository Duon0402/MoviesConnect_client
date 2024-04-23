import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../_services/admin.service';
import { MovieService } from '../../_services/movie.service';
import { TableColumn } from '../../_models/tableColumn';
import { GenreOutputDto } from '../../../shared/service-proxies/proxies.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { auto } from '@popperjs/core';
import { AdminGenresCreateOrEditComponent } from './admin-genres-create-or-edit/admin-genres-create-or-edit.component';
import { DeleteDialogComponent } from '../../_forms/delete-dialog/delete-dialog.component';

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
      if (result) {
        this.createOrEditGenre( result.genreData, result.genreId);
      }
    });
  }

  loadGenres() {
    this.movieService.getListGenres().subscribe((result) => {
      this.tableData = result;
    });
  }

  createOrEditGenre(genreData: any, genreId?: number,) {
    this.adminService.createOrEditGenre(genreData, genreId).subscribe(() => {
      const message = genreId ? 'Edit' : 'Create';
      this.toastr.success(`${message} genre successful`);
      this.loadGenres();
    })
  }

  openDeleteDialog(genreId: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      height: auto,
      data: { genreId: genreId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.deleteGenre(this.rowSelected.id);
      }
    });
  }

  deleteGenre(genreId: number) {
    this.adminService.deleteGenre(genreId).subscribe(() => {
      this.toastr.success("Delete successful");
      this.loadGenres();
    })
  }
}
