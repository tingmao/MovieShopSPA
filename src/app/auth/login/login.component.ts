import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { Login } from 'src/app/shared/models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean;
  returnUrl: string;
  user: User;
  userLogin: Login = {
    password: '',
    email: ''};


  constructor(private authService: AuthenticationService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(){
    this.route.queryParams
    .subscribe(params => this.returnUrl = params.returnUrl || '/'); //returnUrl: go back to the component it came from or home page if it's null
  }

  login(){
    // console.log('submit button click');
   // console.log(this.uerLogin);
    
    this.authService.login(this.userLogin) //send userlogin object to authservice login method 
        .subscribe((response) => {
          if (response) {
            // console.log(' this is returnURL: ' + this.returnUrl);
            this.router.navigate([this.returnUrl]);//move from login page to another page
          } else {
            this.invalidLogin = true;
          }
        }, 
          (err: any) => { this.invalidLogin = true, console.log(err); });
  }
}
