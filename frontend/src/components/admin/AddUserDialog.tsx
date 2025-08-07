
import { DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { AdminUser } from "@/types/admin";
import UserForm from "./UserForm";

interface AddUserDialogProps {
  open: boolean;
  practices: string[];
  onOpenChange: (open: boolean) => void;
  onAddUser: (user: Partial<AdminUser>) => void;
}

const AddUserDialog = ({ open, practices, onOpenChange, onAddUser }: AddUserDialogProps) => {
  return (
    <>
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
        <UserForm 
          practices={practices}
          onSubmit={onAddUser}
          onCancel={() => onOpenChange(false)}
          submitLabel="Toevoegen"
        />
      </DialogContent>
    </>
  );
};

export default AddUserDialog;
