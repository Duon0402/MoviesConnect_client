import { LoginComponent } from './accounts/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './movies/movie-list/movie-list.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './accounts/register/register.component';
import { MovieDetailComponent } from './movies/movie-detail/movie-detail.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { UploadImageComponent } from './_forms/upload-image/upload-image.component';
import { AuthGuard } from './_guards/auth.guard';
import { MenuComponent } from './menu/menu.component';
import { AdminGuard } from './_guards/admin.guard';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { AdminUserRolesComponent } from './admin/admin-users/admin-user-roles/admin-user-roles.component';
import { MemberDetailResolver } from './_resolvers/member-detailed.resolver';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { WatchlistComponent } from './movies/watchlist/watchlist.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { AdminMoviesComponent } from './admin/admin-movies/admin-movies.component';
import { AdminGenresComponent } from './admin/admin-genres/admin-genres.component';
import { AdminReportsComponent } from './admin/admin-reports/admin-reports.component';
import { AdminCertificationsComponent } from './admin/admin-certifications/admin-certifications.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { MovieRecommendComponent } from './movies/movie-recommend/movie-recommend.component';
import { AdminActorsComponent } from './admin/admin-actors/admin-actors.component';
import { AdminDirectorsComponent } from './admin/admin-directors/admin-directors.component';
import { MemberRedeemPointsComponent } from './members/member-edit/member-redeem-points/member-redeem-points.component';
import { ActorDetailComponent } from './actors/actor-detail/actor-detail.component';
import { DirectorDetailComponent } from './directors/director-detail/director-detail.component';
import { DirectorListComponent } from './directors/director-list/director-list.component';
import { ActorListComponent } from './actors/actor-list/actor-list.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      // members
      {
        path: 'members/:username',
        component: MemberDetailComponent,
        resolve: { member: MemberDetailResolver },
      },
      {
        path: 'member',
        children: [
          { path: 'profile', component: MemberEditComponent },
          { path: 'watchlist', component: WatchlistComponent },
          { path: 'recommend', component: MovieRecommendComponent },
        ],
      },
      {
        path: '',
        component: WatchlistComponent,
      },

      // admin
      {
        path: 'admin',
        canActivate: [AdminGuard],
        component: AdminHomeComponent,
        children: [
          {
            path: 'dashboard',
            component: AdminDashboardComponent,
          },
          {
            path: 'users',
            component: AdminUsersComponent,
          },
          {
            path: 'roles',
            component: AdminUserRolesComponent,
          },
          {
            path: 'movies',
            component: AdminMoviesComponent,
          },
          {
            path: 'genres',
            component: AdminGenresComponent,
          },
          {
            path: 'certifications',
            component: AdminCertificationsComponent,
          },
          {
            path: 'reports',
            component: AdminReportsComponent,
          },
          {
            path: 'actors',
            component: AdminActorsComponent,
          },
          {
            path: 'directors',
            component: AdminDirectorsComponent,
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
      // movies
      { path: 'movies', component: MovieListComponent },
      { path: 'movies/:id', component: MovieDetailComponent },

      // actors
      { path: 'actors', component: ActorListComponent },
      { path: 'actors/:id', component: ActorDetailComponent },

      // directors
      { path: 'directors', component: DirectorListComponent},
      { path: 'directors/:id', component: DirectorDetailComponent}
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
