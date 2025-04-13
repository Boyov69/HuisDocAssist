
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogFooter } from "@/components/ui/dialog";
import { AdminUser } from "@/types/admin";
import { useAuth } from "@/contexts/AuthContext";

interface UserFormProps {
  user?: Partial<AdminUser>;
  practices: string[];
  onSubmit: (user: Partial<AdminUser>) => void;
  onCancel: () => void;
  submitLabel: string;
}

const UserForm = ({ user, practices, onSubmit, onCancel, submitLabel }: UserFormProps) => {
  const { user: currentUser } = useAuth();
  const [formData, setFormData] = useState<Partial<AdminUser>>(
    user || {
      name: "",
      email: "",
      role: "assistent",
      practice: "",
    }
  );

  const handleChange = (field: keyof AdminUser, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Naam</Label>
        <Input
          id="name"
          value={formData.name || ""}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="Volledige naam"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">E-mailadres</Label>
        <Input
          id="email"
          type="email"
          value={formData.email || ""}
          onChange={(e) => handleChange("email", e.target.value)}
          placeholder="email@voorbeeld.nl"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="role">Rol</Label>
        <select
          id="role"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          value={formData.role || "assistent"}
          onChange={(e) => handleChange("role", e.target.value)}
        >
          <option value="assistent">Assistent</option>
          <option value="huisarts">Huisarts</option>
          {currentUser?.role === 'super-admin' && (
            <option value="admin">Admin</option>
          )}
        </select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="practice">Praktijk</Label>
        <select
          id="practice"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          value={formData.practice || ""}
          onChange={(e) => handleChange("practice", e.target.value)}
        >
          <option value="" disabled>Selecteer een praktijk</option>
          {practices.map((practice) => (
            <option key={practice} value={practice}>{practice}</option>
          ))}
        </select>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Annuleren
        </Button>
        <Button className="bg-medical hover:bg-medical-accent" onClick={handleSubmit}>
          {submitLabel}
        </Button>
      </DialogFooter>
    </div>
  );
};

export default UserForm;
