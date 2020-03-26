import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtStorageService {

  constructor() { }
  getToken(): string {
        return localStorage.getItem('token');//get token and store it in localstorage used it int auth service 
      }  
  saveToken(token: string) {
        localStorage.setItem('token', token);
      // story into localstorage (broswer object)
      }  
  destroyToken() {
        localStorage.removeItem('token');
      }
}
