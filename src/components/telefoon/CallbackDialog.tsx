
import React from "react";
import { X, Phone, User } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface CallbackDialogProps {
  open: boolean;
  callbackName: string;
  callbackNumber: string;
  onClose: () => void;
  onStartCallback: () => void;
}

const CallbackDialog: React.FC<CallbackDialogProps> = ({
  open,
  callbackName,
  callbackNumber,
  onClose,
  onStartCallback,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Terugbellen</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex items-center space-x-2">
            <span className="font-medium">U gaat bellen:</span>
          </div>
          <div className="p-4 border rounded-md">
            <div className="flex items-center mb-2">
              <User className="h-4 w-4 mr-2 text-medical" />
              <span className="font-medium">{callbackName}</span>
            </div>
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2 text-medical" />
              <span>{callbackNumber}</span>
            </div>
          </div>
        </div>
        <DialogFooter className="flex space-x-2 justify-end">
          <Button 
            variant="outline" 
            onClick={onClose}
          >
            <X className="mr-2 h-4 w-4" />
            Annuleren
          </Button>
          <Button 
            className="bg-medical hover:bg-medical-accent"
            onClick={onStartCallback}
          >
            <Phone className="mr-2 h-4 w-4" />
            Bellen
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CallbackDialog;
