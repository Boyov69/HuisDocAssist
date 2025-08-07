
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface ApiKeyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  apiKey: string;
  onApiKeyChange: (value: string) => void;
  onSave: () => void;
}

const ApiKeyDialog: React.FC<ApiKeyDialogProps> = ({
  open,
  onOpenChange,
  apiKey,
  onApiKeyChange,
  onSave,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>ElevenLabs API Sleutel</DialogTitle>
            <DialogDescription>
              Voer je ElevenLabs API sleutel in om AI-transcriptie en spraakfuncties te activeren.
              Je kunt een API sleutel krijgen op{" "}
              <a
                href="https://elevenlabs.io/app"
                target="_blank"
                rel="noreferrer"
                className="text-medical hover:underline"
              >
                elevenlabs.io
              </a>
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="apiKey" className="mb-2 block">
              API Sleutel
            </Label>
            <Input
              id="apiKey"
              type="password"
              value={apiKey}
              onChange={(e) => onApiKeyChange(e.target.value)}
              placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
              className="w-full"
              required
            />
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-medical hover:bg-medical-accent"
              disabled={!apiKey}
            >
              Opslaan
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyDialog;
