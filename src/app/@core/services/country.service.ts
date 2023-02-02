import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private apiEndPoint = `https://restcountries.com/v3.1/`;

  constructor(private http: HttpClient) {
  }

  getCountries(){
    return this.http.get<any>(`${this.apiEndPoint}/name/united`);
  }
}
