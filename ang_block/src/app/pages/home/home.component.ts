import { Component } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  data:any;

  recent :any;
  // public user = []
  id = '';
  username = '';
  email = '';
  password = '';
  loading = true;
  isLoggedIn = true;
  constructor(private uploadService: ApiService,){
    this.getResources();



    this.isLoggedIn = this.uploadService.isLoggedIn();
    // this.user = this.uploadService.getUser();

    let user_detail = this.uploadService.getUser();
    // alert(user_detail['id'])
    this.username = user_detail['username'];
    // this.email = this.user[0][2];
    // this.password = this.user[0][3];
 
    // this.uploadService.loginStatusSubject.asObservable().subscribe((data) => {
    //   this.isLoggedIn = this.uploadService.isLoggedIn();
    //   this.user = this.uploadService.getUser();
    //   this.loading = false;
    // });


    this.get_recent_activity()
  }

  public getResources() {
    this.uploadService.get_chain('http://localhost:8089/api/blockchain_data').subscribe((data) => {
      console.log(data);
      let all_records = data.json()
      this.data = []
      for (let i = 0; i < all_records.length; i++) {
        this.data.push({
          number: all_records[i][1],
          hash: all_records[i][2],
          previous:all_records[i][3],
          data1:all_records[i][4],
          nonce:all_records[i][5],
        });
      }
    });
  }



  public get_recent_activity() {
    this.uploadService.get_chain('http://localhost:8089/api/recent_activity').subscribe((data) => {
      console.log(data);
      let all_records = data.json()
      console.log(all_records[0][4])
    this.recent = all_records[0][4] ;
      // this.data = []
      // for (let i = 0; i < all_records.length; i++) {
      //   this.data.push({
      //     // number: all_records[i][0],
      //     // hash: all_records[i][2],
      //     // previous:all_records[i][3],
      //     // data1:all_records[i][4],
      //     // nonce:all_records[i][5],
      //   }
        
      //   );
      // }
    });
  }



}
