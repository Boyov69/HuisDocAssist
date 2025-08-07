
import { Users, Shield, Database, AlertTriangle, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminUser } from "@/types/admin";

interface AdminStatCardsProps {
  users: AdminUser[];
  alerts: number;
  tickets: number;
}

const AdminStatCards = ({ users, alerts, tickets }: AdminStatCardsProps) => {
  const activeUsers = users.filter(u => u.status === "Actief").length;
  const huisartsen = users.filter(u => u.role === "huisarts").length;
  const assistenten = users.filter(u => u.role === "assistent").length;
  const activeHuisartsen = users.filter(u => u.role === "huisarts" && u.status === "Actief").length;
  const activeAssistenten = users.filter(u => u.role === "assistent" && u.status === "Actief").length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Totaal gebruikers</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{users.length}</div>
          <p className="text-xs text-muted-foreground">
            {activeUsers} actief
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Huisartsen</CardTitle>
          <Shield className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{huisartsen}</div>
          <p className="text-xs text-muted-foreground">
            {activeHuisartsen} actief
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Assistenten</CardTitle>
          <Database className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{assistenten}</div>
          <p className="text-xs text-muted-foreground">
            {activeAssistenten} actief
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Waarschuwingen</CardTitle>
          <AlertTriangle className="h-4 w-4 text-amber-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{alerts}</div>
          <p className="text-xs text-muted-foreground">
            Laatste 7 dagen
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Ondersteuningstickets</CardTitle>
          <Mail className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{tickets}</div>
          <p className="text-xs text-muted-foreground">
            2 onbeantwoord
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminStatCards;
