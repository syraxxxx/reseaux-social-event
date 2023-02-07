import {Component, OnInit} from '@angular/core';
import {UtilisateurService} from "../../../@core/services/utilisateur.service";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user_connected: any;

  constructor(
    private userService: UtilisateurService,
    private spinner: NgxSpinnerService
  ) {
  }

  ngOnInit(): void {
    this.spinner.show();
    this.getData();
  }

  getData() {
    this.userService.getUserByToken().subscribe(response => {
      this.user_connected = response.user[0];
    });
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }
}
