import { Role } from '../enums/common.enum';

export interface User {
  name: string;
  email: string;
}

export interface UserAuth {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export interface InputForm {
  name: string;
  type: string;
  label: string;
}

export interface ChatMessage {
  role: Role;
  content: string;
}
