
import React from "react";
import { X, Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Call } from "./types";

interface EditNotesDialogProps {
  call: Call | null;
  editedNotes: string;
  onNotesChange: (notes: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

const EditNotesDialog: React.FC<EditNotesDialogProps> = ({
  call,
  editedNotes,
  onNotesChange,
  onSave,
  onCancel,
}) => {
  if (!call) return null;

  return (
    <Dialog open={!!call} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Notities bewerken</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <span className="font-medium">Gesprek met:</span>
            <span>{call.caller} ({call.phoneNumber})</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <span className="font-medium">Tijdstip:</span>
            <span>{call.time}, {call.date}</span>
          </div>
          <Textarea 
            value={editedNotes} 
            onChange={e => onNotesChange(e.target.value)}
            className="min-h-[120px]"
            placeholder="Voer notities in over dit gesprek"
          />
        </div>
        <DialogFooter className="flex space-x-2 justify-end">
          <Button 
            variant="outline" 
            onClick={onCancel}
          >
            <X className="mr-2 h-4 w-4" />
            Annuleren
          </Button>
          <Button 
            className="bg-medical hover:bg-medical-accent"
            onClick={onSave}
          >
            <Check className="mr-2 h-4 w-4" />
            Opslaan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditNotesDialog;
