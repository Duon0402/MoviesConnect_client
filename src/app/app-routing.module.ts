import { LoginComponent } from './accounts/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './movies/movie-list/movie-list.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './accounts/register/register.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { DateInputComponent } from './_forms/date-input/date-input.component';
import { UserWatchListComponent } from './users/user-watch-list/user-watch-list.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'list',
    component: MovieListComponent,
  },
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ],
  },
  {
    path: 'user',
    children: [
      { path: 'profile', component: UserProfileComponent },
      { path: 'watch-list', component: UserWatchListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
