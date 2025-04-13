
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

interface AISettingsTabProps {
  onSave: () => void;
  saved: boolean;
}

const AISettingsTab = ({ onSave, saved }: AISettingsTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI-assistent configuratie</CardTitle>
        <CardDescription>
          Pas de instellingen van uw AI-assistent aan
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="ai-active" className="text-base">AI-assistent actief</Label>
            <Switch id="ai-active" defaultChecked />
          </div>
          <p className="text-sm text-muted-foreground">
            Schakel de AI-assistent in of uit voor uw praktijk
          </p>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Assistentie-instellingen</h3>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Telefoongesprek transcriptie</h4>
              <p className="text-sm text-muted-foreground">Automatisch transcriberen van telefoongesprekken</p>
            </div>
            <Switch id="transcription" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Triage ondersteuning</h4>
              <p className="text-sm text-muted-foreground">AI-ondersteuning bij triage beslissingen</p>
            </div>
            <Switch id="triage" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Medicatie-interactie controle</h4>
              <p className="text-sm text-muted-foreground">Automatisch controleren op medicatie-interacties</p>
            </div>
            <Switch id="medication" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Afspraakherinneringen</h4>
              <p className="text-sm text-muted-foreground">Automatisch versturen van afspraakherinneringen</p>
            </div>
            <Switch id="reminders" defaultChecked />
          </div>
        </div>
        
        <div className="pt-4">
          <div className="bg-medical-muted p-4 rounded-md">
            <h3 className="font-medium mb-2">Privacy en gegevensbescherming</h3>
            <p className="text-sm">
              De AI-assistent verwerkt patiëntgegevens volgens de AVG/GDPR regelgeving. 
              Alle data blijft binnen de EU en wordt versleuteld opgeslagen. 
              Lees meer in ons <span className="text-medical cursor-pointer">privacybeleid</span>.
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Annuleren</Button>
        <Button className="bg-medical hover:bg-medical-accent" onClick={onSave}>
          {saved ? "Opgeslagen!" : "Wijzigingen opslaan"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AISettingsTab;
