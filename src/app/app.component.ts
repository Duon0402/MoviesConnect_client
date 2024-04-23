import { Component, OnInit } from '@angular/core';
import { AccountOutputDto } from '../shared/service-proxies/proxies.service';
import { AccountService } from './_services/account.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Movies Connect';
  currentUser!: AccountOutputDto | null;
  isAdminPage: boolean = false;

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((currentUser) => (this.currentUser = currentUser));
    this.setCurrentUser();
  }

  setCurrentUser() {
    const user: AccountOutputDto = JSON.parse(localStorage.getItem('user')!);
    this.accountService.setCurrentUser(user);
  }
}
