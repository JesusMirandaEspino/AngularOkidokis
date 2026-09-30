import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { NewUser } from "../interfaces";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private apiUrl = "http://localhost:3000";
  constructor(private http: HttpClient) {}

  createAccount(data: NewUser): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/create`, data,  { withCredentials: true });
  }
}
