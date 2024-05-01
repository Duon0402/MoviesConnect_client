import { Component, Inject, OnInit } from '@angular/core';
import { DirectorInputDto, DirectorOutputDto, ProxiesService } from '../../../../shared/service-proxies/proxies.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DirectorService } from '../../../_services/director.service';

@Component({
  selector: 'app-admin-director-create-or-edit',
  templateUrl: './admin-director-create-or-edit.component.html',
  styleUrl: './admin-director-create-or-edit.component.css'
})
export class AdminDirectorCreateOrEditComponent implements OnInit{
  directorData: DirectorInputDto = {};
  directorId?: number;
  director: DirectorOutputDto = {};
  selectedItems!: any;
  selectedFile!: File | null;
  isShow: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AdminDirectorCreateOrEditComponent>,
    private directorService: DirectorService,
    private _service: ProxiesService
  ) {}

  ngOnInit(): void {
    if (this.data.isShow != null ) {
      this.isShow = this.data.isShow
    }
    if (this.data.directorId != null) {
      this.loadDirector(this.data.directorId);
    }
  }

  loadDirector(directorId: any) {
    this._service.getDirector(directorId).subscribe((result) => {
      this.director = result;
      this.directorData = {
        name: result.name,
        description: result.description,
        dateOfBirth: result.dateOfBirth
      }
    })
  }

  save() {
    const dataResult = {
      directorData: this.directorData,
      directorId: this.data.directorId,
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
