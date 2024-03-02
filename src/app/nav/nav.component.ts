import { Component, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { MovieService } from '../_services/movie.service';
import { MoviesParams } from '../_models/movieParams';
import { Router } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  @Output() moviesParams: MoviesParams = {
    keyword: '',
  };

  constructor(
    public accountService: AccountService,
    private dialog: MatDialog
  ) {}

  logout() {
    this.accountService.logout();
  }

  openMenuDialog(): void {
    const dialogRef = this.dialog.open(MenuComponent, {
      width: '90%',
      height: '90%',
      panelClass: 'fullscreen-dialog-container'
    });
  }
}
