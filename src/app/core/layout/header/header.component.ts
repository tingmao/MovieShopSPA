import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser: User;//get value from subject and give to component
  isAuthenticated: boolean;
  constructor(public authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.authService.isAuthenticated.subscribe( //get value from isAuthenticated which is boolean
      a => {
      this.isAuthenticated = a
        if (this.isAuthenticated) {
          console.log('ISAuthenticatied in Header', this.isAuthenticated);
          
          this.currentUser = this.authService.getCurrentUser();
        }
      }
    );
  }
  logout() {
    this.authService.logout(); //destory token
    this.router.navigateByUrl('/login'); //redirect login page 
  }

}
