
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import PatientList from "./PatientList";
import { Patient } from "./PatientCard";

interface PatientTabsProps {
  patients: Patient[];
}

const PatientTabs = ({ patients }: PatientTabsProps) => {
  return (
    <Tabs defaultValue="recent" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="recent">Recent bezocht</TabsTrigger>
        <TabsTrigger value="all">Alle patiënten</TabsTrigger>
        <TabsTrigger value="appointments">Met afspraken</TabsTrigger>
      </TabsList>
      
      <TabsContent value="recent" className="space-y-4">
        <PatientList patients={patients} />
      </TabsContent>
      
      <TabsContent value="all">
        <Card>
          <CardContent className="p-6">
            <div className="text-center py-6">
              <p className="text-muted-foreground mb-6">
                Alle patiënten in het systeem.
              </p>
              <p>Functionaliteit in ontwikkeling</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="appointments">
        <Card>
          <CardContent className="p-6">
            <div className="text-center py-6">
              <p className="text-muted-foreground mb-6">
                Patiënten met geplande afspraken.
              </p>
              <p>Functionaliteit in ontwikkeling</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default PatientTabs;
