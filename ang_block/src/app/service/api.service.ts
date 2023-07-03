import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: Http,
    private https:HttpClient,
    private router: Router,
    ) { }
    public loginStatusSubject = new Subject<boolean>();


  public user_register(body: String, url: string) {
    let headers1 = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT" });
    let options = new RequestOptions({ headers: headers1 });
    return this.http.post(url, body, options)
  }

  public get_chain(url: string) {
    let headers1 = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT" });
    let options = new RequestOptions({ headers: headers1 });
    return this.http.post(url, options)
  }



   //generate token
public generateToken(loginData:any){
  // return this.https.post(`http://localhost:8089/sign_in`,loginData);
  return this.https.post(`http://localhost:8089/api/login`,loginData);
}
///Login user : set token in localStorage
public loginUser(token:any){
localStorage.setItem('token',token);
return true;
}
///get token
public getToken(){
  return localStorage.getItem('token');
}

///Current user : which is login
public getCurrentUser( email:any) {
let token = localStorage.getItem('token');
let headers1 = new Headers({ 'Authorization' : 'Bearer '+ token, 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT" });
return this.https.post(`http://localhost:8089/api/current_user/`+ email, {headers: headers1});
// return this.https.post(`http://localhost:8089/current-user/`+ email, {headers: headers1});
}
//set userDetails
public setUser(user:any){
localStorage.setItem('user',JSON.stringify(user));
}
//getuser
public getUser(){
let userStr = localStorage.getItem('user');
if(userStr!=null){
  // console.log(userStr)
  return JSON.parse(userStr);
}else{
  this.logout();
  return null;
}
}
///islogin :user is loged in or not
public isLoggedIn(){
let tokenStr = localStorage.getItem('token');
if(tokenStr == undefined || tokenStr == ''|| tokenStr==null){
  return false;
}else{
  return true;
}
}
///logout : remove token from local storage
public logout(){
localStorage.removeItem('token');
localStorage.removeItem('user');
return true;
}

reloadCurrentRoute() {
  let currentUrl = this.router.url;
  this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
  });
}
}
