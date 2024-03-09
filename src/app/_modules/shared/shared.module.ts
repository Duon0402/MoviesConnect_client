import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProxiesService } from '../../../shared/service-proxies/proxies.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxUploaderModule } from 'ngx-uploader';
import { MatDialogModule } from '@angular/material/dialog';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
    BsDatepickerModule.forRoot(),
    NgxUploaderModule,
    CarouselModule.forRoot(),
    TabsModule.forRoot(),
  ],
  exports: [
    ToastrModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    NgbPaginationModule,
    ReactiveFormsModule,
    BsDatepickerModule,
    NgxUploaderModule,
    MatDialogModule,
    CarouselModule,
    TabsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule
  ],
  providers: [ProxiesService],
})
export class SharedModule {}
