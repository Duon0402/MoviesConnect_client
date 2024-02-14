import { Component, OnInit } from '@angular/core';
import {
  AccountOutputDto,
  AvatarDto,
  FileParameter,
  MemberDto, ProxiesService
} from '../../../shared/service-proxies/proxies.service';
import { AccountService } from '../../_services/account.service';
import { take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-member-profile-edit',
  templateUrl: './member-profile-edit.component.html',
  styleUrl: './member-profile-edit.component.css',
})
export class MemberProfileEditComponent implements OnInit {
  currentUser!: AccountOutputDto | null;
  member: MemberDto = {};
  editForm!: NgForm;
  avatar!: AvatarDto;
  image!: FileParameter;

  constructor(
    private _service: ProxiesService,
    private accountService: AccountService,
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
    this._service
      .getUserByUsername(this.currentUser?.username as any)
      .subscribe((member) => {
        this.member = member;
      });
  }

  updateMember() {
    this._service.updateUser(this.member).subscribe(() => {
      this.toastr.success('Profile updated successfully');
    });
  }

  setAvatar() {
    this._service.setAvatar(this.image).subscribe((data) => {
      this.toastr.success("Uploated successfully");
      if (this.currentUser) {
        this.currentUser.avatarUrl = data.url;
        this.accountService.setCurrentUser(this.currentUser);
      }
    })
  }

  deleteAvatar() {
    this._service.deleteAvatar().subscribe(() => {
      this.toastr.success("Deleted successfully")
      this.loadMember();
    })
  }
}
