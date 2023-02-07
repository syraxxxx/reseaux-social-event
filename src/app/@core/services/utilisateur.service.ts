import {Injectable} from '@angular/core';
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
        // 'Content-Type': 'application/form-data'
      })
    };

    const data = `email=${encodeURIComponent('example@email.com')}&nom=${encodeURIComponent('Example')}&prenom=${encodeURIComponent('User')}&mdp=${encodeURIComponent('password')}&tel=${encodeURIComponent('1234567890')}&pays=${encodeURIComponent('Country')}&ville=${encodeURIComponent('City')}&profil_photo=${encodeURIComponent('photo.jpg')}`;

    // console.log(data);
    // console.log('here');
    return await this.http.post<any>(`${this.apiEndPoint}/inscription`,data,httpOptions);
  }
  // create(body: any): Observable<any> {
  //   return this.http.post<any>(`${this.apiEndPoint}/inscription`, body);
  // }

  login(body: any): Observable<any> {
    return this.http.post<any>(`${this.apiEndPoint}/login`, body);
  }

  getListePersonMessages(): Observable<any> {
    return this.http.get<any>(`${this.apiEndPoint}/messages`);
  }
  getMessage(idmessage : any): Observable<any> {
    return this.http.get<any>(`${this.apiEndPoint}/message`);
  }
  sendMessage(body: any): Observable<any> {
    return this.http.post<any>(`${this.apiEndPoint}/envoisMessage`, body);
  }
}
