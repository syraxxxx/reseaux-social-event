import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from "./admin.component";
import {AccueilComponent} from "../home/pages/accueil/accueil.component";
import {AccueilAdminComponent} from "./pages/accueil-admin/accueil-admin.component";


const routes: Routes = [
  {
    path: '', component: AdminComponent,
    children: [
      {path: '', component: AccueilAdminComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
