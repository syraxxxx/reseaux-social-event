import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminComponent} from "./admin.component";
import {AdminRoutingModule} from "./admin-routing.module";
import { AccueilAdminComponent } from './pages/accueil-admin/accueil-admin.component';
import {NgxSpinnerModule} from "ngx-spinner";


@NgModule({
  declarations: [
    AdminComponent,
    AccueilAdminComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgxSpinnerModule
  ]
})
export class AdminModule {
}
