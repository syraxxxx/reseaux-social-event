import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccueilComponent} from './pages/accueil/accueil.component';
import {HomeComponent} from './home.component';
import {ProfileComponent} from "./pages/profile/profile.component";
import {MessagesComponent} from "./pages/messages/messages.component";
import {DiscussionComponent} from "./pages/discussion/discussion.component";
import {EventComponent} from "./pages/event/event.component";
import {SettingsComponent} from "./pages/settings/settings.component";

const routes: Routes = [

  {
    path: '', component: HomeComponent,
    children: [
      {path: '', component: AccueilComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'discussion', component: DiscussionComponent},
      {path: 'messages', component: MessagesComponent},
      {path: 'new-event', component: EventComponent},
      {path: 'settings', component: SettingsComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}