import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProxiesService } from '../../../shared/service-proxies/proxies.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
    BsDatepickerModule.forRoot(),
  ],
  exports: [
    ToastrModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    NgbPaginationModule,
    ReactiveFormsModule,
    BsDatepickerModule,
  ],
  providers: [ProxiesService],
})
export class SharedModule {}
