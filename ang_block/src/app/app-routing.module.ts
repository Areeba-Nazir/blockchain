import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { TransactionComponent } from './pages/transaction/transaction.component';
import { BuyComponent } from './pages/buy/buy.component';
import { NofoundComponent } from './pages/nofound/nofound.component';
import { AuthGuard } from './service/auth.guard';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home',canActivate: [AuthGuard],  component: HomeComponent },
  { path: 'transaction', canActivate: [AuthGuard], component: TransactionComponent },
  { path: 'buy', canActivate: [AuthGuard], component: BuyComponent },


// canActivate: [AuthGuard],

  { path: '**', pathMatch: 'full', component: NofoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
