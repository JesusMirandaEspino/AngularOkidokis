import { Injectable, signal } from "@angular/core";
import { User, Task } from "../interfaces";

@Injectable({
  providedIn: "root",
})
export class UseStateService {
  user = signal<User>({
    id: "0",
    email: "",
    username: "",
    roles: ["USER"],
  });


  setUser(newUser: User) {
    this.user.set(newUser);
  }


}
