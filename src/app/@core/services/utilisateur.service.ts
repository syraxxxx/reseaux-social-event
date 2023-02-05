import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  private apiEndPoint = `${environment.BASE}/User`;

  constructor(private http: HttpClient) {
  }

  async create(body: any): Promise<Observable<any>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    
    const data = `email=${encodeURIComponent('example@email.com')}&nom=${encodeURIComponent('Example')}&prenom=${encodeURIComponent('User')}&mdp=${encodeURIComponent('password')}&tel=${encodeURIComponent('1234567890')}&pays=${encodeURIComponent('Country')}&ville=${encodeURIComponent('City')}&profil_photo=${encodeURIComponent('photo.jpg')}`;
    console.log(data);
    return await this.http.post<any>(`${this.apiEndPoint}/inscription`,data,httpOptions);
  }
}
