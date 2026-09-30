export interface LoginForm {
  email: string;
  password: string;
  username: string;
}



export interface Task {
  id: string;
  name: string;
  status: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  roles: string[];
}


export interface NewUser {
  name: string;
  email: string;
  username: string;
  password: string;
  roles: string[];
}
