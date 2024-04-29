import { ActorService } from './../../../_services/actor.service';
import { Component, Inject, OnInit } from '@angular/core';
import { ActorInputDto, ActorOutputDto, ProxiesService } from '../../../../shared/service-proxies/proxies.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-actor-create-or-edit',
  templateUrl: './admin-actor-create-or-edit.component.html',
  styleUrl: './admin-actor-create-or-edit.component.css'
})
export class AdminActorCreateOrEditComponent implements OnInit{
  actorData: ActorInputDto = {};
  actorId?: number;
  actor: ActorOutputDto = {};
  selectedItems!: any;
  selectedFile!: File | null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AdminActorCreateOrEditComponent>,
    private actorService: ActorService,
    private _service: ProxiesService
  ) {}

  ngOnInit(): void {
    if (this.data.actorId != null) {
      this.loadActor(this.data.actorId);
    }
  }

  loadActor(actorId: any) {
    this._service.getActor(actorId).subscribe((result) => {
      this.actor = result;
      this.actorData = {
        name: result.name,
        description: result.description,
        dateOfBirth: result.dateOfBirth
      }
    })
  }

  save() {
    const dataResult = {
      actorData: this.actorData,
      actorId: this.data.actorId,
      file: this.selectedFile
    };
    this.dialogRef.close(dataResult);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onFileSelected(file: File) {
    this.selectedFile = file;
  }
}
