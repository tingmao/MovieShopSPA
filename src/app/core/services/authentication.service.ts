import { Injectable } from '@angular/core';
import { JwtStorageService } from './jwt-storage.service';
import { ApiService } from './api.service';
import { Login } from 'src/app/shared/models/login';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/shared/models/user';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject = new BehaviorSubject<User>({} as User);  //create an instance of BS, hold value of user
  public currentUser = this.currentUserSubject.asObservable(); // currentuser(conponent) can subscribe surrentusersubject(bs)

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  private user: User;
  constructor(private apiService: ApiService, private jwtStorageService: JwtStorageService) { }
  login(userLogin: Login): Observable<boolean> {
    return this.apiService.create('/account/login', userLogin)
      .pipe(map(response => {
        if (response) {
          this.jwtStorageService.saveToken(response.token);
          this.populateUserInfo();
          return true;
        }
        return false;
      }))
  }
  logout() { 
    
    console.log('inside logout Auth');
    //reset everything when logout 
    // Remove JWT from localstorage
    this.jwtStorageService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({} as User);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);

    console.log('After Logout', this.isAuthenticatedSubject.value);
  }
  populateUserInfo() {
    if (this.jwtStorageService.getToken) {
      const token = this.jwtStorageService.getToken();
      const decodedToken = this.decodedToken();
      this.currentUserSubject.next(decodedToken); //push User into subject
      this.isAuthenticatedSubject.next(true);
      // when u refersh ur browser, that means angular will reload everything, so we have to mae sure we check if the token is preset in the AppComponent init method
    }
  }
  private decodedToken(): User {
    const token = this.jwtStorageService.getToken();
    //check token is null 
    if (!token || new JwtHelperService().isTokenExpired(token)) {
      this.logout(); //destory token 
      return null;
    }
    const decodedToken = new JwtHelperService().decodeToken(token);
    this.user = decodedToken; //get decoded infroamtion in payload
    return this.user
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

}
