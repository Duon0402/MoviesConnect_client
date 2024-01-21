import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProxiesService } from '../../../shared/service-proxies/proxies.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinner, NgxSpinnerModule } from 'ngx-spinner';
import { NgbPagination, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
    NgxSpinnerModule.forRoot({
      type: 'ball-scale-multiple'
    })
  ],
  exports: [ToastrModule, BrowserAnimationsModule, NgxSpinnerModule, NgbPaginationModule],
  providers: [ProxiesService],
})
export class SharedModule {}
