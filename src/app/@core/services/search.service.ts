import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiEndPoint = `${environment.BASE}/Search`;

  constructor(private http: HttpClient) {
  }

  search(keyword: any): Observable<any> {
    return this.http.get<any>(`${this.apiEndPoint}?keyword${keyword}`);
  }

}
