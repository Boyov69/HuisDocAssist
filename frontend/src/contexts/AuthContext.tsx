
import { AuthProvider, useAuth } from '@/hooks/useAuthContext';
import { User, UserRole } from '@/types/auth';

// Re-export the hook and provider
export { AuthProvider, useAuth };

// Re-export types
export type { User, UserRole };
