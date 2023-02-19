import {Component, OnInit} from '@angular/core';
import {UtilisateurService} from "../../../@core/services/utilisateur.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users: any[] = [];
  page = 1; // page courante
  pageSize = 10; // nombre de données par page
  searchFilter : any;
  constructor(
    private userService: UtilisateurService,
  ) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.userService.getAllUser().subscribe(response => {
      this.users = response.utilisateurs;
    });
  }

  delete() {
  }

  ban() {
  }
}
