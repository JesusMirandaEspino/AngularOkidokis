import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { LoginForm } from "../interfaces";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  private apiUrl = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  // Método para login
  login(loginparams: LoginForm): Observable<any> {
    return this.http.post(`${this.apiUrl}/login/in`, loginparams,  { withCredentials: true });
  }


}
