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
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})};

    const data = Object.entries(body)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
    return this.http.post<any>(`${this.apiEndPoint}/login`, data, httpOptions);
  }

  getUserByToken(): Observable<any> {
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})};
    const token = localStorage.getItem('token');
    const data = `token=${encodeURIComponent(token + '')}}`;
    return this.http.post<any>(`${this.apiEndPoint}/token`, data, httpOptions);
  }

  getListePersonMessages(): Observable<any> {
    return this.http.get<any>(`${this.apiEndPoint}/messages`);
  }

  getMessage(idmessage: any): Observable<any> {
    return this.http.get<any>(`${this.apiEndPoint}/message`);
  }

  sendMessage(body: { [key: string]: string | number | boolean }): Observable<any> {
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})};

    const data = Object.entries(body)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
    return this.http.post<any>(`${this.apiEndPoint}/envoisMessage`, data, httpOptions);
  }

  getUserbyId(user_id: any): Observable<any> {
    return this.http.get<any>(`${this.apiEndPoint}/${user_id}`);
  }

  getPublicationByUser(user_id: string): Observable<any> {
    return this.http.get<any>(`${this.apiEndPoint}/publications/${user_id}`);
  }

  getAllUser(): Observable<any> {
    return this.http.get<any>(`${this.apiEndPoint}/liste`);
  }

  changePassword(body: { [key: string]: string | number | boolean }): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    const data = Object.entries(body)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
    return this.http.post<any>(`${this.apiEndPoint}/changepassword`, data, httpOptions);
  }

  updateCouverturePicture(body: { [key: string]: string | number | boolean }): Observable<any> {
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'multipart/form-data'})};
    const formData = new FormData();
    Object.entries(body).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });
    return this.http.post<any>(`${this.apiEndPoint}/updateCouverturePicture`, formData, httpOptions);
  }
  // updateCouverturePicture(body: { [key: string]: string | number | boolean }, file: File): Observable<any> {
  //   const httpOptions = {headers: new HttpHeaders({'Content-Type': 'multipart/form-data'})};
  //   const formData = new FormData();
  //   Object.entries(body).forEach(([key, value]) => {
  //     formData.append(key, value.toString());
  //   });
  //   formData.append('couverture_picture', file, file.name);
  //   return this.http.post<any>(`${this.apiEndPoint}/updateCouverturePicture`, formData, httpOptions);
  // }

  updateProfilPicture(body: { [key: string]: string | number | boolean | File }): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ',
      })
    };
    const formData = new FormData();
    Object.entries(body).forEach(([key, value]) => {
      if(key == 'profil_photo'){
        formData.append(key, value as Blob);
      } else {
        formData.append(key, value.toString());
      }
    });
    console.log(formData);

    return this.http.post<any>(`${this.apiEndPoint}/updateProfilPicture`, formData);
  }
}
