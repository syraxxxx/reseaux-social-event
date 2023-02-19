import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginService } from './security/login/login.service';
import { LogoutService } from './security/logout/logout.service';
import {InscriptionComponent} from "./inscription/inscription.component";

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [LogoutService]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LogoutService]
  },
  {
    path: 'signIn',
    component: InscriptionComponent,
    canActivate: [LogoutService]
  },
  {
    path: 'home',
    loadChildren: async () => (await import('./home/home.module')).HomeModule,
    canActivate: [LoginService],
  },
  {
    path: 'admin',
    loadChildren: async () => (await import('./admin/admin.module')).AdminModule,
    canActivate: [LoginService],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
