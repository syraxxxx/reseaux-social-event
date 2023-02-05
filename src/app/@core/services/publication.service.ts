import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  private apiEndPoint = `${environment.BASE}/Post`;

  constructor(private http: HttpClient) {
  }

  create(body: any): Observable<any> {
    return this.http.post<any>(`${this.apiEndPoint}/create`, body);
  }

  getListePublication(): Observable<any> {
    return this.http.get<any>(`${this.apiEndPoint}/liste`);
  }
}
