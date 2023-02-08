import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MessengerService {
  private apiEndPoint = `${environment.BASE}/Messenger`;

  constructor(private http: HttpClient) {
  }

  getListePersonMessages(user_id: any): Observable<any> {
    return this.http.get<any>(`${this.apiEndPoint}/getAllDiscution?user_id=${user_id}`);
  }

  getMessageUser(id_user: any, id_destinataire: any): Observable<any> {
    return this.http.get<any>(`${this.apiEndPoint}/discusbetween/${id_user}/${id_destinataire}`);
  }
}
