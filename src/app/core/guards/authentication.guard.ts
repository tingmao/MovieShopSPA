import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService,//tell user login or not 
    private router: Router
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      
    console.log('Inside the Authentication Guard');
    return this.IsUserAuthentication(state);
  }
  
  private IsUserAuthentication(state?: RouterStateSnapshot) // call this method, check the logic if user is login or not 
  {
    //call authentication service 
    return this.authenticationService.isAuthenticated.pipe(map(e => {
      if (e) {
        console.log('inside e true');
        console.log(e);
        return true;
      } else {
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        console.log('inside e false');
        console.log(e);
        return false;
      }
    }), catchError((err) => {
      this.router.navigate(['/login']);
      return of(false);
    }));
  }
}
