
import { useState } from "react";
import { Settings, User, Lock, BellRing, Building, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

const Instellingen = () => {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);
  
  const handleSave = () => {
    // Simulate saving
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2">Instellingen</h1>
        <p className="text-muted-foreground mb-6">
          Beheer praktijk- en applicatie-instellingen
        </p>
      </div>
      
      <Tabs defaultValue="practice" className="w-full">
        <TabsList className="mb-4 grid grid-cols-1 md:grid-cols-5">
          <TabsTrigger value="practice" className="flex items-center">
            <Building className="h-4 w-4 mr-2" />
            Praktijk
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center">
            <User className="h-4 w-4 mr-2" />
            Gebruikers
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center">
            <BellRing className="h-4 w-4 mr-2" />
            Notificaties
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center">
            <Lock className="h-4 w-4 mr-2" />
            Beveiliging
          </TabsTrigger>
          <TabsTrigger value="ai" className="flex items-center">
            <Headphones className="h-4 w-4 mr-2" />
            AI-assistent
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="practice">
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
              <Button className="bg-medical hover:bg-medical-accent" onClick={handleSave}>
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
              <Button className="bg-medical hover:bg-medical-accent" onClick={handleSave}>
                {saved ? "Opgeslagen!" : "Wijzigingen opslaan"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Gebruikersbeheer</CardTitle>
              <CardDescription>
                Beheer alle gebruikers van de praktijk
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <p>Functionaliteit in ontwikkeling</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notificatie-instellingen</CardTitle>
              <CardDescription>
                Configureer wanneer en hoe u notificaties wilt ontvangen
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <p>Functionaliteit in ontwikkeling</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Beveiligingsinstellingen</CardTitle>
              <CardDescription>
                Configureer beveiligingsopties voor uw praktijk
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <p>Functionaliteit in ontwikkeling</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ai">
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
              <Button className="bg-medical hover:bg-medical-accent" onClick={handleSave}>
                {saved ? "Opgeslagen!" : "Wijzigingen opslaan"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Instellingen;
