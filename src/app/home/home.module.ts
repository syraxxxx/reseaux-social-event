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
import { NewEventComponent } from './pages/event/new-event/new-event.component';
import { DetailsEventComponent } from './pages/event/details-event/details-event.component';
import { DetailMessagesComponent } from './pages/messages/detail-messages/detail-messages.component';


@NgModule({
  declarations: [
    HomeComponent,
    AccueilComponent,
    ProfileComponent,
    MessagesComponent,
    DiscussionComponent,
    SettingsComponent,
    EventComponent,
    NewEventComponent,
    DetailsEventComponent,
    DetailMessagesComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
