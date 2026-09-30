export interface task {
  id: string;
  name: string;
  status: string;
}


export interface user {
  id: string;
  name: string;
  email: string;
  password: string;
  username: string;
  roles: string[];
  tasks: task[];
}
