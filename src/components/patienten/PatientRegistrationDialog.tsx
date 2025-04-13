
import React from "react";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PatientRegistrationForm from "./PatientRegistrationForm";

interface PatientRegistrationDialogProps {
  triggerText?: string;
  buttonClassName?: string;
  buttonSize?: "default" | "sm" | "lg";
  buttonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  onSuccess?: (data: any) => void;
}

const PatientRegistrationDialog = ({
  triggerText = "Nieuwe patiënt",
  buttonClassName = "",
  buttonSize = "default",
  buttonVariant = "default",
  onSuccess,
}: PatientRegistrationDialogProps) => {
  const [open, setOpen] = React.useState(false);

  const handleSuccess = (data: any) => {
    if (onSuccess) {
      onSuccess(data);
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant={buttonVariant} 
          size={buttonSize} 
          className={buttonClassName}
        >
          <UserPlus className="mr-2 h-4 w-4" />
          {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Nieuwe patiënt registreren</DialogTitle>
          <DialogDescription>
            Vul de gegevens van de nieuwe patiënt in. Alle velden zijn verplicht.
          </DialogDescription>
        </DialogHeader>
        <PatientRegistrationForm onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
};

export default PatientRegistrationDialog;
