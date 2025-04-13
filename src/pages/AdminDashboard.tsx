
import { useState } from "react";
import { Users, Settings, LayoutDashboard, Database, Shield, Mail, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Link } from "react-router-dom";

type AdminUser = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "Actief" | "Inactief";
  avatar?: string;
  lastLogin?: string;
};

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("users");
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);
  const [newUser, setNewUser] = useState<Partial<AdminUser>>({
    name: "",
    email: "",
    role: "assistent",
  });
  
  // Voorbeeld gebruikers data
  const [users, setUsers] = useState<AdminUser[]>([
    { id: 1, name: "Dr. Janssen", email: "drjanssen@huisarts.nl", role: "huisarts", status: "Actief", lastLogin: "13 apr 2025" },
    { id: 2, name: "Annemarie Smit", email: "asmit@huisarts.nl", role: "assistent", status: "Actief", lastLogin: "12 apr 2025" },
    { id: 3, name: "Peter de Vries", email: "pdevries@huisarts.nl", role: "huisarts", status: "Inactief", lastLogin: "2 apr 2025" },
    { id: 4, name: "Emma Bakker", email: "ebakker@huisarts.nl", role: "assistent", status: "Actief", lastLogin: "11 apr 2025" },
  ]);

  const [stats, setStats] = useState({
    activeUsers: users.filter(u => u.status === "Actief").length,
    huisartsen: users.filter(u => u.role === "huisarts").length,
    assistenten: users.filter(u => u.role === "assistent").length,
    alerts: 3,
    tickets: 5
  });

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      toast.error("Naam en email zijn verplicht");
      return;
    }

    const newId = Math.max(...users.map(u => u.id), 0) + 1;
    const userToAdd: AdminUser = {
      id: newId,
      name: newUser.name || "",
      email: newUser.email || "",
      role: newUser.role || "assistent",
      status: "Actief", // Explicitly use the literal type "Actief"
      lastLogin: "Nog niet ingelogd"
    };

    setUsers([...users, userToAdd]);
    setShowAddUserDialog(false);
    setNewUser({ name: "", email: "", role: "assistent" });
    
    // Update statistics
    updateStats([...users, userToAdd]);
    
    toast.success(`Gebruiker ${userToAdd.name} is toegevoegd`);
  };

  const handleToggleStatus = (id: number) => {
    const updatedUsers = users.map(user => {
      if (user.id === id) {
        // Explicitly use the literal types for status
        const newStatus: "Actief" | "Inactief" = user.status === "Actief" ? "Inactief" : "Actief";
        toast.success(`Gebruiker ${user.name} is nu ${newStatus.toLowerCase()}`);
        return { ...user, status: newStatus };
      }
      return user;
    });
    
    setUsers(updatedUsers);
    updateStats(updatedUsers);
  };

  const handleDeleteUser = (id: number) => {
    const userToDelete = users.find(u => u.id === id);
    if (!userToDelete) return;
    
    const updatedUsers = users.filter(u => u.id !== id);
    setUsers(updatedUsers);
    updateStats(updatedUsers);
    
    toast.success(`Gebruiker ${userToDelete.name} is verwijderd`);
  };

  const updateStats = (updatedUsers: AdminUser[]) => {
    setStats({
      activeUsers: updatedUsers.filter(u => u.status === "Actief").length,
      huisartsen: updatedUsers.filter(u => u.role === "huisarts").length,
      assistenten: updatedUsers.filter(u => u.role === "assistent").length,
      alerts: stats.alerts,
      tickets: stats.tickets
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground mb-6">
          Beheer gebruikers en instellingen voor uw praktijk
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Totaal gebruikers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activeUsers} actief
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Huisartsen</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.huisartsen}</div>
            <p className="text-xs text-muted-foreground">
              {users.filter(u => u.role === "huisarts" && u.status === "Actief").length} actief
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Assistenten</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.assistenten}</div>
            <p className="text-xs text-muted-foreground">
              {users.filter(u => u.role === "assistent" && u.status === "Actief").length} actief
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Waarschuwingen</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.alerts}</div>
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
            <div className="text-2xl font-bold">{stats.tickets}</div>
            <p className="text-xs text-muted-foreground">
              2 onbeantwoord
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
                <Dialog open={showAddUserDialog} onOpenChange={setShowAddUserDialog}>
                  <DialogTrigger asChild>
                    <Button className="bg-medical hover:bg-medical-accent">
                      <Users className="h-4 w-4 mr-2" /> Nieuwe gebruiker
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Nieuwe gebruiker toevoegen</DialogTitle>
                      <DialogDescription>
                        Vul de gegevens in om een nieuwe gebruiker toe te voegen aan het systeem.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Naam</Label>
                        <Input
                          id="name"
                          value={newUser.name || ""}
                          onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                          placeholder="Volledige naam"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">E-mailadres</Label>
                        <Input
                          id="email"
                          type="email"
                          value={newUser.email || ""}
                          onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                          placeholder="email@voorbeeld.nl"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="role">Rol</Label>
                        <select
                          id="role"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          value={newUser.role}
                          onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                        >
                          <option value="assistent">Assistent</option>
                          <option value="huisarts">Huisarts</option>
                          {user?.role === 'super-admin' && (
                            <option value="admin">Admin</option>
                          )}
                        </select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowAddUserDialog(false)}>
                        Annuleren
                      </Button>
                      <Button className="bg-medical hover:bg-medical-accent" onClick={handleAddUser}>
                        Toevoegen
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Gebruiker</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>Laatste login</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Acties</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`capitalize px-2 py-1 rounded-full text-xs ${
                          user.role === 'huisarts' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' : 
                          user.role === 'assistent' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 
                          user.role === 'admin' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' : 
                          'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                        }`}>
                          {user.role}
                        </span>
                      </TableCell>
                      <TableCell>{user.lastLogin}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Switch 
                            checked={user.status === "Actief"} 
                            onCheckedChange={() => handleToggleStatus(user.id)}
                          />
                          <span className={`${
                            user.status === 'Actief' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {user.status}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" className="mr-2">Bewerken</Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-destructive"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          Verwijderen
                        </Button>
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
              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Algemene instellingen</h3>
                  
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="practice-name">Praktijknaam</Label>
                      <Input id="practice-name" defaultValue="Huisartsenpraktijk Zorgzaam" />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="practice-address">Praktijkadres</Label>
                      <Input id="practice-address" defaultValue="Zorgstraat 123, 1234 AB Amsterdam" />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="practice-phone">Telefoonnummer</Label>
                      <Input id="practice-phone" defaultValue="020-1234567" />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="practice-email">E-mailadres</Label>
                      <Input id="practice-email" defaultValue="info@huisartszorgzaam.nl" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Systeem instellingen</h3>
                  
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base" htmlFor="auto-logout">Automatische uitloggen</Label>
                        <p className="text-sm text-muted-foreground">Bij inactiviteit gebruiker uitloggen</p>
                      </div>
                      <Switch id="auto-logout" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base" htmlFor="audit-log">Audit logging</Label>
                        <p className="text-sm text-muted-foreground">Alle gebruikersacties loggen voor beveiliging</p>
                      </div>
                      <Switch id="audit-log" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base" htmlFor="two-factor">Twee-factor authenticatie vereisen</Label>
                        <p className="text-sm text-muted-foreground">Voor alle gebruikers 2FA verplicht maken</p>
                      </div>
                      <Switch id="two-factor" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end gap-4">
                <Button variant="outline">Annuleren</Button>
                <Button 
                  className="bg-medical hover:bg-medical-accent"
                  onClick={() => toast.success("Instellingen opgeslagen")}
                >
                  Wijzigingen opslaan
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
