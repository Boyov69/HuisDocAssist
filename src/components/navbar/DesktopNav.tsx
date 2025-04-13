
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

const DesktopNav = () => {
  const location = useLocation();
  const { hasRole } = useAuth();

  // Controleer of link actief is
  const isActive = (path: string) => {
    return location.pathname === path
      ? "text-medical font-medium"
      : "text-foreground hover:text-medical transition-colors";
  };

  return (
    <div className="hidden md:flex md:items-center md:space-x-6">
      <Link to="/" className={isActive("/")}>
        Dashboard
      </Link>
      <Link to="/afspraken" className={isActive("/afspraken")}>
        Afspraken
      </Link>
      <Link to="/telefoon" className={isActive("/telefoon")}>
        Telefoon
      </Link>
      <Link to="/patienten" className={isActive("/patienten")}>
        Patiënten
      </Link>
      <Link to="/triage" className={isActive("/triage")}>
        Triage
      </Link>
      {hasRole(['admin', 'super-admin']) && (
        <Link to="/instellingen" className={isActive("/instellingen")}>
          Instellingen
        </Link>
      )}
    </div>
  );
};

export default DesktopNav;
