import { Component } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
declare var $: any;


import { Router, RouterModule, Routes } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private _service: ApiService,
    private router: Router
  ) { }
  public user = []
  loginData = {
    email: '',
    password: ''
  }
  username: any;
  public FormSubmission() {
    this.loginData.email = $('#email').val();
    this.loginData.password = $('#password').val();
    // let data2 = JSON.stringify({ email: email, password: password });
    // console.log(data2);
    this._service.generateToken(this.loginData).subscribe(
    (data: any) => {
      console.log("success");
      console.log(data.token);
      //Login//
      this._service.loginUser(data.token);
      // this.login.getCurrentUser(data.token).subscribe(
      this._service.getCurrentUser(this.loginData.email).subscribe(
        (user: any) => {
          this._service.setUser(user);
          console.log(user);
          // this.router.navigate(['dashboard']);
          this.router.navigate(['home']).then(() => {
            this._service.reloadCurrentRoute();
          });
          this._service.loginStatusSubject.next(true);
          this.user = this._service.getUser();
        });
    },
    (error) => {
      console.log("Error!!!");
      console.log(error);
      // this.snack.open("invalid user !! try Again ", '',
      //   {
      //     duration: 3000,
      //   })
    }
    );

  }
}
