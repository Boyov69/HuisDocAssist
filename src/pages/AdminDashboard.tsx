
import { useState } from "react";
import { Users, Settings, LayoutDashboard, Database, Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("users");
  
  // Voorbeeld gebruikers data
  const mockUsers = [
    { id: 1, name: "Dr. Janssen", email: "drjanssen@huisarts.nl", role: "huisarts", status: "Actief" },
    { id: 2, name: "Annemarie Smit", email: "asmit@huisarts.nl", role: "assistent", status: "Actief" },
    { id: 3, name: "Peter de Vries", email: "pdevries@huisarts.nl", role: "huisarts", status: "Inactief" },
    { id: 4, name: "Emma Bakker", email: "ebakker@huisarts.nl", role: "assistent", status: "Actief" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground mb-6">
          Beheer gebruikers en instellingen voor uw praktijk
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Totaal gebruikers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockUsers.length}</div>
            <p className="text-xs text-muted-foreground">
              {mockUsers.filter(u => u.status === "Actief").length} actief
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Huisartsen</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockUsers.filter(u => u.role === "huisarts").length}
            </div>
            <p className="text-xs text-muted-foreground">
              {mockUsers.filter(u => u.role === "huisarts" && u.status === "Actief").length} actief
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Assistenten</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockUsers.filter(u => u.role === "assistent").length}
            </div>
            <p className="text-xs text-muted-foreground">
              {mockUsers.filter(u => u.role === "assistent" && u.status === "Actief").length} actief
            </p>
          </CardContent>
        </Card>
      </div>
      
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
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Gebruikersbeheer</CardTitle>
                  <CardDescription>
                    Beheer alle gebruikers van de praktijk
                  </CardDescription>
                </div>
                <Button className="bg-medical hover:bg-medical-accent">
                  <Users className="h-4 w-4 mr-2" /> Nieuwe gebruiker
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Naam</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Acties</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <span className={`capitalize px-2 py-1 rounded-full text-xs ${
                          user.role === 'huisarts' ? 'bg-blue-100 text-blue-800' : 
                          user.role === 'assistent' ? 'bg-green-100 text-green-800' : 
                          user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {user.role}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`capitalize px-2 py-1 rounded-full text-xs ${
                          user.status === 'Actief' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {user.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" className="mr-2">Bewerken</Button>
                        <Button variant="outline" size="sm" className="text-destructive">Deactiveren</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Praktijkinstellingen</CardTitle>
              <CardDescription>
                Configureer instellingen voor uw praktijk
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <LayoutDashboard className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Praktijkinstellingen</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Hier kunt u geavanceerde instellingen voor uw praktijk configureren.
                  Ga naar de volledige instellingen voor meer opties.
                </p>
                <Button className="bg-medical hover:bg-medical-accent">
                  Ga naar instellingen
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
