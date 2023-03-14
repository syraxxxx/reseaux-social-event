import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private apiEndPoint = `${environment.BASE}/Image`;

  constructor(private http: HttpClient) {
  }

  getPhoto(imageName : string): Observable<any> {
    return this.http.get<any>(`${this.apiEndPoint}/getimage/${imageName}`);
  }

}
