import {Component, OnInit} from '@angular/core';
import {UtilisateurService} from "../../../@core/services/utilisateur.service";
import {NgxSpinnerService} from "ngx-spinner";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user_connected: any;
  idPerson: any;
  personne_profil: any;

  constructor(
    private userService: UtilisateurService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.spinner.show();
    this.getData();
  }

  getData() {
    this.idPerson = this.route.snapshot.paramMap.get('user_id');
    console.log(this.idPerson);
    if (this.idPerson) {
      // this.userService.getUserbyId(this.idPerson).subscribe(response => {
      //   this.personne_profil = response.user[0];
      // });
      console.log('hello')
    } else {
      this.userService.getUserByToken().subscribe(response => {
        this.personne_profil = response.user[0];
      });
    }

    this.userService.getUserByToken().subscribe(response => {
      this.user_connected = response.user[0];
    });
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }
}
