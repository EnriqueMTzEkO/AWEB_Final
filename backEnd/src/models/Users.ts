export interface IUsers {
  id: string;
  username: string;
  password: string;
  email: string;
  roles: string[];
  active: boolean;
};

export interface INewUser {
  username: string;
  password: string;
  email: string;
}