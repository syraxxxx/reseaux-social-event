import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminComponent} from "./admin.component";
import {AdminRoutingModule} from "./admin-routing.module";
import { AccueilAdminComponent } from './pages/accueil-admin/accueil-admin.component';
import {NgxSpinnerModule} from "ngx-spinner";
import { CategorieComponent } from './pages/categorie/categorie.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { UserComponent } from './pages/user/user.component';


@NgModule({
  declarations: [
    AdminComponent,
    AccueilAdminComponent,
    CategorieComponent,
    UserComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule {
}
