
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PencilIcon, Trash2Icon, UserPlusIcon, CheckIcon, XIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const UsersSettingsTab = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([
    { id: 1, name: "Dr. Janssen", email: "drjanssen@huisarts.nl", role: "huisarts", active: true, lastLogin: "13 apr 2025" },
    { id: 2, name: "Annemarie Smit", email: "assistent@huisarts.nl", role: "assistent", active: true, lastLogin: "12 apr 2025" },
    { id: 3, name: "Beheerder van Veen", email: "admin@huisarts.nl", role: "admin", active: true, lastLogin: "10 apr 2025" },
    { id: 4, name: "Marloes de Vries", email: "mdevries@huisarts.nl", role: "huisarts", active: false, lastLogin: "2 apr 2025" },
  ]);
  
  const [newUserMode, setNewUserMode] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "assistent" });
  
  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      toast.error("Naam en e-mail zijn verplicht");
      return;
    }
    
    const id = users.length + 1;
    setUsers([...users, { 
      ...newUser, 
      id, 
      active: true, 
      lastLogin: "Nog niet ingelogd" 
    }]);
    setNewUser({ name: "", email: "", role: "assistent" });
    setNewUserMode(false);
    toast.success("Gebruiker toegevoegd");
  };
  
  const handleToggleActive = (id: number) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, active: !user.active } : user
    ));
    
    const targetUser = users.find(user => user.id === id);
    if (targetUser) {
      toast.success(`Gebruiker ${targetUser.active ? 'gedeactiveerd' : 'geactiveerd'}`);
    }
  };
  
  const handleDeleteUser = (id: number) => {
    const userToDelete = users.find(user => user.id === id);
    setUsers(users.filter(user => user.id !== id));
    
    if (userToDelete) {
      toast.success(`Gebruiker ${userToDelete.name} verwijderd`);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Gebruikersbeheer</CardTitle>
            <CardDescription>
              Beheer alle gebruikers van de praktijk
            </CardDescription>
          </div>
          <Button 
            onClick={() => setNewUserMode(!newUserMode)} 
            className="bg-medical hover:bg-medical-accent"
          >
            <UserPlusIcon className="h-4 w-4 mr-2" /> Nieuwe gebruiker
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {newUserMode && (
          <div className="mb-6 p-4 border rounded-md bg-gray-50 dark:bg-gray-800">
            <h3 className="text-lg font-medium mb-4">Nieuwe gebruiker toevoegen</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <Label htmlFor="new-name">Naam</Label>
                <Input 
                  id="new-name" 
                  value={newUser.name} 
                  onChange={e => setNewUser({...newUser, name: e.target.value})}
                  placeholder="Volledige naam"
                />
              </div>
              <div>
                <Label htmlFor="new-email">E-mailadres</Label>
                <Input 
                  id="new-email" 
                  type="email" 
                  value={newUser.email} 
                  onChange={e => setNewUser({...newUser, email: e.target.value})}
                  placeholder="email@voorbeeld.nl"
                />
              </div>
              <div>
                <Label htmlFor="new-role">Rol</Label>
                <select 
                  id="new-role" 
                  className="w-full px-3 py-2 border rounded-md"
                  value={newUser.role}
                  onChange={e => setNewUser({...newUser, role: e.target.value})}
                >
                  <option value="assistent">Assistent</option>
                  <option value="huisarts">Huisarts</option>
                  {user?.role === 'super-admin' && (
                    <option value="admin">Admin</option>
                  )}
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setNewUserMode(false)}>
                <XIcon className="h-4 w-4 mr-2" /> Annuleren
              </Button>
              <Button className="bg-medical hover:bg-medical-accent" onClick={handleAddUser}>
                <CheckIcon className="h-4 w-4 mr-2" /> Toevoegen
              </Button>
            </div>
          </div>
        )}
        
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
            {users.map(user => (
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
                  <span className="capitalize">{user.role}</span>
                </TableCell>
                <TableCell>{user.lastLogin}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      checked={user.active} 
                      onCheckedChange={() => handleToggleActive(user.id)}
                    />
                    <span className={user.active ? "text-green-600" : "text-red-600"}>
                      {user.active ? "Actief" : "Inactief"}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-destructive" 
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    <Trash2Icon className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default UsersSettingsTab;
