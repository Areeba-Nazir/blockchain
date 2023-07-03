import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HomeComponent } from './pages/home/home.component';
import { TransactionComponent } from './pages/transaction/transaction.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { BuyComponent } from './pages/buy/buy.component';
import { NofoundComponent } from './pages/nofound/nofound.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    TransactionComponent,
    SidebarComponent,
    NavbarComponent,
    BuyComponent,
    NofoundComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    FormsModule,ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
