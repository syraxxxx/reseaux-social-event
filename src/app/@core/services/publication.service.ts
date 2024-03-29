import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  private apiEndPoint = `${environment.BASE}/Post`;

  constructor(private http: HttpClient) {
  }

  // create(body: any): Observable<any> {
  //   return this.http.post<any>(`${this.apiEndPoint}/create`, body);
  // }

  // create(body: { [key: string]: string | number | boolean }): Observable<any> {
  //   const httpOptions = {headers: new HttpHeaders({'Content-Type': 'multipart/form-data'})};
  //
  //   const data = Object.entries(body)
  //     .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
  //     .join('&');
  //   return this.http.post<any>(`${this.apiEndPoint}/create`, data, httpOptions);
  // }
  create(body: { [key: string]: string | number | boolean | File }): Observable<any> {
    const formData = new FormData();
    Object.entries(body).forEach(([key, value]) => {
      if (key == 'couverture_photo') {
        formData.append(key, value as Blob);
      } else {
        formData.append(key, value.toString());
      }
    });
    return this.http.post<any>(`${this.apiEndPoint}/create`, formData);
  }

  getListePublication(): Observable<any> {
    return this.http.get<any>(`${this.apiEndPoint}/liste`);
  }

  getPublication(publication_id: string): Observable<any> {
    return this.http.get<any>(`${this.apiEndPoint}/${publication_id}`);
  }

  getCategories(): Observable<any> {
    return this.http.get<any>(`${this.apiEndPoint}/getAllCategorie`);
  }

  likePublication(body: { [key: string]: string | number | boolean }): Observable<any> {
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})};

    const data = Object.entries(body)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
    return this.http.post<any>(`${this.apiEndPoint}/likes`, data, httpOptions);
  }

  getLikesByPublication(publication_id: string): Observable<any> {
    return this.http.get<any>(`${this.apiEndPoint}/likes/${publication_id}`);
  }

  isLiked(publication_id: string, user_id: string): Observable<any> {
    return this.http.get<any>(`${this.apiEndPoint}/likes/${publication_id}/${user_id}`);
  };

  getPublicationByCategorie(categorie_id: string): Observable<any> {
    return this.http.get<any>(`${this.apiEndPoint}/byCategorie/${categorie_id}`);
  }

  update(body: { [key: string]: string | number | boolean }): Observable<any> {
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})};

    const data = Object.entries(body)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
    return this.http.post<any>(`${this.apiEndPoint}/update`, data, httpOptions);
  }
}
