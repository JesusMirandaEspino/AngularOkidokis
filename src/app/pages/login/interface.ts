export interface LoginForm {
  email: string;
  password: string;
  username: string;
}


export interface User {
  id: string;
  email: string;
  username: string;
  roles: string[];
}
