import { AccountService } from './../../_services/account.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AccountOutputDto,
  MemberDto,
  MemberUpdateDto,
} from '../../../shared/service-proxies/proxies.service';
import { MemberService } from '../../_services/member.service';
import { finalize, take } from 'rxjs';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { ToastrService } from 'ngx-toastr';

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
  isDateOfBirthChanged: boolean = false;
  selectedFile!: File | null;

  constructor(
    private accountService: AccountService,
    private memberService: MemberService,
    private toastr: ToastrService
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
        this.editData = {
          fullName: this.member.fullName,
          gender: this.member.gender,
          dateOfBirth: this.member.dateOfBirth,
        };
      });
  }

  updateMember() {
    if (this.selectedFile) {
      this.memberService.changeAvatar(this.selectedFile);
    }
    this.memberService
      .updateMember(this.editData)
      .pipe(
        finalize(() => {
          this.toastr.success('Edit profile successful!');
        })
      )
      .subscribe(() => {
        this.loadMember();
      });
  }

  selectTab(tabId: number) {
    this.memberTabs.tabs[tabId].active = true;
  }

  onTabActivated(data: TabDirective) {
    this.activeTab = data;
  }

  changeSettingAccount() {
    this.accountService.changeSettingAccount().subscribe(() => {
      this.loadMember();
      this.toastr.success('Change setting succesfull');
    });
  }

  onDateOfBirthChange() {
    this.isDateOfBirthChanged = true;
  }

  onFileSelected(file: File) {
    this.selectedFile = file;
  }
}
