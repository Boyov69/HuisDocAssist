
import React from "react";
import { UserPlus } from "lucide-react";
import PatientSearchBar from "@/components/patienten/PatientSearchBar";
import PatientTabs from "@/components/patienten/PatientTabs";
import PatientRegistrationForm from "@/components/patienten/PatientRegistrationForm";
import { patients } from "@/data/patientData";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

const Patienten = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Patiënten</h1>
          <p className="text-muted-foreground">
            Bekijk, beheer en registreer patiëntdossiers
          </p>
        </div>
        
        <PatientSearchBar />
      </div>
      
      <Tabs defaultValue="overzicht" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overzicht">Patiëntenoverzicht</TabsTrigger>
          <TabsTrigger value="registratie">
            <UserPlus className="h-4 w-4 mr-2" />
            Nieuwe patiënt
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overzicht" className="space-y-4">
          <PatientTabs patients={patients} />
        </TabsContent>
        
        <TabsContent value="registratie">
          <Card>
            <CardContent className="pt-6">
              <PatientRegistrationForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Patienten;
