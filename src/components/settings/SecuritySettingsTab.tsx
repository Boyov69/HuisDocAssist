
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ShieldIcon, KeyIcon, SmartphoneIcon, FingerprintIcon, AlertTriangleIcon } from "lucide-react";
import { toast } from "sonner";

const SecuritySettingsTab = () => {
  const [saved, setSaved] = useState(false);
  
  const handleSave = () => {
    setSaved(true);
    toast.success("Beveiligingsinstellingen opgeslagen");
    setTimeout(() => setSaved(false), 3000);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Beveiligingsinstellingen</CardTitle>
        <CardDescription>
          Configureer beveiligingsopties voor uw praktijk
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center">
            <ShieldIcon className="mr-2 h-5 w-5 text-medical" />
            Wachtwoordbeleid
          </h3>
          
          <div className="space-y-2 ml-7">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="min-length">Minimale wachtwoordlengte</Label>
              </div>
              <div className="w-16">
                <Input id="min-length" type="number" defaultValue="8" min="8" max="20" />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="require-uppercase">Hoofdletter vereist</Label>
              </div>
              <Switch id="require-uppercase" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="require-number">Cijfer vereist</Label>
              </div>
              <Switch id="require-number" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="require-special">Speciaal teken vereist</Label>
              </div>
              <Switch id="require-special" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="expiry-days">Wachtwoord verloopt na (dagen)</Label>
              </div>
              <div className="w-16">
                <Input id="expiry-days" type="number" defaultValue="90" min="30" max="365" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center">
            <KeyIcon className="mr-2 h-5 w-5 text-medical" />
            Twee-factor authenticatie (2FA)
          </h3>
          
          <div className="space-y-4 ml-7">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="require-2fa" className="font-medium">2FA verplicht voor alle gebruikers</Label>
                <p className="text-sm text-muted-foreground">Alle gebruikers moeten twee-factor authenticatie instellen</p>
              </div>
              <Switch id="require-2fa" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-md p-4 flex items-start space-x-4">
                <SmartphoneIcon className="h-5 w-5 mt-1 text-medical" />
                <div>
                  <h4 className="font-medium mb-1">Authenticator app</h4>
                  <p className="text-sm text-muted-foreground">
                    Gebruik een authenticator app zoals Google Authenticator of Microsoft Authenticator
                  </p>
                  <div className="mt-2">
                    <Switch id="allow-app" defaultChecked />
                    <Label htmlFor="allow-app" className="ml-2">Ingeschakeld</Label>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-md p-4 flex items-start space-x-4">
                <FingerprintIcon className="h-5 w-5 mt-1 text-medical" />
                <div>
                  <h4 className="font-medium mb-1">Biometrische authenticatie</h4>
                  <p className="text-sm text-muted-foreground">
                    Gebruik vingerafdruk of gezichtsherkenning op ondersteunde apparaten
                  </p>
                  <div className="mt-2">
                    <Switch id="allow-biometric" defaultChecked />
                    <Label htmlFor="allow-biometric" className="ml-2">Ingeschakeld</Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center">
            <AlertTriangleIcon className="mr-2 h-5 w-5 text-medical" />
            Aanvullende beveiligingsopties
          </h3>
          
          <div className="space-y-2 ml-7">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="session-timeout" className="font-medium">Sessie time-out (minuten)</Label>
                <p className="text-sm text-muted-foreground">Automatisch uitloggen na inactiviteit</p>
              </div>
              <div className="w-16">
                <Input id="session-timeout" type="number" defaultValue="30" min="5" max="120" />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="ip-restriction" className="font-medium">IP-restricties</Label>
                <p className="text-sm text-muted-foreground">Beperk toegang tot specifieke IP-adressen</p>
              </div>
              <Switch id="ip-restriction" />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="failed-attempts" className="font-medium">Maximum aantal mislukte inlogpogingen</Label>
                <p className="text-sm text-muted-foreground">Account tijdelijk blokkeren na x mislukte pogingen</p>
              </div>
              <div className="w-16">
                <Input id="failed-attempts" type="number" defaultValue="5" min="3" max="10" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 p-4 rounded-md">
          <h4 className="font-medium text-amber-800 dark:text-amber-300 mb-2">AVG/GDPR Compliance</h4>
          <p className="text-sm text-amber-700 dark:text-amber-400">
            Zorg ervoor dat uw beveiligingsinstellingen voldoen aan de AVG/GDPR regelgeving. 
            Raadpleeg een beveiligingsexpert voor advies op maat voor uw praktijk.
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Annuleren</Button>
        <Button className="bg-medical hover:bg-medical-accent" onClick={handleSave}>
          {saved ? "Opgeslagen!" : "Wijzigingen opslaan"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SecuritySettingsTab;
