import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from "./admin.component";
import {AccueilComponent} from "../home/pages/accueil/accueil.component";
import {AccueilAdminComponent} from "./pages/accueil-admin/accueil-admin.component";
import {CategorieComponent} from "./pages/categorie/categorie.component";
import {UserComponent} from "./pages/user/user.component";


const routes: Routes = [
  {
    path: '', component: AdminComponent,
    children: [
      {path: '', component: AccueilAdminComponent},
      {path: '', component: AccueilAdminComponent},
      {path: 'categorie', component: CategorieComponent},
      {path: 'users', component: UserComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
