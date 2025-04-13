
import { useState } from "react";
import { Users, PencilIcon, Save } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { AdminUser } from "@/types/admin";
import { useAuth } from "@/contexts/AuthContext";

interface AdminUserManagementProps {
  users: AdminUser[];
  onUserChange: (updatedUsers: AdminUser[]) => void;
}

interface EditableUser extends AdminUser {
  isEditing?: boolean;
}

const AdminUserManagement = ({ users, onUserChange }: AdminUserManagementProps) => {
  const { user } = useAuth();
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);
  const [editableUsers, setEditableUsers] = useState<EditableUser[]>(users.map(user => ({...user, isEditing: false})));
  const [newUser, setNewUser] = useState<Partial<AdminUser>>({
    name: "",
    email: "",
    role: "assistent",
    practice: "",
  });
  
  const [practices] = useState([
    "Huisartsenpraktijk Zorgzaam",
    "Medisch Centrum Noord",
    "Groepspraktijk Gezond Leven",
    "Huisartsengroep Centrum"
  ]);

  // Synchroniseer de editableUsers wanneer de users prop verandert
  const updateEditableUsers = () => {
    setEditableUsers(users.map(user => {
      const existingEditableUser = editableUsers.find(eu => eu.id === user.id);
      return existingEditableUser ? existingEditableUser : {...user, isEditing: false};
    }));
  };

  // Update editableUsers wanneer users verandert
  if (JSON.stringify(users.map(u => u.id)) !== JSON.stringify(editableUsers.map(u => u.id))) {
    updateEditableUsers();
  }

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
      lastLogin: "Nog niet ingelogd",
      practice: newUser.practice || "Huisartsenpraktijk Zorgzaam"
    };

    const updatedUsers = [...users, userToAdd];
    onUserChange(updatedUsers);
    setShowAddUserDialog(false);
    setNewUser({ name: "", email: "", role: "assistent", practice: "" });
    
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
    
    onUserChange(updatedUsers);
  };

  const handleDeleteUser = (id: number) => {
    const userToDelete = users.find(u => u.id === id);
    if (!userToDelete) return;
    
    const updatedUsers = users.filter(u => u.id !== id);
    onUserChange(updatedUsers);
    
    toast.success(`Gebruiker ${userToDelete.name} is verwijderd`);
  };

  const toggleEditMode = (id: number) => {
    setEditableUsers(prev => prev.map(user => 
      user.id === id 
        ? { ...user, isEditing: !user.isEditing } 
        : user
    ));
  };

  const handleEditField = (id: number, field: keyof AdminUser, value: any) => {
    setEditableUsers(prev => prev.map(user => 
      user.id === id 
        ? { ...user, [field]: value } 
        : user
    ));
  };

  const saveUserChanges = (id: number) => {
    const editedUser = editableUsers.find(u => u.id === id);
    if (!editedUser) return;
    
    const updatedUsers = users.map(user => 
      user.id === id 
        ? { ...editedUser, isEditing: false } 
        : user
    );
    
    onUserChange(updatedUsers);
    toggleEditMode(id);
    toast.success(`Gebruiker ${editedUser.name} is bijgewerkt`);
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
                <div className="grid gap-2">
                  <Label htmlFor="practice">Praktijk</Label>
                  <select
                    id="practice"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={newUser.practice}
                    onChange={(e) => setNewUser({...newUser, practice: e.target.value})}
                  >
                    <option value="" disabled>Selecteer een praktijk</option>
                    {practices.map((practice) => (
                      <option key={practice} value={practice}>{practice}</option>
                    ))}
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
              <TableHead>Praktijk</TableHead>
              <TableHead>Laatste login</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Acties</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {editableUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      {user.isEditing ? (
                        <Input 
                          value={user.name} 
                          onChange={(e) => handleEditField(user.id, 'name', e.target.value)}
                          className="w-full"
                        />
                      ) : (
                        <p className="font-medium">{user.name}</p>
                      )}
                      {user.isEditing ? (
                        <Input 
                          value={user.email} 
                          onChange={(e) => handleEditField(user.id, 'email', e.target.value)} 
                          className="w-full text-xs mt-1"
                        />
                      ) : (
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {user.isEditing ? (
                    <select
                      value={user.role}
                      onChange={(e) => handleEditField(user.id, 'role', e.target.value)}
                      className="flex h-8 w-full rounded-md border border-input bg-background px-3 py-1 text-xs ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="assistent">Assistent</option>
                      <option value="huisarts">Huisarts</option>
                      {user?.role === 'super-admin' && (
                        <option value="admin">Admin</option>
                      )}
                    </select>
                  ) : (
                    <span className={`capitalize px-2 py-1 rounded-full text-xs ${
                      user.role === 'huisarts' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' : 
                      user.role === 'assistent' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 
                      user.role === 'admin' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' : 
                      'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                    }`}>
                      {user.role}
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  {user.isEditing ? (
                    <select
                      value={user.practice || ""}
                      onChange={(e) => handleEditField(user.id, 'practice', e.target.value)}
                      className="flex h-8 w-full rounded-md border border-input bg-background px-3 py-1 text-xs ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="" disabled>Selecteer een praktijk</option>
                      {practices.map((practice) => (
                        <option key={practice} value={practice}>{practice}</option>
                      ))}
                    </select>
                  ) : (
                    <span className="text-sm">{user.practice || "Niet toegewezen"}</span>
                  )}
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
                  {user.isEditing ? (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mr-2"
                      onClick={() => saveUserChanges(user.id)}
                    >
                      <Save className="h-4 w-4 mr-1" /> Opslaan
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mr-2"
                      onClick={() => toggleEditMode(user.id)}
                    >
                      <PencilIcon className="h-4 w-4 mr-1" /> Bewerken
                    </Button>
                  )}
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
  );
};

export default AdminUserManagement;
