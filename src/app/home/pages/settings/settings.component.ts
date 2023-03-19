import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UtilisateurService} from "../../../@core/services/utilisateur.service";
import Swal from "sweetalert2";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  user_connected: any;
  formMail = new FormGroup({
    user_id: new FormControl('', [Validators.required]),
    old_mail: new FormControl('', [Validators.required]),
    new_mail: new FormControl('', [Validators.required]),
  });
  formMdp = new FormGroup({
    id: new FormControl('', [Validators.required]),
    mdp: new FormControl('', [Validators.required]),
    newmdp: new FormControl('', [Validators.required]),
  });
  formDesactivate = new FormGroup({
    user_id: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    mdp: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  constructor(
    private userService: UtilisateurService,
    private spinner: NgxSpinnerService,
  ) {
  }

  ngOnInit(): void {
    this.spinner.show();
    this.getData();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

  getData() {
    this.userService.getUserByToken().subscribe(response => {
      this.user_connected = response.user[0];
    });
  }

  changeMail() {
    console.log('change mail');
  }

  changeMdp() {
    console.log('change mdp');
    this.formMdp.get('id')?.setValue(this.user_connected.id);
    console.log(this.formMdp.value);
    this.userService.changePassword(this.formMdp.value).subscribe({
      next(res: any) {
        console.log(res)
        Swal.fire({
          text: `Votre mot de passe a été modifier avec succès `, icon: 'success',
          showConfirmButton: false,
          timer: 1500
        }).then(r => 'nothing');
      },
      error(err: any) {
        Swal.fire({
          text: `Ce n'est pas votre ancien mot de passe`, icon: 'warning',
          showConfirmButton: false,
          timer: 1500
        }).then(r => 'nothing');
      }
    });
    this.formMdp.reset();
  }


  desactivateAccount() {
    console.log('desactivate account');
  }

}
