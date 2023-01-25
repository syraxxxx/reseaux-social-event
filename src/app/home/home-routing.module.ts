import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccueilComponent} from './pages/accueil/accueil.component';
import {HomeComponent} from './home.component';
import {ProfileComponent} from "./pages/profile/profile.component";

const routes: Routes = [

  {
    path: '', component: HomeComponent,
    children: [
      {path: '', component: AccueilComponent},
      {path: 'profile', component: ProfileComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
