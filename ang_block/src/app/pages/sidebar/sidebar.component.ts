import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(private uploadService:ApiService,private router: Router,) { }

  public logout() {
    this.uploadService.logout();
    this.router.navigate(['/login']);
    // window.location.reload();
    
    // this.login.loginStatusSubject.next(false);
  }
}
