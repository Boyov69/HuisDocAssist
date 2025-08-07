
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface PracticeSettingsTabProps {
  onSave: () => void;
  saved: boolean;
}

const PracticeSettingsTab = ({ onSave, saved }: PracticeSettingsTabProps) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Praktijkgegevens</CardTitle>
          <CardDescription>
            Beheer de basisgegevens van uw praktijk
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="practice-name">Praktijknaam</Label>
              <Input id="practice-name" defaultValue="Huisartsenpraktijk Gezond" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="practice-code">Praktijkcode (AGB)</Label>
              <Input id="practice-code" defaultValue="12345678" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="practice-address">Adres</Label>
            <Input id="practice-address" defaultValue="Medischstraat 123" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="practice-postal">Postcode</Label>
              <Input id="practice-postal" defaultValue="1234 AB" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="practice-city">Plaats</Label>
              <Input id="practice-city" defaultValue="Amsterdam" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="practice-phone">Telefoonnummer</Label>
              <Input id="practice-phone" defaultValue="020-1234567" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="practice-email">E-mailadres</Label>
              <Input id="practice-email" defaultValue="info@huisartsgezond.nl" type="email" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="practice-description">Praktijkomschrijving</Label>
            <Textarea 
              id="practice-description" 
              defaultValue="Huisartsenpraktijk Gezond biedt persoonlijke en professionele zorg voor alle patiënten. Onze praktijk is gericht op preventie en een holistische benadering van gezondheid."
              className="min-h-[100px]"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Annuleren</Button>
          <Button className="bg-medical hover:bg-medical-accent" onClick={onSave}>
            {saved ? "Opgeslagen!" : "Wijzigingen opslaan"}
          </Button>
        </CardFooter>
      </Card>
      
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Openingstijden</CardTitle>
          <CardDescription>
            Stel de openingstijden van uw praktijk in
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="font-medium">Dag</div>
              <div className="font-medium">Van</div>
              <div className="font-medium">Tot</div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 items-center">
              <div>Maandag</div>
              <Input type="time" defaultValue="08:00" />
              <Input type="time" defaultValue="17:00" />
            </div>
            
            <div className="grid grid-cols-3 gap-4 items-center">
              <div>Dinsdag</div>
              <Input type="time" defaultValue="08:00" />
              <Input type="time" defaultValue="17:00" />
            </div>
            
            <div className="grid grid-cols-3 gap-4 items-center">
              <div>Woensdag</div>
              <Input type="time" defaultValue="08:00" />
              <Input type="time" defaultValue="17:00" />
            </div>
            
            <div className="grid grid-cols-3 gap-4 items-center">
              <div>Donderdag</div>
              <Input type="time" defaultValue="08:00" />
              <Input type="time" defaultValue="17:00" />
            </div>
            
            <div className="grid grid-cols-3 gap-4 items-center">
              <div>Vrijdag</div>
              <Input type="time" defaultValue="08:00" />
              <Input type="time" defaultValue="17:00" />
            </div>
            
            <div className="grid grid-cols-3 gap-4 items-center">
              <div>Zaterdag</div>
              <div className="col-span-2">
                <div className="flex items-center space-x-2">
                  <Switch id="saturday-closed" defaultChecked />
                  <Label htmlFor="saturday-closed">Gesloten</Label>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 items-center">
              <div>Zondag</div>
              <div className="col-span-2">
                <div className="flex items-center space-x-2">
                  <Switch id="sunday-closed" defaultChecked />
                  <Label htmlFor="sunday-closed">Gesloten</Label>
                </div>
              </div>
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
    </>
  );
};

export default PracticeSettingsTab;
