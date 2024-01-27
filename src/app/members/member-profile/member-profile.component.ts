import { Component, OnInit } from '@angular/core';
import {
  AccountOutputDto,
  MemberDto,
  ProxiesService,
} from '../../../shared/service-proxies/proxies.service';
import { AccountService } from '../../_services/account.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-member-profile',
  templateUrl: './member-profile.component.html',
  styleUrl: './member-profile.component.css',
})
export class MemberProfileComponent implements OnInit {
  member!: MemberDto;
  currentUser!: AccountOutputDto | null;
  constructor(
    private _service: ProxiesService,
    private accountService: AccountService
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((currentUser) => (this.currentUser = currentUser));
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    this._service
      .getUserByUsername(this.currentUser?.username)
      .subscribe((member) => {
        this.member = member;
      });
  }
}
