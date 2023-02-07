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

  create(body: { [key: string]: string | number | boolean }): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    const data = Object.entries(body)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');

    return this.http.post<any>(`${this.apiEndPoint}/inscription`, data, httpOptions);
  }

  login(body: { [key: string]: string | number | boolean }): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    const data = Object.entries(body)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');

    return this.http.post<any>(`${this.apiEndPoint}/login`, data, httpOptions);
  }

  // login(body: any): Observable<any> {
  //   return this.http.post<any>(`${this.apiEndPoint}/login`, body);
  // }

  getListePersonMessages(): Observable<any> {
    return this.http.get<any>(`${this.apiEndPoint}/messages`);
  }

  getMessage(idmessage: any): Observable<any> {
    return this.http.get<any>(`${this.apiEndPoint}/message`);
  }

  sendMessage(body: any): Observable<any> {
    return this.http.post<any>(`${this.apiEndPoint}/envoisMessage`, body);
  }
}
