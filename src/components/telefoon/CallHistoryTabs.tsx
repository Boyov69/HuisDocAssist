
import React, { useState } from "react";
import { Phone, User, Clock, MessageSquare, Save, Check, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import AccordionCard from "@/components/AccordionCard";

interface Call {
  id: number;
  phoneNumber: string;
  caller: string;
  time: string;
  date: string;
  duration: string;
  notes: string;
  status: string;
  transcription: string;
}

const CallHistoryTabs = () => {
  const { toast } = useToast();
  const [editingCall, setEditingCall] = useState<Call | null>(null);
  const [editedNotes, setEditedNotes] = useState("");
  const [callbackDialogOpen, setCallbackDialogOpen] = useState(false);
  const [callbackNumber, setCallbackNumber] = useState("");
  const [callbackName, setCallbackName] = useState("");
  
  // Dummy data voor recente gesprekken
  const [recentCalls, setRecentCalls] = useState<Call[]>([
    {
      id: 1,
      phoneNumber: "06-12345678",
      caller: "Mevr. Smits",
      time: "08:45",
      date: "13 April 2025",
      duration: "3:24",
      notes: "Vraag over medicatie. Patient gebruikt diclofenac en vroeg of ze dit mag combineren met ibuprofen. Geadviseerd om dit niet te doen en contact op te nemen met apotheek voor alternatieven.",
      status: "completed",
      transcription: "Goedemorgen, met mevrouw Smits. Ik heb een vraag over mijn medicijnen. Ik gebruik diclofenac voor mijn knie, maar nu heb ik ook hoofdpijn. Mag ik daar ibuprofen voor nemen?"
    },
    {
      id: 2,
      phoneNumber: "06-87654321",
      caller: "Dhr. Janssen",
      time: "08:32",
      date: "13 April 2025",
      duration: "2:10",
      notes: "Wil afspraak van vrijdag verzetten naar volgende week dinsdag. Nieuwe afspraak ingepland voor 10:30.",
      status: "completed",
      transcription: "Goedemorgen, u spreekt met meneer Janssen. Ik heb een afspraak staan voor aanstaande vrijdag, maar ik kan dan helaas niet. Kan ik deze verzetten naar volgende week dinsdag?"
    },
    {
      id: 3,
      phoneNumber: "070-1234567",
      caller: "Apotheek",
      time: "08:15",
      date: "13 April 2025",
      duration: "4:45",
      notes: "Overleg over recept van Dhr. Pietersen. Dosering aangepast na overleg met huisarts.",
      status: "completed",
      transcription: "Goedemorgen, u spreekt met apotheker de Vries van Apotheek Centrum. Ik bel over het recept van meneer Pietersen. De dosering lijkt niet te kloppen."
    }
  ]);

  const handleEditClick = (call: Call) => {
    setEditingCall(call);
    setEditedNotes(call.notes);
  };

  const saveEditedNotes = () => {
    if (!editingCall) return;
    
    const updatedCalls = recentCalls.map(call => {
      if (call.id === editingCall.id) {
        return { ...call, notes: editedNotes };
      }
      return call;
    });
    
    setRecentCalls(updatedCalls);
    setEditingCall(null);
    
    toast({
      title: "Notities bijgewerkt",
      description: "De notities zijn succesvol opgeslagen.",
    });
  };

  const handleCallbackClick = (call: Call) => {
    setCallbackDialogOpen(true);
    setCallbackNumber(call.phoneNumber);
    setCallbackName(call.caller);
  };

  const startCallback = () => {
    // Hier zou in een echte implementatie de terugbel-functionaliteit worden gestart
    setCallbackDialogOpen(false);
    
    toast({
      title: "Terugbellen gestart",
      description: `${callbackName} (${callbackNumber}) wordt nu gebeld.`,
    });
  };

  return (
    <>
      <Tabs defaultValue="recent" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="recent">Recente gesprekken</TabsTrigger>
          <TabsTrigger value="missed">Gemiste gesprekken</TabsTrigger>
          <TabsTrigger value="all">Alle gesprekken</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recent" className="space-y-4">
          {recentCalls.map((call) => (
            <AccordionCard
              key={call.id}
              title={`${call.time} - ${call.caller} (${call.phoneNumber})`}
              icon={<Phone className="h-5 w-5" />}
            >
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center mb-2">
                      <User className="h-4 w-4 mr-2 text-medical" />
                      <span className="font-medium">Beller</span>
                    </div>
                    <p className="text-sm text-muted-foreground ml-6">
                      {call.caller} ({call.phoneNumber})
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-2">
                      <Clock className="h-4 w-4 mr-2 text-medical" />
                      <span className="font-medium">Tijdstip & Duur</span>
                    </div>
                    <p className="text-sm text-muted-foreground ml-6">
                      {call.time}, {call.date} ({call.duration})
                    </p>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center mb-2">
                    <MessageSquare className="h-4 w-4 mr-2 text-medical" />
                    <span className="font-medium">Transcriptie</span>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md text-sm">
                    {call.transcription}
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center mb-2">
                    <Save className="h-4 w-4 mr-2 text-medical" />
                    <span className="font-medium">Notities</span>
                  </div>
                  <p className="text-sm text-muted-foreground ml-6">
                    {call.notes}
                  </p>
                </div>
                
                <div className="flex items-center justify-end space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEditClick(call)}
                  >
                    Bewerken
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleCallbackClick(call)}
                  >
                    Terugbellen
                  </Button>
                  <Button size="sm" className="bg-medical hover:bg-medical-accent">
                    Toevoegen aan dossier
                  </Button>
                </div>
              </div>
            </AccordionCard>
          ))}
        </TabsContent>
        
        <TabsContent value="missed">
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground text-center py-6">
                Geen gemiste gesprekken vandaag.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="all">
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground mb-4">
                Historie van alle telefoongesprekken.
              </p>
              <div className="text-center py-10">
                <p>Functionaliteit in ontwikkeling</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog voor het bewerken van notities */}
      {editingCall && (
        <Dialog open={!!editingCall} onOpenChange={(open) => !open && setEditingCall(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Notities bewerken</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex items-center space-x-2 text-sm">
                <span className="font-medium">Gesprek met:</span>
                <span>{editingCall.caller} ({editingCall.phoneNumber})</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <span className="font-medium">Tijdstip:</span>
                <span>{editingCall.time}, {editingCall.date}</span>
              </div>
              <Textarea 
                value={editedNotes} 
                onChange={e => setEditedNotes(e.target.value)}
                className="min-h-[120px]"
                placeholder="Voer notities in over dit gesprek"
              />
            </div>
            <DialogFooter className="flex space-x-2 justify-end">
              <Button 
                variant="outline" 
                onClick={() => setEditingCall(null)}
              >
                <X className="mr-2 h-4 w-4" />
                Annuleren
              </Button>
              <Button 
                className="bg-medical hover:bg-medical-accent"
                onClick={saveEditedNotes}
              >
                <Check className="mr-2 h-4 w-4" />
                Opslaan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Dialog voor terugbellen */}
      <Dialog open={callbackDialogOpen} onOpenChange={setCallbackDialogOpen}>
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
              onClick={() => setCallbackDialogOpen(false)}
            >
              <X className="mr-2 h-4 w-4" />
              Annuleren
            </Button>
            <Button 
              className="bg-medical hover:bg-medical-accent"
              onClick={startCallback}
            >
              <Phone className="mr-2 h-4 w-4" />
              Bellen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CallHistoryTabs;
