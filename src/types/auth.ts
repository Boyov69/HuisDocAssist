
// Define user roles
export type UserRole = 'huisarts' | 'assistent' | 'admin' | 'super-admin';

// Define user type
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  practice?: string;
}

// Auth service types
export interface AuthServiceProps {
  loginWithGoogle: () => Promise<User>;
  loginWithEmail: (email: string, password: string) => Promise<User>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<User>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  hasRole: (roles: UserRole[]) => boolean;
}
