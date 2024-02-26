import { LoginComponent } from './accounts/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './movies/movie-list/movie-list.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './accounts/register/register.component';
import { MemberProfileComponent } from './members/member-profile/member-profile.component';
import { MovieDetailComponent } from './movies/movie-detail/movie-detail.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { UploadImageComponent } from './_forms/upload-image/upload-image.component';
import { AuthGuard } from './_guards/auth.guard';
import { MenuComponent } from './menu/menu.component';
import { WatchlistComponent } from './movies/watchlist/watchlist.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'upload',
    component: UploadImageComponent,
  },
  {
    path: 'menu',
    component: MenuComponent,
  },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'movies', component: MovieListComponent },
      { path: 'movies/:id', component: MovieDetailComponent },
      {
        path: 'member',
        children: [
          { path: 'profile', component: MemberProfileComponent },
          {
            path: 'watchlist',
            component: WatchlistComponent,
          },
        ],
      },
    ],
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

  // errors
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
