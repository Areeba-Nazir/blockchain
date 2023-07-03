import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
declare var $: any;
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent {
  public user = []
  username = '';
  loading = true;
  isLoggedIn = true;
  constructor(
    private _service: ApiService,
    private router: Router
  ) { 
    this.isLoggedIn = this._service.isLoggedIn();
    let user_detail = this._service.getUser();
    // alert(user_detail['id'])
    this.username = user_detail['username']
    this._service.loginStatusSubject.asObservable().subscribe((data) => {
      this.isLoggedIn = this._service.isLoggedIn();
      this.user = this._service.getUser();
      this.loading = false;
    });
    this.getResources();

  }
  balance : any;
  public getResources() {
    this._service.get_chain('http://localhost:8089/api/getBalance/'+this.username).subscribe((data) => {
      // console.log(data);
      let all_records = data.json()
      console.log(all_records)
      this.balance = all_records;
  
      
    });
  }
  public FormSubmission() {
    // let sender = $('#sender').val();
    let recipient = $('#recipient').val();
    let amount = $('#amount').val();
    let data2 = JSON.stringify({  recipient: recipient, amount: amount });
    console.log(data2);
    this._service.user_register(data2, 'http://localhost:8089//api/blockchain/'+this.username).subscribe((data) => {
      // this.status = data.status;
      if (data.status == 400) {
        console.log("Error");
        alert("Error occur on server side please check");
      }
      else {

        let all_records = data.json()
        alert(all_records)
        this.router.navigate(['/home']);
      }
    });
  }
}

