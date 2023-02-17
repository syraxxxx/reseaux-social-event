import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  private apiEndPoint = `${environment.BASE}/Type`;

  constructor(private http: HttpClient) {
  }

  create(body: { [key: string]: string | number | boolean }): Observable<any> {
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})};

    const data = Object.entries(body)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
    return this.http.post<any>(`${this.apiEndPoint}/insert`, data, httpOptions);
  }

  delete(id_event: any): Observable<any> {
    return this.http.get<any>(`${this.apiEndPoint}/publication/?publication_id=${id_event}`);
  }
}
