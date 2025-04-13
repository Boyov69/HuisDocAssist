
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from "sonner";

// Definieer gebruikersrollen
export type UserRole = 'huisarts' | 'assistent' | 'admin' | 'super-admin';

// Definieer gebruikerstype
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  practice?: string;
}

// Definieer AuthContextType
interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginWithGoogle: () => Promise<User>;
  loginWithEmail: (email: string, password: string) => Promise<User>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<User>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  hasRole: (roles: UserRole[]) => boolean;
}

// Maak de context aan
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Context provider
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check voor bestaande sessie bij laden
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Simuleer ophalen gebruiker uit lokale opslag
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Authentication error:', error);
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Mock login met Google
  const loginWithGoogle = async (): Promise<User> => {
    setLoading(true);
    try {
      // Simuleer login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: '1',
        name: 'Dr. Janssen',
        email: 'drjanssen@huisarts.nl',
        role: 'huisarts',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        practice: 'Huisartsenpraktijk Gezond',
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      toast.success('Succesvol ingelogd!');
      return mockUser;
    } catch (error) {
      console.error('Google login error:', error);
      toast.error('Inloggen mislukt');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Mock login met email en wachtwoord
  const loginWithEmail = async (email: string, password: string): Promise<User> => {
    setLoading(true);
    try {
      // Simuleer login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Controleer testgebruikers
      let mockUser: User;
      
      if (email === 'huisarts@test.com' && password === 'password') {
        mockUser = {
          id: '1',
          name: 'Dr. Janssen',
          email: 'huisarts@test.com',
          role: 'huisarts',
          practice: 'Huisartsenpraktijk Gezond',
        };
      } else if (email === 'assistent@test.com' && password === 'password') {
        mockUser = {
          id: '2',
          name: 'Annemarie Smit',
          email: 'assistent@test.com',
          role: 'assistent',
          practice: 'Huisartsenpraktijk Gezond',
        };
      } else if (email === 'admin@test.com' && password === 'password') {
        mockUser = {
          id: '3',
          name: 'Beheerder van Veen',
          email: 'admin@test.com',
          role: 'admin',
          practice: 'Huisartsenpraktijk Gezond',
        };
      } else {
        throw new Error('Ongeldige inloggegevens');
      }
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      toast.success('Succesvol ingelogd!');
      return mockUser;
    } catch (error) {
      console.error('Email login error:', error);
      toast.error('Inloggen mislukt. Controleer uw gegevens.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout functie
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.info('U bent uitgelogd');
  };

  // Register functie
  const register = async (name: string, email: string, password: string): Promise<User> => {
    setLoading(true);
    try {
      // Simuleer registratie
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: Date.now().toString(),
        name,
        email,
        role: 'assistent',
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      toast.success('Registratie succesvol!');
      return mockUser;
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registratie mislukt');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Wachtwoord vergeten functie
  const forgotPassword = async (email: string): Promise<void> => {
    try {
      // Simuleer wachtwoord reset emailproces
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Reset-link verstuurd naar uw email');
    } catch (error) {
      console.error('Forgot password error:', error);
      toast.error('Kon reset-link niet versturen');
      throw error;
    }
  };

  // Wachtwoord resetten functie
  const resetPassword = async (token: string, password: string): Promise<void> => {
    try {
      // Simuleer wachtwoord reset
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Wachtwoord succesvol gewijzigd');
    } catch (error) {
      console.error('Reset password error:', error);
      toast.error('Wachtwoord wijzigen mislukt');
      throw error;
    }
  };

  // Functie om te controleren of gebruiker bepaalde rol heeft
  const hasRole = (roles: UserRole[]): boolean => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  // Context waarde
  const value: AuthContextType = {
    user,
    loading,
    loginWithGoogle,
    loginWithEmail,
    logout,
    register,
    forgotPassword,
    resetPassword,
    hasRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook om de AuthContext te gebruiken
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth moet binnen een AuthProvider gebruikt worden');
  }
  return context;
};
