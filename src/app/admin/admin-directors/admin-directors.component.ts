import { Component, OnInit } from '@angular/core';
import { auto } from '@popperjs/core';
import { DeleteDialogComponent } from '../../_forms/delete-dialog/delete-dialog.component';
import { AdminDirectorCreateOrEditComponent } from './admin-director-create-or-edit/admin-director-create-or-edit.component';
import { DirectorInputDto, DirectorOutputDto, ProxiesService } from '../../../shared/service-proxies/proxies.service';
import { TableColumn } from '../../_models/tableColumn';
import { MatDialog } from '@angular/material/dialog';
import { DirectorService } from '../../_services/director.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-directors',
  templateUrl: './admin-directors.component.html',
  styleUrl: './admin-directors.component.css'
})
export class AdminDirectorsComponent implements OnInit{
  tableColumns: TableColumn[] = [
    { displayedColumn: 'id', header: 'ID' },
    { displayedColumn: 'name', header: 'Name' },
    { displayedColumn: 'directorImage', header: 'Image', imageColumn: true },
    // { displayedColumn: 'description', header: 'Description' },
    { displayedColumn: 'dateOfBirth', header: 'Date Of Birth', dateColumn: true },
  ];

  tableData: DirectorOutputDto[] = [];
  rowSelected: any;

  constructor(
    private directorService: DirectorService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private _service: ProxiesService
  ) {}

  ngOnInit(): void {
    this.loadDirectors();
  }

  loadDirectors() {
    this._service.getListDirectors().subscribe((result) => {
      this.tableData = result;
    })
  }

  createOrEditDirector(directorData: DirectorInputDto, directorId?: number, file?: File) {
    this.directorService.createOrEditDirector(directorData, directorId).subscribe((result) => {
      if(file != null && result != null) {
        this.directorService.changeDirectorImage(file, result).subscribe(() => {
          this.loadDirectors();
        })
      }
      const message = (directorId != null) ? 'Edit' : 'Create';
      this.toastr.success(`${message} director successful`);
      this.loadDirectors();
    })
  }

  deleteDirector(actorId: number) {
    this.directorService.deleteDirector(actorId).subscribe(() => {
      this.loadDirectors();
      this.toastr.success("Delete director successful");
    })
  }

  onRowSelected(selectedRow: any) {
    this.rowSelected = selectedRow;
  }

  openCreateOrEditDialog(directorId?: any) {
    const dialogRef = this.dialog.open(AdminDirectorCreateOrEditComponent, {
      width: '800px',
      height: auto,
      data: { directorId: directorId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if(result.file) {
          this.createOrEditDirector(result.directorData, result.directorId, result.file);
        }
        else {
          this.createOrEditDirector(result.directorData, result.directorId);
        }
      }
    });
  }

  openDeleteDialog(directorId: any) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      height: auto,
      data: { directorId: directorId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.deleteDirector(this.rowSelected.id);
      }
    });
  }
}
