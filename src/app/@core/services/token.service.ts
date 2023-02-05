import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

   getUserByToken() {
    const token = localStorage.getItem('token');
    // const base64Url = token?.split('.')[1];
    return JSON.parse(window.atob(token || ''))._doc;
  }
}
