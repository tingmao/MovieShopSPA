import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MovieListComponent } from './movies/movie-list/movie-list.component';
import { CreateMovieComponent } from './admin/create-movie/create-movie.component';
import { LoginComponent } from './auth/login/login.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { UpdateMovieComponent } from './admin/update-movie/update-movie.component';
import { SignupComponent } from './auth/signup/signup.component';
import { PurchasesComponent } from './account/purchases/purchases.component';
import { MovieDetailComponent } from './movies/movie-detail/movie-detail.component';
import { AuthenticationGuard } from './core/guards/authentication.guard';


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'topmovies',component:MovieListComponent},
  {path:'toprevenue',component:MovieListComponent},
  {path:'genre/:id',component:MovieListComponent},
  {path:'movies/:id',component:MovieDetailComponent},

  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  //only admin can access these two routes with authentication
  {path:'movie/create',component:CreateMovieComponent},
  {path:'movie/update',component:UpdateMovieComponent},

//only authenticated user can access that components 
  {path:'user/:id/purchases',component:PurchasesComponent, canActivate:[AuthenticationGuard]},// can have multiple grauds 
  {path:'user/:id/favorites',component:PurchasesComponent, canActivate:[AuthenticationGuard]},// graud working, not go to the component
  
  {path:'**',component:NotFoundComponent}, 
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
