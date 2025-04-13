
import { Calendar, Clock, User, FileText } from "lucide-react";
import AccordionCard from "@/components/AccordionCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Afspraken = () => {
  // Dummy afspraken data
  const appointments = [
    {
      id: 1,
      patient: "Dhr. van Veen",
      time: "09:00",
      date: "13 April 2025",
      type: "Controle",
      notes: "Diabetes type 2 controle. Laatste HbA1c was 53 mmol/mol.",
      status: "confirmed"
    },
    {
      id: 2,
      patient: "Mevr. Jansen",
      time: "09:15",
      date: "13 April 2025",
      type: "Consult",
      notes: "Hoofdpijn, duizeligheid. Klachten sinds 2 weken.",
      status: "confirmed"
    },
    {
      id: 3,
      patient: "Kim de Vries",
      time: "09:30",
      date: "13 April 2025",
      type: "Consult",
      notes: "Huiduitslag op armen en benen. Mogelijk allergische reactie.",
      status: "confirmed"
    },
    {
      id: 4,
      patient: "Dhr. Bakker",
      time: "09:45",
      date: "13 April 2025",
      type: "Controle",
      notes: "Bloeddruk controle. Gebruikt metoprolol 50mg 1dd1.",
      status: "confirmed"
    },
    {
      id: 5,
      patient: "Mevr. Visser",
      time: "10:00",
      date: "13 April 2025",
      type: "Consult",
      notes: "Rugpijn, uitstralend naar linkerbeen.",
      status: "pending"
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2">Afspraken</h1>
        <p className="text-muted-foreground mb-6">
          Beheer alle afspraken in uw praktijk
        </p>
      </div>

      <div className="flex justify-end mb-4">
        <Button className="bg-medical hover:bg-medical-accent">
          Nieuwe afspraak
        </Button>
      </div>

      <Tabs defaultValue="today" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="today">Vandaag</TabsTrigger>
          <TabsTrigger value="tomorrow">Morgen</TabsTrigger>
          <TabsTrigger value="week">Deze week</TabsTrigger>
          <TabsTrigger value="calendar">Kalender</TabsTrigger>
        </TabsList>
        
        <TabsContent value="today" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">13 April 2025</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <AccordionCard
                    key={appointment.id}
                    title={`${appointment.time} - ${appointment.patient}`}
                    icon={<Clock className="h-5 w-5" />}
                  >
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="flex items-center mb-2">
                            <User className="h-4 w-4 mr-2 text-medical" />
                            <span className="font-medium">Patiënt</span>
                          </div>
                          <p className="text-sm text-muted-foreground ml-6">
                            {appointment.patient}
                          </p>
                        </div>
                        
                        <div>
                          <div className="flex items-center mb-2">
                            <Clock className="h-4 w-4 mr-2 text-medical" />
                            <span className="font-medium">Tijd</span>
                          </div>
                          <p className="text-sm text-muted-foreground ml-6">
                            {appointment.time}, {appointment.date}
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center mb-2">
                          <FileText className="h-4 w-4 mr-2 text-medical" />
                          <span className="font-medium">Type & Notities</span>
                        </div>
                        <p className="text-sm ml-6">
                          <span className="text-medical font-medium">{appointment.type}</span>
                        </p>
                        <p className="text-sm text-muted-foreground ml-6 mt-1">
                          {appointment.notes}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          Verzetten
                        </Button>
                        <Button variant="outline" size="sm">
                          Annuleren
                        </Button>
                        <Button size="sm" className="bg-medical hover:bg-medical-accent">
                          Patiëntdossier
                        </Button>
                      </div>
                    </div>
                  </AccordionCard>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tomorrow">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">14 April 2025</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-8">
                Nog geen afspraken voor morgen.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="week">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Deze week</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Overzicht van alle afspraken deze week.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Maandag, 13 April 2025</h3>
                  <div className="border-l-2 border-medical pl-4 ml-2 space-y-2">
                    <p className="text-sm">09:00 - Dhr. van Veen (Controle)</p>
                    <p className="text-sm">09:15 - Mevr. Jansen (Consult)</p>
                    <p className="text-sm">09:30 - Kim de Vries (Consult)</p>
                    <p className="text-sm">09:45 - Dhr. Bakker (Controle)</p>
                    <p className="text-sm">10:00 - Mevr. Visser (Consult)</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Dinsdag, 14 April 2025</h3>
                  <div className="border-l-2 border-gray-200 pl-4 ml-2">
                    <p className="text-sm text-muted-foreground">Geen afspraken</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Woensdag, 15 April 2025</h3>
                  <div className="border-l-2 border-medical pl-4 ml-2 space-y-2">
                    <p className="text-sm">10:15 - Familie Aalbers (Consult)</p>
                    <p className="text-sm">10:30 - Dhr. de Jong (Controle)</p>
                    <p className="text-sm">10:45 - Mevr. Kuipers (Consult)</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Donderdag, 16 April 2025</h3>
                  <div className="border-l-2 border-medical pl-4 ml-2 space-y-2">
                    <p className="text-sm">09:00 - Mevr. van Dam (Consult)</p>
                    <p className="text-sm">09:15 - Dhr. Smit (Controle)</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Vrijdag, 17 April 2025</h3>
                  <div className="border-l-2 border-medical pl-4 ml-2 space-y-2">
                    <p className="text-sm">11:00 - Sanne Vermeer (Consult)</p>
                    <p className="text-sm">11:15 - Dhr. Bos (Controle)</p>
                    <p className="text-sm">11:30 - Familie Koning (Consult)</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Kalender</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-20">
                <Calendar className="h-16 w-16 mx-auto mb-4 text-medical" />
                <p>Kalender weergave is in ontwikkeling</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Afspraken;
