
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { BellRing, Mail, Smartphone, Calendar, Clock, MessageSquare, AlertOctagon } from "lucide-react";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const NotificationsSettingsTab = () => {
  const [saved, setSaved] = useState(false);
  
  const handleSave = () => {
    setSaved(true);
    toast.success("Notificatie-instellingen opgeslagen");
    setTimeout(() => setSaved(false), 3000);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notificatie-instellingen</CardTitle>
        <CardDescription>
          Configureer wanneer en hoe u notificaties wilt ontvangen
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="enable-notifications" className="text-base font-medium">Notificaties inschakelen</Label>
              <p className="text-sm text-muted-foreground">Schakel alle notificaties in of uit</p>
            </div>
            <Switch id="enable-notifications" defaultChecked />
          </div>
          
          <div className="border-t pt-4">
            <h3 className="text-lg font-medium mb-4">Notificatiekanalen</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-medical" />
                  <Label htmlFor="email-notifications" className="font-medium">E-mailnotificaties</Label>
                </div>
                <Switch id="email-notifications" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-medical" />
                  <Label htmlFor="push-notifications" className="font-medium">Push-notificaties</Label>
                </div>
                <Switch id="push-notifications" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BellRing className="h-5 w-5 text-medical" />
                  <Label htmlFor="in-app-notifications" className="font-medium">In-app notificaties</Label>
                </div>
                <Switch id="in-app-notifications" defaultChecked />
              </div>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <h3 className="text-lg font-medium mb-4">Notificatietypen</h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-medical" />
                  <Label className="font-medium">Afspraken</Label>
                </div>
                
                <div className="ml-7 space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="new-appointment">Nieuwe afspraak</Label>
                    <Switch id="new-appointment" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="appointment-reminder">Afspraakherinnering</Label>
                    <Switch id="appointment-reminder" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="appointment-cancelled">Afspraak geannuleerd</Label>
                    <Switch id="appointment-cancelled" defaultChecked />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-medical" />
                  <Label className="font-medium">Telefoongesprekken</Label>
                </div>
                
                <div className="ml-7 space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="missed-calls">Gemiste oproepen</Label>
                    <Switch id="missed-calls" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="voicemail">Nieuwe voicemail</Label>
                    <Switch id="voicemail" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="call-notes">Gespreksnotities</Label>
                    <Switch id="call-notes" defaultChecked />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <AlertOctagon className="h-5 w-5 text-medical" />
                  <Label className="font-medium">Triage</Label>
                </div>
                
                <div className="ml-7 space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="high-urgency">Hoge urgentie</Label>
                    <Switch id="high-urgency" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="new-triage">Nieuwe triage</Label>
                    <Switch id="new-triage" defaultChecked />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <h3 className="text-lg font-medium mb-4">Notificatiefrequentie</h3>
            
            <RadioGroup defaultValue="real-time">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="real-time" id="real-time" />
                <Label htmlFor="real-time">Real-time (direct)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hourly" id="hourly" />
                <Label htmlFor="hourly">Elk uur (verzameld)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="daily" id="daily" />
                <Label htmlFor="daily">Dagelijks (samenvatting)</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="border-t pt-4">
            <h3 className="text-lg font-medium mb-4">Niet storen</h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-medical" />
                <Label className="font-medium">Tijden waarop u geen notificaties wilt ontvangen</Label>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Van</Label>
                  <Input type="time" defaultValue="18:00" />
                </div>
                <div className="space-y-2">
                  <Label>Tot</Label>
                  <Input type="time" defaultValue="08:00" />
                </div>
              </div>
              
              <div>
                <div className="flex items-center space-x-2">
                  <Switch id="weekend-dnd" defaultChecked />
                  <Label htmlFor="weekend-dnd">Weekend niet storen</Label>
                </div>
                <p className="text-sm text-muted-foreground ml-7">Geen notificaties in het weekend</p>
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
  );
};

export default NotificationsSettingsTab;
