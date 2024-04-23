import { Component, Inject } from '@angular/core';
import { AdminGenresCreateOrEditComponent } from '../../admin-genres/admin-genres-create-or-edit/admin-genres-create-or-edit.component';
import {
  CertificationCreateOrEditDto,
  CertificationOutputDto,
  ProxiesService,
} from '../../../../shared/service-proxies/proxies.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-certifications-create-or-edit',
  templateUrl: './admin-certifications-create-or-edit.component.html',
  styleUrl: './admin-certifications-create-or-edit.component.css',
})
export class AdminCertificationsCreateOrEditComponent {
  certi!: CertificationOutputDto;
  certiData: CertificationCreateOrEditDto = {
    name: '',
    description: '',
    minimumAge: 0,
  };

  constructor(
    private _service: ProxiesService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AdminCertificationsCreateOrEditComponent>
  ) {}

  ngOnInit(): void {
    if (this.data.certiId != null) {
      this.loadCerti(this.data.certiId);
    }
  }

  loadCerti(certiId: number) {
    this._service.getCertificationById(certiId).subscribe((result) => {
      this.certi = result;
      this.certiData = {
        name: this.certi.name,
        description: this.certi.description,
        minimumAge: this.certi.minimumAge,
      };
    });
  }

  save() {
    const dataResult = {
      certiData: this.certiData,
      certiId: this.data.certiId | 0,
    };
    this.dialogRef.close(dataResult);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
