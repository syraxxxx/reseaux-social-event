import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  private apiEndPoint = `${environment.BASE}/User`;

  constructor(private http: HttpClient) {
  }

  create(body: any): Observable<any> {
    return this.http.post<any>(`${this.apiEndPoint}/inscription`, body);
  }

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
