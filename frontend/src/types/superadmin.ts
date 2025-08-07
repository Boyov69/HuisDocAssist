
export interface SuperAdminStats {
  totalPractices: number;
  activePractices: number;
  totalUsers: number;
  activeUsers: number;
  totalStorage: number; // GB
  usedStorage: number; // GB
  serverLoad: number; // %
  incidentCount: number;
}

export interface Practice {
  id: number;
  name: string;
  users: number;
  status: string;
  region: string;
  aiEnabled: boolean;
}

export interface Incident {
  id: number;
  type: string;
  location: string;
  date: string;
  status: string;
  severity: string;
}
