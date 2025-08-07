
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const AdminPracticeSettings = () => {
  const handleSaveSettings = () => {
    toast.success("Instellingen opgeslagen");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Praktijkinstellingen</CardTitle>
        <CardDescription>
          Configureer instellingen voor uw praktijk
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Algemene instellingen</h3>
            
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="practice-name">Praktijknaam</Label>
                <Input id="practice-name" defaultValue="Huisartsenpraktijk Zorgzaam" />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="practice-address">Praktijkadres</Label>
                <Input id="practice-address" defaultValue="Zorgstraat 123, 1234 AB Amsterdam" />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="practice-phone">Telefoonnummer</Label>
                <Input id="practice-phone" defaultValue="020-1234567" />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="practice-email">E-mailadres</Label>
                <Input id="practice-email" defaultValue="info@huisartszorgzaam.nl" />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Systeem instellingen</h3>
            
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base" htmlFor="auto-logout">Automatische uitloggen</Label>
                  <p className="text-sm text-muted-foreground">Bij inactiviteit gebruiker uitloggen</p>
                </div>
                <Switch id="auto-logout" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base" htmlFor="audit-log">Audit logging</Label>
                  <p className="text-sm text-muted-foreground">Alle gebruikersacties loggen voor beveiliging</p>
                </div>
                <Switch id="audit-log" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base" htmlFor="two-factor">Twee-factor authenticatie vereisen</Label>
                  <p className="text-sm text-muted-foreground">Voor alle gebruikers 2FA verplicht maken</p>
                </div>
                <Switch id="two-factor" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end gap-4">
          <Button variant="outline">Annuleren</Button>
          <Button 
            className="bg-medical hover:bg-medical-accent"
            onClick={handleSaveSettings}
          >
            Wijzigingen opslaan
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPracticeSettings;
