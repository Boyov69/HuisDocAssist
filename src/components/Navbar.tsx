
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Sun, Moon, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const location = useLocation();
  const { hasRole } = useAuth();
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Detecteer scroll om zwevend effect toe te passen
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle tussen dark en light mode
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Toggle mobiel menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Controleer of link actief is
  const isActive = (path: string) => {
    return location.pathname === path
      ? "text-medical font-medium"
      : "text-foreground hover:text-medical transition-colors";
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        isScrolled 
          ? "bg-background/90 backdrop-blur-md shadow-md" 
          : "bg-background"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-medical">AI-Frontdesk</span>
              <span className="ml-2 text-sm text-muted-foreground">Huisartsassistent</span>
            </Link>
          </div>

          {/* Desktop menu */}
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

          {/* Right side - theme toggle and mobile menu button */}
          <div className="flex items-center">
            {/* Theme toggle button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="mr-2"
              aria-label={`Schakel naar ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-background/95 backdrop-blur-md border-t border-border">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/afspraken"
              className="block px-3 py-2 rounded-md hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              Afspraken
            </Link>
            <Link
              to="/telefoon"
              className="block px-3 py-2 rounded-md hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              Telefoon
            </Link>
            <Link
              to="/patienten"
              className="block px-3 py-2 rounded-md hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              Patiënten
            </Link>
            <Link
              to="/triage"
              className="block px-3 py-2 rounded-md hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              Triage
            </Link>
            {hasRole(['admin', 'super-admin']) && (
              <Link
                to="/instellingen"
                className="block px-3 py-2 rounded-md hover:bg-muted"
                onClick={() => setMobileMenuOpen(false)}
              >
                Instellingen
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
