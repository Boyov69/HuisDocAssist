
import { useState } from "react";
import { Phone, MessageSquare, Clock, User, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import AccordionCard from "@/components/AccordionCard";

const Telefoon = () => {
  const [activeCall, setActiveCall] = useState<boolean>(false);
  
  // Dummy data voor recente gesprekken
  const recentCalls = [
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
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2">Telefoongesprekken</h1>
        <p className="text-muted-foreground mb-6">
          Beheer inkomende telefoongesprekken met AI-ondersteuning
        </p>
      </div>
      
      <Card className={activeCall ? "border-medical" : ""}>
        <CardHeader className={`pb-2 ${activeCall ? "bg-medical-muted" : ""}`}>
          <CardTitle className="text-xl flex items-center">
            <Phone className="h-5 w-5 mr-2" />
            {activeCall ? "Actief gesprek" : "Telefooncentrale"}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {activeCall ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center">
                    <Badge className="bg-green-500 mr-2 animate-pulse">Live</Badge>
                    <h3 className="font-medium">Inkomend gesprek: 06-55443322</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Gestart om 09:32 • Duur: 01:24
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    In wacht
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => setActiveCall(false)}>
                    Ophangen
                  </Button>
                </div>
              </div>
              
              <div className="border rounded-md p-4 bg-gray-50 dark:bg-gray-800">
                <h4 className="font-medium mb-2 flex items-center">
                  <MessageSquare className="h-4 w-4 mr-2 text-medical" />
                  Live transcriptie
                </h4>
                <div className="text-sm space-y-2">
                  <p><span className="font-medium">Beller:</span> Goedemorgen, ik wil graag een afspraak maken bij de huisarts.</p>
                  <p><span className="font-medium">Assistente:</span> Goedemorgen, dat kan. Waar gaat het om?</p>
                  <p><span className="font-medium">Beller:</span> Ik heb al een paar dagen keelpijn en het wordt niet beter.</p>
                  <p><span className="font-medium">Assistente:</span> Heeft u ook koorts of andere klachten?</p>
                  <p className="animate-pulse border-l-2 border-medical pl-2">
                    <span className="font-medium">Beller:</span> Ja, ik voel me ook wat grieperig en...
                  </p>
                </div>
              </div>
              
              <div className="border rounded-md p-4">
                <h4 className="font-medium mb-2 flex items-center">
                  <Save className="h-4 w-4 mr-2 text-medical" />
                  Notities
                </h4>
                <Textarea 
                  placeholder="Notities over dit gesprek" 
                  className="min-h-[100px]"
                  defaultValue="Patient heeft keelpijn en voelt zich grieperig. Mogelijk griepverschijnselen."
                />
                
                <div className="mt-4 p-4 border rounded-md bg-medical-muted">
                  <h5 className="font-medium mb-2">AI-suggesties:</h5>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="bg-medical text-white text-xs px-2 py-0.5 rounded-full mr-2 mt-0.5">
                        Triage
                      </span>
                      <span>
                        Vraag naar duur van de klachten, koorts (gemeten temperatuur), hoesten, 
                        moeite met slikken, en of er contact is geweest met COVID-positieve personen.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-medical text-white text-xs px-2 py-0.5 rounded-full mr-2 mt-0.5">
                        Planning
                      </span>
                      <span>
                        Bij koorts &gt;38°C of aanhoudende klachten &gt;3 dagen: consult inplannen.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <Phone className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">Geen actieve gesprekken</h3>
              <p className="text-muted-foreground mb-6">
                Inkomende gesprekken verschijnen hier automatisch
              </p>
              <Button onClick={() => setActiveCall(true)} className="bg-medical hover:bg-medical-accent">
                Simuleer inkomend gesprek
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
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
                  <Button variant="outline" size="sm">
                    Bewerken
                  </Button>
                  <Button variant="outline" size="sm">
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
    </div>
  );
};

export default Telefoon;
