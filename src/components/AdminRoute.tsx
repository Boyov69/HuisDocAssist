
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const AdminRoute = () => {
  const { hasRole } = useAuth();

  // Controleer of gebruiker admin of super-admin rechten heeft
  const isAdmin = hasRole(['admin', 'super-admin']);

  return isAdmin ? <Outlet /> : <Navigate to="/" replace />;
};

export default AdminRoute;
