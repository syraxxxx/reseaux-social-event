import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { LoginService } from '../security/login/login.service';

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
    mail: new FormControl('', [Validators.required]),
    mot_de_passe: new FormControl('', [Validators.required]),
  })

  constructor(private http: HttpClient, private loginService: LoginService){}

  public login(){
    if(this.form.valid){
      this.http.post(`${environment.BASE}/personne/login`, this.form.value)
      .subscribe({
        next: (res: any) => this.loginService.login(res.token),
        error: (err: any) => this.errorMessage= err.error.message
      })
    }
  }
}
