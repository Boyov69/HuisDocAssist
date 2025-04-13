
// Define admin user types
export type AdminUserStatus = "Actief" | "Inactief";

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: string;
  status: AdminUserStatus;
  avatar?: string;
  lastLogin?: string;
}
