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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxSpinnerModule} from "ngx-spinner";
import { ExploreComponent } from './pages/explore/explore.component';
import {Ng2SearchPipeModule} from "ng2-search-filter";


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
    DetailMessagesComponent,
    ExploreComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    FormsModule,
    Ng2SearchPipeModule
  ]
})
export class HomeModule { }
