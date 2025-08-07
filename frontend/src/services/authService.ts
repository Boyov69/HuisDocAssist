
import { User, UserRole } from "@/types/auth";
import { toast } from "sonner";

// Mock authentication service
export const createAuthService = (
  setUser: (user: User | null) => void,
  setLoading: (loading: boolean) => void,
  user: User | null
) => {
  // Mock login with Google
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

  // Mock login with email and password
  const loginWithEmail = async (email: string, password: string): Promise<User> => {
    setLoading(true);
    try {
      // Simulate login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check test users
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
      } else if (email === 'superadmin@test.com' && password === 'password') {
        mockUser = {
          id: '4',
          name: 'Super Beheerder',
          email: 'superadmin@test.com',
          role: 'super-admin',
          practice: 'Systeembeheer',
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

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.info('U bent uitgelogd');
  };

  // Register function
  const register = async (name: string, email: string, password: string): Promise<User> => {
    setLoading(true);
    try {
      // Simulate registration
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

  // Forgot password function
  const forgotPassword = async (email: string): Promise<void> => {
    try {
      // Simulate password reset email process
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Reset-link verstuurd naar uw email');
    } catch (error) {
      console.error('Forgot password error:', error);
      toast.error('Kon reset-link niet versturen');
      throw error;
    }
  };

  // Reset password function
  const resetPassword = async (token: string, password: string): Promise<void> => {
    try {
      // Simulate password reset
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Wachtwoord succesvol gewijzigd');
    } catch (error) {
      console.error('Reset password error:', error);
      toast.error('Wachtwoord wijzigen mislukt');
      throw error;
    }
  };

  // Function to check if user has specific role
  const hasRole = (roles: UserRole[]): boolean => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  return {
    loginWithGoogle,
    loginWithEmail,
    logout,
    register,
    forgotPassword,
    resetPassword,
    hasRole,
  };
};
