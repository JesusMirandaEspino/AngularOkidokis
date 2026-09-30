import { Routes } from '@angular/router';
import { Home } from "./pages/home/home";
import { Login } from "./pages/login/login";
import { Create } from "./pages/create/create";
import { User } from "./user/user/user";
import { Task } from "./user/task/task";
import { authGuard } from "./security/auth.guard";

export const routes: Routes = [
  {
    path: "",
    component: Home,
    children: [
      { path: "login", component: Login },
      { path: "create", component: Create },
    ],
  },
  { path: "user", component: User, canActivate: [authGuard], data: { roles: ['ADMIN', 'USER'] } },
  { path: "task", component: Task, canActivate: [authGuard], data: { roles: ['ADMIN', 'USER'] } },
];
