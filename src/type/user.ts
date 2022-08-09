import { AxiosError } from 'axios';

export interface User {
  id: string;
  image: string;
  email: string;
  birthDate: string;
  phone: string;
  firstName: string;
  lastName: string;
}

export type UsersListContextType = {
  usersList: User[];
  setUsersList: (users: User[]) => void;
  isLoading: boolean;
  addUser: (user: User) => void;
  updateUser: (user: User) => void;
  deleteUser: (id: string) => void;
  setIsLoading: (b: boolean) => void;
  fnHandleError: (res: AxiosError) => void;
};