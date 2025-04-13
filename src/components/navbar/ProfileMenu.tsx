
import React from "react";
import { LogOut, Settings, User, Shield, ServerCog } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

const ProfileMenu = () => {
  const { user, logout, hasRole } = useAuth();

  if (!user) return null;

  // Bereken initialen voor avatar fallback
  const getInitials = (name: string) => {
    if (!name) return "?";
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <span className="hidden sm:inline font-medium">{user.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 animate-fade-in">
        <div className="flex items-center justify-start gap-2 p-2 mb-1">
          <div className="flex flex-col space-y-0.5">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
            <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          <span>Mijn profiel</span>
        </DropdownMenuItem>
        
        <Link to="/instellingen">
          <DropdownMenuItem className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Instellingen</span>
          </DropdownMenuItem>
        </Link>
        
        {hasRole(['admin', 'super-admin']) && (
          <Link to="/admin">
            <DropdownMenuItem className="cursor-pointer">
              <Shield className="mr-2 h-4 w-4" />
              <span>Admin Dashboard</span>
            </DropdownMenuItem>
          </Link>
        )}
        
        {hasRole(['super-admin']) && (
          <Link to="/super-admin">
            <DropdownMenuItem className="cursor-pointer">
              <ServerCog className="mr-2 h-4 w-4" />
              <span>Super Admin Dashboard</span>
            </DropdownMenuItem>
          </Link>
        )}
        
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Uitloggen</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu;
