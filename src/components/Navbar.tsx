
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const Navbar = () => {
  const { user, logout, hasRole } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  
  // Luister naar scroll events om de navbar stijl aan te passen
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Functie om initialen te genereren voor avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md" : "bg-white dark:bg-gray-900"
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-medical">
                AI-Frontdesk
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-1">
            <NavLink 
              to="/" 
              end
              className={({ isActive }) => 
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive 
                    ? "bg-medical text-medical-foreground" 
                    : "text-gray-700 dark:text-gray-300 hover:bg-medical-muted hover:text-medical-muted-foreground"
                }`
              }
            >
              Dashboard
            </NavLink>
            
            <NavLink 
              to="/afspraken" 
              className={({ isActive }) => 
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive 
                    ? "bg-medical text-medical-foreground" 
                    : "text-gray-700 dark:text-gray-300 hover:bg-medical-muted hover:text-medical-muted-foreground"
                }`
              }
            >
              Afspraken
            </NavLink>
            
            <NavLink 
              to="/telefoon" 
              className={({ isActive }) => 
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive 
                    ? "bg-medical text-medical-foreground" 
                    : "text-gray-700 dark:text-gray-300 hover:bg-medical-muted hover:text-medical-muted-foreground"
                }`
              }
            >
              Telefoon
            </NavLink>
            
            <NavLink 
              to="/patienten" 
              className={({ isActive }) => 
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive 
                    ? "bg-medical text-medical-foreground" 
                    : "text-gray-700 dark:text-gray-300 hover:bg-medical-muted hover:text-medical-muted-foreground"
                }`
              }
            >
              Patiënten
            </NavLink>
            
            <NavLink 
              to="/triage" 
              className={({ isActive }) => 
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive 
                    ? "bg-medical text-medical-foreground" 
                    : "text-gray-700 dark:text-gray-300 hover:bg-medical-muted hover:text-medical-muted-foreground"
                }`
              }
            >
              Triage
            </NavLink>
            
            {hasRole(['admin', 'super-admin']) && (
              <NavLink 
                to="/instellingen" 
                className={({ isActive }) => 
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive 
                      ? "bg-medical text-medical-foreground" 
                      : "text-gray-700 dark:text-gray-300 hover:bg-medical-muted hover:text-medical-muted-foreground"
                  }`
                }
              >
                Instellingen
              </NavLink>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-medical text-medical-foreground">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                      {user.practice && (
                        <p className="text-xs leading-none text-muted-foreground mt-1">
                          {user.practice}
                        </p>
                      )}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profiel">Mijn profiel</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>
                    Uitloggen
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild variant="default" className="bg-medical hover:bg-medical-accent text-white">
                <Link to="/login">Inloggen</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
