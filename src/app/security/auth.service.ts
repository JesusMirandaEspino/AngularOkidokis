import { Injectable, signal } from "@angular/core";

@Injectable({ providedIn: "root" })
export class AuthService {

  private loggedIn = signal(false);
  private roles = signal<string[]>([]);

  isLoggedIn(): boolean {
    return this.loggedIn();
  }

  hasRole(requiredRoles: string[]): boolean {
    return requiredRoles.some((role) => this.roles().includes(role));
  }


  login(userRoles: string[]) {
    this.loggedIn.set(true);
    this.roles.set(userRoles);
  }

  logout() {
    this.loggedIn.set(false);
    this.roles.set([]);
  }
}
