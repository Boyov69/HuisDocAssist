
import { useState } from "react";
import { BarChart4, Building, AlertTriangle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SuperAdminStatCards from "@/components/admin/SuperAdminStatCards";
import SuperAdminPracticeManagement from "@/components/admin/SuperAdminPracticeManagement";
import SuperAdminIncidentManagement from "@/components/admin/SuperAdminIncidentManagement";
import SuperAdminSystemStatus from "@/components/admin/SuperAdminSystemStatus";
import { Practice, Incident, SuperAdminStats } from "@/types/superadmin";

const SuperAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Mock data
  const [stats, setStats] = useState<SuperAdminStats>({
    totalPractices: 8,
    activePractices: 7,
    totalUsers: 78,
    activeUsers: 65,
    totalStorage: 128, // GB
    usedStorage: 67, // GB
    serverLoad: 42, // %
    incidentCount: 3
  });

  const [practices, setPractices] = useState<Practice[]>([
    { id: 1, name: "Huisartsenpraktijk Zorgzaam", users: 12, status: "Actief", region: "Amsterdam", aiEnabled: true },
    { id: 2, name: "Medisch Centrum Noord", users: 15, status: "Actief", region: "Rotterdam", aiEnabled: true },
    { id: 3, name: "Huisartsen Groepspraktijk Zuid", users: 18, status: "Actief", region: "Utrecht", aiEnabled: true },
    { id: 4, name: "Gezondheidscentrum Oost", users: 9, status: "Actief", region: "Den Haag", aiEnabled: false },
    { id: 5, name: "Praktijk Dr. Jansen & Partners", users: 5, status: "Actief", region: "Eindhoven", aiEnabled: true },
    { id: 6, name: "Gezondheidscentrum De Linden", users: 11, status: "Actief", region: "Groningen", aiEnabled: true },
    { id: 7, name: "Huisartsenpraktijk Vitaal", users: 8, status: "Actief", region: "Maastricht", aiEnabled: false },
    { id: 8, name: "Medisch Centrum De Vaart", users: 0, status: "Inactief", region: "Arnhem", aiEnabled: false },
  ]);

  const [incidents, setIncidents] = useState<Incident[]>([
    { id: 1, type: "Server overbelasting", location: "Server cluster B", date: "13 apr 2025", status: "Opgelost", severity: "Hoog" },
    { id: 2, type: "Beveiligingsschending", location: "Praktijk ID 3", date: "12 apr 2025", status: "In behandeling", severity: "Kritiek" },
    { id: 3, type: "Database error", location: "Primaire database", date: "10 apr 2025", status: "In behandeling", severity: "Medium" },
  ]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2">Super Admin Dashboard</h1>
        <p className="text-muted-foreground mb-6">
          Beheer alle praktijken, gebruikers en systeeminstellingen
        </p>
      </div>

      <SuperAdminStatCards stats={stats} />

      <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="mb-4 grid grid-cols-1 md:grid-cols-3">
          <TabsTrigger value="overview" className="flex items-center">
            <BarChart4 className="h-4 w-4 mr-2" />
            Overzicht
          </TabsTrigger>
          <TabsTrigger value="practices" className="flex items-center">
            <Building className="h-4 w-4 mr-2" />
            Praktijken
          </TabsTrigger>
          <TabsTrigger value="incidents" className="flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Incidenten
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SuperAdminSystemStatus />
            
            <Card>
              <CardHeader>
                <CardTitle>Recente incidenten</CardTitle>
                <CardDescription>
                  Laatste {incidents.length} geregistreerde incidenten
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SuperAdminIncidentManagement 
                  incidents={incidents} 
                  onIncidentsChange={setIncidents} 
                  showShortList={true}
                  onViewAll={() => setActiveTab("incidents")}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="practices">
          <SuperAdminPracticeManagement 
            practices={practices}
            onPracticesChange={setPractices}
          />
        </TabsContent>
        
        <TabsContent value="incidents">
          <SuperAdminIncidentManagement 
            incidents={incidents}
            onIncidentsChange={setIncidents}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SuperAdminDashboard;
