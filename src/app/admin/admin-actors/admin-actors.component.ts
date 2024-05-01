import { ActorService } from './../../_services/actor.service';
import { Component, OnInit } from '@angular/core';
import { TableColumn } from '../../_models/tableColumn';
import { ActorInputDto, ActorOutputDto, ProxiesService } from '../../../shared/service-proxies/proxies.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AdminActorCreateOrEditComponent } from './admin-actor-create-or-edit/admin-actor-create-or-edit.component';
import { auto } from '@popperjs/core';
import { DeleteDialogComponent } from '../../_forms/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-admin-actors',
  templateUrl: './admin-actors.component.html',
  styleUrl: './admin-actors.component.css'
})
export class AdminActorsComponent implements OnInit {
  tableColumns: TableColumn[] = [
    { displayedColumn: 'id', header: 'ID' },
    { displayedColumn: 'name', header: 'Name' },
    { displayedColumn: 'actorImage', header: 'Image', imageColumn: true },
    // { displayedColumn: 'description', header: 'Description' },
    { displayedColumn: 'dateOfBirth', header: 'Date Of Birth', dateColumn: true },
  ];

  tableData: ActorOutputDto[] = [];
  rowSelected: any;

  constructor(
    private actorService: ActorService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private _service: ProxiesService
  ) {}

  ngOnInit(): void {
    this.loadActors();
  }

  loadActors() {
    this._service.getListActors().subscribe((result) => {
      this.tableData = result;
    })
  }

  createOrEditActor(actorData: ActorInputDto, actorId?: number, file?: File) {
    this.actorService.createOrEditActor(actorData, actorId).subscribe((result) => {
      if(file != null && result != null) {
        this.actorService.changeActorImage(file, result).subscribe(() => {
          this.loadActors();
        })
      }
      const message = (actorId != null) ? 'Edit' : 'Create';
      this.toastr.success(`${message} actor successful`);
      this.loadActors();
    })
  }

  deleteActor(actorId: number) {
    this.actorService.deleteActor(actorId).subscribe(() => {
      this.loadActors();
      this.toastr.success("Delete actor successful");
    })
  }

  onRowSelected(selectedRow: any) {
    this.rowSelected = selectedRow;
  }

  openCreateOrEditDialog(actorId?: any) {
    const dialogRef = this.dialog.open(AdminActorCreateOrEditComponent, {
      width: '800px',
      height: auto,
      data: { actorId: actorId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if(result.file) {
          this.createOrEditActor(result.actorData, result.actorId, result.file);
        }
        else {
          this.createOrEditActor(result.actorData, result.actorId);
        }
      }
    });
  }

  openDeleteDialog(actorId: any) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      height: auto,
      data: { actorId: actorId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.deleteActor(this.rowSelected.id);
      }
    });
  }
}
