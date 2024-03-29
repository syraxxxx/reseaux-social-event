import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccueilComponent} from './pages/accueil/accueil.component';
import {HomeComponent} from './home.component';
import {ProfileComponent} from "./pages/profile/profile.component";
import {MessagesComponent} from "./pages/messages/messages.component";
import {DiscussionComponent} from "./pages/discussion/discussion.component";
import {SettingsComponent} from "./pages/settings/settings.component";
import {NewEventComponent} from "./pages/event/new-event/new-event.component";
import {DetailsEventComponent} from "./pages/event/details-event/details-event.component";
import {ExploreComponent} from "./pages/explore/explore.component";
import {ResultSearchComponent} from "./pages/result-search/result-search.component";
import {PageNotFoundComponent} from "./pages/page-not-found/page-not-found.component";

const routes: Routes = [

  {
    path: '', component: HomeComponent,
    children: [
      {path: '', component: AccueilComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'profile/:user_id', component: ProfileComponent},
      {path: 'discussion', component: DiscussionComponent},
      {path: 'messages', component: MessagesComponent},
      {path: 'new-event', component: NewEventComponent},
      {path: 'event/:publication_id', component: DetailsEventComponent},
      {path: 'settings', component: SettingsComponent},
      {path: 'explore', component: ExploreComponent},
      {path: 'res/:search', component: ResultSearchComponent},
      {path: 'error', component: PageNotFoundComponent},
      {path: '**', component: PageNotFoundComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
