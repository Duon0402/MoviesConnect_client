import { AccountService } from './../../../_services/account.service';
import { AccountOutputDto, RatingOutputDto } from '../../../../shared/service-proxies/proxies.service';
import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs';

@Component({
  selector: 'app-rating-list',
  templateUrl: './rating-list.component.html',
  styleUrl: './rating-list.component.css',
})
export class RatingListComponent implements OnInit {
  @Input() ratings: RatingOutputDto | any;
  currentUser!: AccountOutputDto | null;

  constructor(public accountService: AccountService) {
    this.accountService.currentUser$
    .pipe(take(1))
    .subscribe((currentUser) => (this.currentUser = currentUser));
  }

  ngOnInit(): void {}

  isCurrentUser(username: string): boolean {
    return this.currentUser === username;
  }
}
