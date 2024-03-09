import { AccountService } from './../../_services/account.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AccountOutputDto,
  MemberDto,
  MemberUpdateDto,
} from '../../../shared/service-proxies/proxies.service';
import { MemberService } from '../../_services/member.service';
import { take } from 'rxjs';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.css',
})
export class MemberEditComponent implements OnInit {
  @ViewChild('memberTabs', { static: true }) memberTabs!: TabsetComponent;
  activeTab!: TabDirective;
  member!: MemberDto;
  currentUser!: AccountOutputDto | null;
  editData!: MemberUpdateDto;

  constructor(
    private accountService: AccountService,
    private memberService: MemberService
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((currentUser) => (this.currentUser = currentUser));
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    this.memberService
      .getMemberById(this.currentUser?.id)
      .subscribe((member) => {
        this.member = member;
      });
  }

  // updateMember() {
  //   this.memberService.updateMember(this.editData).subscribe(() => {
  //     this.loadMember();
  //   });
  // }

  selectTab(tabId: number) {
    this.memberTabs.tabs[tabId].active = true;
  }

  onTabActivated(data: TabDirective) {
    this.activeTab = data;
  }
}
