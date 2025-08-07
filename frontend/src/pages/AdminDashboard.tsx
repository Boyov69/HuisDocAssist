
import { useState } from "react";
import { Settings, LayoutDashboard, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { AdminUser } from "@/types/admin";
import AdminStatCards from "@/components/admin/AdminStatCards";
import AdminUserManagement from "@/components/admin/AdminUserManagement";
import AdminPracticeSettings from "@/components/admin/AdminPracticeSettings";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("users");
  
  // Voorbeeld gebruikers data
  const [users, setUsers] = useState<AdminUser[]>([
    { id: 1, name: "Dr. Janssen", email: "drjanssen@huisarts.nl", role: "huisarts", status: "Actief", lastLogin: "13 apr 2025", practice: "Huisartsenpraktijk Zorgzaam" },
    { id: 2, name: "Annemarie Smit", email: "asmit@huisarts.nl", role: "assistent", status: "Actief", lastLogin: "12 apr 2025", practice: "Huisartsenpraktijk Zorgzaam" },
    { id: 3, name: "Peter de Vries", email: "pdevries@huisarts.nl", role: "huisarts", status: "Inactief", lastLogin: "2 apr 2025", practice: "Medisch Centrum Noord" },
    { id: 4, name: "Emma Bakker", email: "ebakker@huisarts.nl", role: "assistent", status: "Actief", lastLogin: "11 apr 2025", practice: "Groepspraktijk Gezond Leven" },
  ]);

  const [stats, setStats] = useState({
    alerts: 3,
    tickets: 5
  });

  const handleUserChange = (updatedUsers: AdminUser[]) => {
    setUsers(updatedUsers);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground mb-6">
          Beheer gebruikers en instellingen voor uw praktijk
        </p>
      </div>
      
      <AdminStatCards 
        users={users} 
        alerts={stats.alerts} 
        tickets={stats.tickets} 
      />
      
      <Tabs defaultValue="users" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="mb-4 grid grid-cols-1 md:grid-cols-2">
          <TabsTrigger value="users" className="flex items-center">
            <Users className="h-4 w-4 mr-2" />
            Gebruikers
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center">
            <Settings className="h-4 w-4 mr-2" />
            Praktijkinstellingen
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="users">
          <AdminUserManagement users={users} onUserChange={handleUserChange} />
        </TabsContent>
        
        <TabsContent value="settings">
          <AdminPracticeSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
