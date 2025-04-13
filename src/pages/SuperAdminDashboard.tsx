
import { useState } from "react";
import { Users, Building, Shield, Database, Server, Lock, LayoutDashboard } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const SuperAdminDashboard = () => {
  const { user } = useAuth();
  
  // Voorbeeld praktijken data
  const mockPractices = [
    { id: 1, name: "Huisartsenpraktijk Gezond", location: "Amsterdam", users: 12, status: "Actief" },
    { id: 2, name: "Medisch Centrum Noord", location: "Rotterdam", users: 8, status: "Actief" },
    { id: 3, name: "Praktijk Beter", location: "Utrecht", users: 15, status: "Actief" },
    { id: 4, name: "Gezondheidscentrum Zuid", location: "Den Haag", users: 5, status: "Inactief" },
  ];

  // Voorbeeld admins data
  const mockAdmins = [
    { id: 1, name: "Beheerder van Veen", email: "admin@huisartsgezond.nl", practice: "Huisartsenpraktijk Gezond", role: "admin", status: "Actief" },
    { id: 2, name: "Maria Jansen", email: "admin@mcnoord.nl", practice: "Medisch Centrum Noord", role: "admin", status: "Actief" },
    { id: 3, name: "Thomas Bakker", email: "admin@praktijkbeter.nl", practice: "Praktijk Beter", role: "admin", status: "Actief" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2">Super Admin Dashboard</h1>
        <p className="text-muted-foreground mb-6">
          Beheer alle praktijken en systeeminstellingen
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Totaal praktijken</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockPractices.length}</div>
            <p className="text-xs text-muted-foreground">
              {mockPractices.filter(p => p.status === "Actief").length} actief
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Totaal gebruikers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockPractices.reduce((sum, practice) => sum + practice.users, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Verdeeld over {mockPractices.filter(p => p.status === "Actief").length} praktijken
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Beheerders</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAdmins.length}</div>
            <p className="text-xs text-muted-foreground">
              {mockAdmins.filter(a => a.status === "Actief").length} actief
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Systeemstatus</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">Operationeel</div>
            <p className="text-xs text-muted-foreground">
              Laatste update: 13 apr 2025
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="practices" className="w-full">
        <TabsList className="mb-4 grid grid-cols-1 md:grid-cols-4">
          <TabsTrigger value="practices" className="flex items-center">
            <Building className="h-4 w-4 mr-2" />
            Praktijken
          </TabsTrigger>
          <TabsTrigger value="admins" className="flex items-center">
            <Shield className="h-4 w-4 mr-2" />
            Beheerders
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center">
            <Server className="h-4 w-4 mr-2" />
            Systeembeheer
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center">
            <Lock className="h-4 w-4 mr-2" />
            Beveiliging
          </TabsTrigger>
        </TabsList>
        
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
                <Button className="bg-medical hover:bg-medical-accent">
                  <Building className="h-4 w-4 mr-2" /> Nieuwe praktijk
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Naam</TableHead>
                    <TableHead>Locatie</TableHead>
                    <TableHead>Aantal gebruikers</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Acties</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockPractices.map((practice) => (
                    <TableRow key={practice.id}>
                      <TableCell className="font-medium">{practice.name}</TableCell>
                      <TableCell>{practice.location}</TableCell>
                      <TableCell>{practice.users}</TableCell>
                      <TableCell>
                        <span className={`capitalize px-2 py-1 rounded-full text-xs ${
                          practice.status === 'Actief' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {practice.status}
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
        
        <TabsContent value="admins">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Beheerdersaccounts</CardTitle>
                  <CardDescription>
                    Beheer alle admin gebruikers in het systeem
                  </CardDescription>
                </div>
                <Button className="bg-medical hover:bg-medical-accent">
                  <Shield className="h-4 w-4 mr-2" /> Nieuwe beheerder
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Naam</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Praktijk</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Acties</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAdmins.map((admin) => (
                    <TableRow key={admin.id}>
                      <TableCell className="font-medium">{admin.name}</TableCell>
                      <TableCell>{admin.email}</TableCell>
                      <TableCell>{admin.practice}</TableCell>
                      <TableCell>
                        <span className={`capitalize px-2 py-1 rounded-full text-xs ${
                          admin.status === 'Actief' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {admin.status}
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
        
        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle>Systeembeheer</CardTitle>
              <CardDescription>
                Beheer systeeminstellingen en configuratie
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Database Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <span>Operationeel</span>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Opslagruimte gebruikt</span>
                        <span>43%</span>
                      </div>
                      <div className="h-2 mt-1 bg-gray-200 rounded-full">
                        <div className="h-2 rounded-full bg-medical" style={{ width: '43%' }}></div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button variant="outline" size="sm" className="w-full">
                        <Database className="h-4 w-4 mr-2" /> Database beheren
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">AI-Training</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2">
                      <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                      <span>Training bezig</span>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Voortgang</span>
                        <span>67%</span>
                      </div>
                      <div className="h-2 mt-1 bg-gray-200 rounded-full">
                        <div className="h-2 rounded-full bg-amber-500" style={{ width: '67%' }}></div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button variant="outline" size="sm" className="w-full">
                        <Server className="h-4 w-4 mr-2" /> AI-model beheren
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Beveiligingsinstellingen</CardTitle>
              <CardDescription>
                Beheer beveiligingsinstellingen voor het hele systeem
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Lock className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Beveiligingsinstellingen</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Hier kunt u geavanceerde beveiligingsinstellingen voor het hele systeem configureren.
                </p>
                <Button className="bg-medical hover:bg-medical-accent">
                  Beveiligingsinstellingen beheren
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SuperAdminDashboard;
