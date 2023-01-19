import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public form = new FormGroup({
    mail: new FormControl('', [Validators.required]),
    mot_de_passe: new FormControl('', [Validators.required]),
  })

  constructor(private http: HttpClient){}

  public login(){
    if(this.form.valid){
      this.http.post(`${environment.BASE}/personne/login`, this.form.value)
      .subscribe({
        next: (res: any) => alert(res.token),
        error: (e: any) => alert(e.message)
      })
    }
  }
}
