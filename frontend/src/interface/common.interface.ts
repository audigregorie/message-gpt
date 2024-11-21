import { Role } from '../enums/common.enum';

// User in the system
export interface User {
  name: string;
  email: string;
}

// Authentication context for a user
export interface UserAuth {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Form input element
export interface InputForm {
  name: string;
  type: 'text' | 'password' | 'email' | 'number' | 'checkbox' | 'radio';
  label: string;
}

// Chat message skeleton to and from backend
export interface ChatMessage {
  role: Role;
  content: string;
}
