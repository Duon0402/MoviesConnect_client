import { Component, OnInit } from '@angular/core';
import {
  AccountOutputDto,
  MemberDto,
  MemberUpdateDto,
  ProxiesService,
} from '../../../shared/service-proxies/proxies.service';
import { AccountService } from '../../_services/account.service';
import { map, take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-member-profile-edit',
  templateUrl: './member-profile-edit.component.html',
  styleUrl: './member-profile-edit.component.css',
})
export class MemberProfileEditComponent implements OnInit {
  currentUser!: AccountOutputDto | null;
  member: MemberDto = {};
  editForm!: NgForm;

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
      .getUserByUsername(this.currentUser?.username)
      .subscribe((member) => {
        this.member = member;
      });
  }

  updateMember() {
    this._service.updateUser(this.member).subscribe(() => {
      this.toastr.success('Profile updated successfully');
    });
  }
}
