import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  public user = []

  id = '';
  username = '';
  email = '';
  password = '';
  loading = true;
  isLoggedIn = true;
  constructor(private uploadService:ApiService,private router: Router,) {
    this.isLoggedIn = this.uploadService.isLoggedIn();
    let user_detail = this.uploadService.getUser();
    // alert(user_detail['id'])
    this.username = user_detail['username']
    this.uploadService.loginStatusSubject.asObservable().subscribe((data) => {
      this.isLoggedIn = this.uploadService.isLoggedIn();
      this.user = this.uploadService.getUser();
      this.loading = false;
    });
   }
  
  public logout() {
    this.uploadService.logout();
    this.router.navigate(['']);
    // window.location.reload();
    
    // this.login.loginStatusSubject.next(false);
  }
}
