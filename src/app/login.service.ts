import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public urlEndpoint = 'http://localhost:4000';
  constructor(private http: HttpClient, private router: Router) { }

  onUserRegister(info){
  return this.http.post<{message: string}>(`${this.urlEndpoint}/api/user/signUp`,info);
  }

  onLogin(info) {
    return this.http.post<{message: string}>(`${this.urlEndpoint}/api/user/login`,info);
  }
}
