import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Task } from "../interfaces";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  private apiUrl = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  getTasks(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/tasks/all/${id}`,  { withCredentials: true }  );
  }

  saveTask(taskparams: Task): Observable<any> {
    return this.http.post(`${this.apiUrl}/tasks/create`, taskparams, { withCredentials: true }   );
  }
}
