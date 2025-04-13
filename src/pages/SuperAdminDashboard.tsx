
import { useState } from "react";
import { 
  Users, 
  Shield, 
  Database, 
  ServerCog, 
  Globe, 
  AlertTriangle, 
  BarChart4, 
  HardDrive,
  Building,
  Bell
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const SuperAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Mock data
  const [stats, setStats] = useState({
    totalPractices: 8,
    activePractices: 7,
    totalUsers: 78,
    activeUsers: 65,
    totalStorage: 128, // GB
    usedStorage: 67, // GB
    serverLoad: 42, // %
    incidentCount: 3
  });

  const [practices, setPractices] = useState([
    { id: 1, name: "Huisartsenpraktijk Zorgzaam", users: 12, status: "Actief", region: "Amsterdam", aiEnabled: true },
    { id: 2, name: "Medisch Centrum Noord", users: 15, status: "Actief", region: "Rotterdam", aiEnabled: true },
    { id: 3, name: "Huisartsen Groepspraktijk Zuid", users: 18, status: "Actief", region: "Utrecht", aiEnabled: true },
    { id: 4, name: "Gezondheidscentrum Oost", users: 9, status: "Actief", region: "Den Haag", aiEnabled: false },
    { id: 5, name: "Praktijk Dr. Jansen & Partners", users: 5, status: "Actief", region: "Eindhoven", aiEnabled: true },
    { id: 6, name: "Gezondheidscentrum De Linden", users: 11, status: "Actief", region: "Groningen", aiEnabled: true },
    { id: 7, name: "Huisartsenpraktijk Vitaal", users: 8, status: "Actief", region: "Maastricht", aiEnabled: false },
    { id: 8, name: "Medisch Centrum De Vaart", users: 0, status: "Inactief", region: "Arnhem", aiEnabled: false },
  ]);

  const [incidents, setIncidents] = useState([
    { id: 1, type: "Server overbelasting", location: "Server cluster B", date: "13 apr 2025", status: "Opgelost", severity: "Hoog" },
    { id: 2, type: "Beveiligingsschending", location: "Praktijk ID 3", date: "12 apr 2025", status: "In behandeling", severity: "Kritiek" },
    { id: 3, type: "Database error", location: "Primaire database", date: "10 apr 2025", status: "In behandeling", severity: "Medium" },
  ]);

  const handleTogglePracticeStatus = (id: number) => {
    setPractices(practices.map(practice => {
      if (practice.id === id) {
        const newStatus = practice.status === "Actief" ? "Inactief" : "Actief";
        toast.success(`Praktijk status bijgewerkt naar ${newStatus}`);
        return { ...practice, status: newStatus };
      }
      return practice;
    }));
  };

  const handleToggleAI = (id: number) => {
    setPractices(practices.map(practice => {
      if (practice.id === id) {
        const newAiStatus = !practice.aiEnabled;
        toast.success(`AI-functionaliteit ${newAiStatus ? 'ingeschakeld' : 'uitgeschakeld'} voor praktijk ID ${id}`);
        return { ...practice, aiEnabled: newAiStatus };
      }
      return practice;
    }));
  };

  const resolveIncident = (id: number) => {
    setIncidents(incidents.map(incident => {
      if (incident.id === id) {
        toast.success(`Incident #${id} is als opgelost gemarkeerd`);
        return { ...incident, status: "Opgelost" };
      }
      return incident;
    }));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2">Super Admin Dashboard</h1>
        <p className="text-muted-foreground mb-6">
          Beheer alle praktijken, gebruikers en systeeminstellingen
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Praktijken</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPractices}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activePractices} actief
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Gebruikers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activeUsers} actief ({Math.round(stats.activeUsers/stats.totalUsers*100)}%)
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Opslagruimte</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-1">
              <div className="text-2xl font-bold">{stats.usedStorage} GB</div>
              <div className="text-sm text-muted-foreground">van {stats.totalStorage} GB</div>
            </div>
            <Progress value={(stats.usedStorage/stats.totalStorage)*100} className="h-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Server belasting</CardTitle>
            <ServerCog className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.serverLoad}%</div>
            <Progress value={stats.serverLoad} className="h-2" />
          </CardContent>
        </Card>
      </div>

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
            <Card>
              <CardHeader>
                <CardTitle>Systeem status</CardTitle>
                <CardDescription>
                  Huidige status van alle subsystemen
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Database className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Database clusters</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-green-600 bg-green-100 dark:bg-green-900 px-2 py-1 rounded-full text-xs">Online</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <ServerCog className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Application servers</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-green-600 bg-green-100 dark:bg-green-900 px-2 py-1 rounded-full text-xs">Online</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Security services</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-green-600 bg-green-100 dark:bg-green-900 px-2 py-1 rounded-full text-xs">Online</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>API gateways</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-amber-600 bg-amber-100 dark:bg-amber-900 px-2 py-1 rounded-full text-xs">Gedeeltelijk</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Bell className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Notification services</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-green-600 bg-green-100 dark:bg-green-900 px-2 py-1 rounded-full text-xs">Online</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button 
                    className="w-full bg-medical hover:bg-medical-accent"
                    onClick={() => toast.success("Systeem status vernieuwd")}
                  >
                    Vernieuw status
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recente incidenten</CardTitle>
                <CardDescription>
                  Laatste {incidents.length} geregistreerde incidenten
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {incidents.slice(0, 3).map((incident) => (
                    <div key={incident.id} className="flex items-start justify-between border-b pb-3">
                      <div>
                        <h4 className="font-medium flex items-center">
                          <AlertTriangle className={`h-4 w-4 mr-2 ${
                            incident.severity === 'Kritiek' ? 'text-red-500' :
                            incident.severity === 'Hoog' ? 'text-amber-500' : 'text-blue-500'
                          }`} />
                          {incident.type}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">{incident.location} - {incident.date}</p>
                      </div>
                      <div>
                        <span className={`${
                          incident.status === 'Opgelost' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 
                          'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300'
                        } px-2 py-1 rounded-full text-xs`}>
                          {incident.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setActiveTab("incidents")}
                  >
                    Bekijk alle incidenten
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="practices">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Praktijkenbeheer</CardTitle>
                  <CardDescription>
                    Beheer alle praktijken in het systeem
                  </CardDescription>
                </div>
                <Button className="bg-medical hover:bg-medical-accent" onClick={() => toast.success("Deze functie wordt binnenkort geïmplementeerd")}>
                  <Building className="h-4 w-4 mr-2" /> Nieuwe praktijk
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Praktijk</TableHead>
                    <TableHead>Regio</TableHead>
                    <TableHead>Gebruikers</TableHead>
                    <TableHead>AI-functionaliteit</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Acties</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {practices.map((practice) => (
                    <TableRow key={practice.id}>
                      <TableCell className="font-medium">{practice.name}</TableCell>
                      <TableCell>{practice.region}</TableCell>
                      <TableCell>{practice.users}</TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className={practice.aiEnabled ? "bg-green-100 hover:bg-green-200 text-green-800" : "bg-gray-100 hover:bg-gray-200 text-gray-800"}
                          onClick={() => handleToggleAI(practice.id)}
                        >
                          {practice.aiEnabled ? "Ingeschakeld" : "Uitgeschakeld"}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <span className={`capitalize px-2 py-1 rounded-full text-xs ${
                          practice.status === 'Actief' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 
                          'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                        }`}>
                          {practice.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" className="mr-2" onClick={() => toast.success("Deze functie wordt binnenkort geïmplementeerd")}>
                          Details
                        </Button>
                        <Button 
                          variant={practice.status === "Actief" ? "destructive" : "outline"}
                          size="sm"
                          onClick={() => handleTogglePracticeStatus(practice.id)}
                        >
                          {practice.status === "Actief" ? "Deactiveren" : "Activeren"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="incidents">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Incidentenbeheer</CardTitle>
                  <CardDescription>
                    Beheer en monitor systeem incidenten
                  </CardDescription>
                </div>
                <Button className="bg-medical hover:bg-medical-accent" onClick={() => toast.success("Deze functie wordt binnenkort geïmplementeerd")}>
                  <AlertTriangle className="h-4 w-4 mr-2" /> Nieuw incident
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Locatie</TableHead>
                    <TableHead>Ernst</TableHead>
                    <TableHead>Datum</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Acties</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {incidents.map((incident) => (
                    <TableRow key={incident.id}>
                      <TableCell>#{incident.id}</TableCell>
                      <TableCell className="font-medium">{incident.type}</TableCell>
                      <TableCell>{incident.location}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          incident.severity === 'Kritiek' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' : 
                          incident.severity === 'Hoog' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300' : 
                          'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                        }`}>
                          {incident.severity}
                        </span>
                      </TableCell>
                      <TableCell>{incident.date}</TableCell>
                      <TableCell>
                        <span className={`capitalize px-2 py-1 rounded-full text-xs ${
                          incident.status === 'Opgelost' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 
                          'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300'
                        }`}>
                          {incident.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" className="mr-2" onClick={() => toast.success("Deze functie wordt binnenkort geïmplementeerd")}>
                          Details
                        </Button>
                        {incident.status !== "Opgelost" && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="bg-green-100 hover:bg-green-200 text-green-800"
                            onClick={() => resolveIncident(incident.id)}
                          >
                            Oplossen
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SuperAdminDashboard;
