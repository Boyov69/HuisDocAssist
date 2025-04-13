
import React from "react";
import { Calendar, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PatientRegistrationDialog from "@/components/patienten/PatientRegistrationDialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import AppointmentsList from "@/components/appointments/AppointmentsList";
import WeeklyOverview from "@/components/appointments/WeeklyOverview";
import NewAppointmentForm from "@/components/appointments/NewAppointmentForm";
import CalendarView from "@/components/appointments/CalendarView";
import { appointments, weekData } from "@/data/appointmentData";
import { toast } from "@/hooks/use-toast";

const Afspraken = () => {
  const handleAppointmentCreated = () => {
    toast({
      title: "Afspraak gepland",
      description: "De afspraak is succesvol ingepland.",
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2">Afspraken</h1>
        <p className="text-muted-foreground mb-6">
          Beheer alle afspraken in uw praktijk
        </p>
      </div>

      <div className="flex justify-end mb-4 gap-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button className="bg-medical hover:bg-medical-accent">
              Nieuwe afspraak
            </Button>
          </SheetTrigger>
          <SheetContent className="sm:max-w-lg">
            <SheetHeader>
              <SheetTitle>Nieuwe afspraak plannen</SheetTitle>
              <SheetDescription>
                Selecteer een patiënt of registreer een nieuwe patiënt om een afspraak te plannen.
              </SheetDescription>
            </SheetHeader>
            
            <NewAppointmentForm onSuccess={handleAppointmentCreated} />
          </SheetContent>
        </Sheet>
        
        <PatientRegistrationDialog 
          triggerText="Nieuwe patiënt"
          buttonVariant="outline"
        />
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
              <AppointmentsList 
                appointments={appointments} 
                date="13 April 2025" 
              />
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
              
              <WeeklyOverview weekData={weekData} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Kalender</CardTitle>
            </CardHeader>
            <CardContent>
              <CalendarView />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Afspraken;
