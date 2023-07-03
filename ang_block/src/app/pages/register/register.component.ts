import { Component } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
declare var $: any;


import { Router, RouterModule, Routes } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(
    private _service: ApiService,
    private router: Router
  ) { }
  status : any ;
  public FormSubmission() {
    let name = $('#name').val();
    let email = $('#email').val();
    let password = $('#password').val();
    let data2 = JSON.stringify({ name: name, email: email, password: password });
    console.log(data2);
    this._service.user_register(data2, 'http://localhost:8089/api/register').subscribe((data) => {
      this.status = data.status;
      let all_records = data.json()
      if ( this.status == 201) {
        alert(all_records );
      }
      else {
        alert(all_records);
        this.router.navigate(['/']);
      }
    });
  }
}
