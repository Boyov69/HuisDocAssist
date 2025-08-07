
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog } from "@/components/ui/dialog";
import { toast } from "sonner";
import { AdminUser } from "@/types/admin";
import UserTableRow from "./UserTableRow";
import AddUserDialog from "./AddUserDialog";

interface AdminUserManagementProps {
  users: AdminUser[];
  onUserChange: (updatedUsers: AdminUser[]) => void;
}

interface EditableUser extends AdminUser {
  isEditing?: boolean;
}

const AdminUserManagement = ({ users, onUserChange }: AdminUserManagementProps) => {
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);
  const [editableUsers, setEditableUsers] = useState<EditableUser[]>(
    users.map(user => ({ ...user, isEditing: false }))
  );

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
      return existingEditableUser ? existingEditableUser : { ...user, isEditing: false };
    }));
  };

  // Update editableUsers wanneer users verandert
  useEffect(() => {
    if (
      JSON.stringify(users.map(u => u.id)) !==
      JSON.stringify(editableUsers.map(u => u.id))
    ) {
      updateEditableUsers();
    }
  }, [users]);

  const handleAddUser = (newUser: Partial<AdminUser>) => {
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
            <AddUserDialog 
              open={showAddUserDialog}
              practices={practices}
              onOpenChange={setShowAddUserDialog}
              onAddUser={handleAddUser}
            />
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
              <UserTableRow 
                key={user.id}
                user={user}
                practices={practices}
                onToggleStatus={handleToggleStatus}
                onDeleteUser={handleDeleteUser}
                onToggleEditMode={toggleEditMode}
                onEditField={handleEditField}
                onSaveChanges={saveUserChanges}
              />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminUserManagement;
