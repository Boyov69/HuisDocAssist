
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const SuperAdminRoute = () => {
  const { hasRole } = useAuth();

  // Controleer of gebruiker super-admin rechten heeft
  const isSuperAdmin = hasRole(['super-admin']);

  return isSuperAdmin ? <Outlet /> : <Navigate to="/" replace />;
};

export default SuperAdminRoute;
