import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../security/login/login.service';
import {UtilisateurService} from "../@core/services/utilisateur.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage!: string;

  ngOnInit(): void {
  }

  public form = new FormGroup({
    email: new FormControl('', [Validators.required]),
    mdp: new FormControl('', [Validators.required]),
  })

  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private serviceUser: UtilisateurService
  ) {
  }

  login() {
    // console.log(this.form.value);

    if (this.form.valid) {
      // console.log('click');
      this.serviceUser.login(this.form.value).subscribe({
        next: (res: any) => {
          this.loginService.login(res.token)
        },
        error: (err: any) => {
          this.errorMessage = "Mail ou mot de passe incorrect"
        }
      })
    }
  }
}
