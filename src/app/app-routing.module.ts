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

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
      path: '',
      runGuardsAndResolvers: 'always',
      children: [
        {path: 'movies', component: MovieListComponent},
        {path: 'movies/:id', component: MovieDetailComponent, }
      ]
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
    path: 'member',
    children: [
      { path: 'profile', component: MemberProfileComponent },
    ],
  },


  // errors
  {path: 'not-found', component: NotFoundComponent},
  {path: 'server-error', component: ServerErrorComponent},
  {path: '**', component: NotFoundComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
