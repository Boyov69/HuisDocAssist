
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const DesktopNav = () => {
  const location = useLocation();
  const { hasRole } = useAuth();

  // Determine if link is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="hidden md:flex md:items-center md:space-x-6">
      {[
        { path: "/", label: "Dashboard" },
        { path: "/afspraken", label: "Afspraken" },
        { path: "/telefoon", label: "Telefoon" },
        { path: "/patienten", label: "Patiënten" },
        { path: "/triage", label: "Triage" },
        ...(hasRole(['admin', 'super-admin']) 
          ? [
              { path: "/instellingen", label: "Instellingen" },
              { path: "/admin", label: "Admin" }
            ] 
          : []
        ),
        ...(hasRole(['super-admin']) 
          ? [{ path: "/super-admin", label: "Super Admin" }] 
          : []
        )
      ].map(({ path, label }) => (
        <div key={path} className="relative">
          <Link
            to={path}
            className={cn(
              "transition-colors duration-200 hover:text-medical",
              isActive(path) ? "text-medical font-medium" : "text-foreground"
            )}
          >
            {label}
          </Link>
          {isActive(path) && (
            <motion.div 
              className="absolute bottom-[-8px] left-0 w-full h-0.5 bg-medical rounded-full"
              layoutId="navigation-underline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default DesktopNav;
