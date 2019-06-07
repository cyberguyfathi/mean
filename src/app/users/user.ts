export interface User {
  createdAt?: string;
  email: string;
  fullname: string;
  roles: string[];
  _id?: string;
  password?: string;
  repeatPassword?: string;
}
