import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { DiscussionComponent } from './pages/discussion/discussion.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { EventComponent } from './pages/event/event.component';


@NgModule({
  declarations: [
    HomeComponent,
    AccueilComponent,
    ProfileComponent,
    MessagesComponent,
    DiscussionComponent,
    SettingsComponent,
    EventComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
