
import { useState } from "react";
import { PencilIcon, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AdminUser } from "@/types/admin";

interface UserTableRowProps {
  user: AdminUser & { isEditing?: boolean };
  practices: string[];
  onToggleStatus: (id: number) => void;
  onDeleteUser: (id: number) => void;
  onToggleEditMode: (id: number) => void;
  onEditField: (id: number, field: keyof AdminUser, value: any) => void;
  onSaveChanges: (id: number) => void;
}

const UserTableRow = ({
  user,
  practices,
  onToggleStatus,
  onDeleteUser,
  onToggleEditMode,
  onEditField,
  onSaveChanges
}: UserTableRowProps) => {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            {user.isEditing ? (
              <Input
                value={user.name}
                onChange={(e) => onEditField(user.id, 'name', e.target.value)}
                className="w-full"
              />
            ) : (
              <p className="font-medium">{user.name}</p>
            )}
            {user.isEditing ? (
              <Input
                value={user.email}
                onChange={(e) => onEditField(user.id, 'email', e.target.value)}
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
            onChange={(e) => onEditField(user.id, 'role', e.target.value)}
            className="flex h-8 w-full rounded-md border border-input bg-background px-3 py-1 text-xs ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="assistent">Assistent</option>
            <option value="huisarts">Huisarts</option>
            <option value="admin">Admin</option>
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
            onChange={(e) => onEditField(user.id, 'practice', e.target.value)}
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
            onCheckedChange={() => onToggleStatus(user.id)}
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
            onClick={() => onSaveChanges(user.id)}
          >
            <Save className="h-4 w-4 mr-1" /> Opslaan
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="mr-2"
            onClick={() => onToggleEditMode(user.id)}
          >
            <PencilIcon className="h-4 w-4 mr-1" /> Bewerken
          </Button>
        )}
        <Button
          variant="outline"
          size="sm"
          className="text-destructive"
          onClick={() => onDeleteUser(user.id)}
        >
          Verwijderen
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default UserTableRow;
