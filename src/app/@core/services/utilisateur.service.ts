import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  private apiEndPoint = `${environment.BASE}/user`;

  constructor(private http: HttpClient) {
  }

  create(body: any): Observable<any> {
    return this.http.post<any>(`${this.apiEndPoint}/inscription`, body);
  }

  login(body: any): Observable<any> {
    return this.http.post<any>(`${this.apiEndPoint}/login`, body);
  }
}
