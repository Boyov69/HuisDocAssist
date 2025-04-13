
import React from "react";
import { Phone, User, Clock, MessageSquare, Save } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
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
  // Dummy data voor recente gesprekken
  const recentCalls: Call[] = [
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
  );
};

export default CallHistoryTabs;
