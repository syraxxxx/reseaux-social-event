import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { ProfileComponent } from './pages/profile/profile.component';


@NgModule({
  declarations: [
    HomeComponent,
    AccueilComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
