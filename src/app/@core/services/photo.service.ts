import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private apiEndPoint = `${environment.BASE}/Image/getimage`;

  constructor(private http: HttpClient) {
  }

  getPhoto(user_id: any): Observable<any> {
    return this.http.get<any>(`${this.apiEndPoint}/getAllDiscution?user_id=${user_id}`);
  }

}
