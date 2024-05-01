import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ReportCreateDto } from './../../../../shared/service-proxies/proxies.service';
import { MemberService } from './../../../_services/member.service';
import { AccountService } from './../../../_services/account.service';
import {
  AccountOutputDto,
  RatingOutputDto,
} from '../../../../shared/service-proxies/proxies.service';
import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { auto } from '@popperjs/core';
import { ReportFormComponent } from '../../../_forms/report-form/report-form.component';

@Component({
  selector: 'app-rating-list',
  templateUrl: './rating-list.component.html',
  styleUrl: './rating-list.component.css',
})
export class RatingListComponent implements OnInit {
  @Input() ratings: RatingOutputDto | any;
  @Input() movieId: any;
  currentUser!: AccountOutputDto | null;
  reportData!: ReportCreateDto;

  constructor(
    public accountService: AccountService,
    private memberService: MemberService,
    private toastr: ToastrService,
    private dialog: MatDialog,
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((currentUser) => (this.currentUser = currentUser));
  }

  ngOnInit(): void {}

  isCurrentUser(username: string): boolean {
    return this.currentUser === username;
  }

  createReportRating(data: any) {
    this.memberService.createReport(data).subscribe(() => {
      this.toastr.success('Send report successful');
    });
  }

  openReportFormRating(userRatingId: any): void {
    const dialogRef = this.dialog.open(ReportFormComponent, {
      width: '800px',
      height: 'auto',
      data: { objectId: this.movieId, objectId2: userRatingId, objectType: "Rating" },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.createReportRating(result);
      }
    });
  }
}
