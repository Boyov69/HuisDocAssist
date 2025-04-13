
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { hasRole } = useAuth();
  const location = useLocation();

  // Navigation items
  const navItems = [
    { path: "/", label: "Dashboard" },
    { path: "/afspraken", label: "Afspraken" },
    { path: "/telefoon", label: "Telefoon" },
    { path: "/patienten", label: "Patiënten" },
    { path: "/triage", label: "Triage" },
    ...(hasRole(['admin', 'super-admin']) 
      ? [{ path: "/instellingen", label: "Instellingen" }] 
      : []
    )
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="md:hidden"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div 
            className="px-2 pt-2 pb-3 space-y-1 bg-background/95 backdrop-blur-md border-t border-border"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            transition={{ duration: 0.3 }}
          >
            {navItems.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={cn(
                  "block px-3 py-2 rounded-md transition-all duration-200",
                  isActive(path) 
                    ? "bg-medical/10 text-medical font-medium" 
                    : "hover:bg-muted text-foreground"
                )}
                onClick={onClose}
              >
                <div className="flex items-center">
                  <span>{label}</span>
                  {isActive(path) && (
                    <motion.div 
                      layoutId="mobile-nav-indicator"
                      className="ml-2 h-1.5 w-1.5 rounded-full bg-medical"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </div>
              </Link>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
