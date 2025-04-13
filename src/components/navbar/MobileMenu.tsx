
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { hasRole } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="md:hidden animate-fade-in">
      <div className="px-2 pt-2 pb-3 space-y-1 bg-background/95 backdrop-blur-md border-t border-border">
        <Link
          to="/"
          className="block px-3 py-2 rounded-md hover:bg-muted"
          onClick={onClose}
        >
          Dashboard
        </Link>
        <Link
          to="/afspraken"
          className="block px-3 py-2 rounded-md hover:bg-muted"
          onClick={onClose}
        >
          Afspraken
        </Link>
        <Link
          to="/telefoon"
          className="block px-3 py-2 rounded-md hover:bg-muted"
          onClick={onClose}
        >
          Telefoon
        </Link>
        <Link
          to="/patienten"
          className="block px-3 py-2 rounded-md hover:bg-muted"
          onClick={onClose}
        >
          Patiënten
        </Link>
        <Link
          to="/triage"
          className="block px-3 py-2 rounded-md hover:bg-muted"
          onClick={onClose}
        >
          Triage
        </Link>
        {hasRole(['admin', 'super-admin']) && (
          <Link
            to="/instellingen"
            className="block px-3 py-2 rounded-md hover:bg-muted"
            onClick={onClose}
          >
            Instellingen
          </Link>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
