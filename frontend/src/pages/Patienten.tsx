
import React, { useState, useEffect, useCallback } from "react";
import { UserPlus } from "lucide-react";
import PatientSearchBar from "@/components/patienten/PatientSearchBar";
import PatientTabs from "@/components/patienten/PatientTabs";
import PatientRegistrationForm from "@/components/patienten/PatientRegistrationForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Patient } from "@/components/patienten/PatientCard";
import { toast } from "sonner";

const Patienten = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [activeTab, setActiveTab] = useState("overzicht");

  const fetchPatients = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3001/api/patients");
      if (!response.ok) {
        throw new Error("Patiëntgegevens konden niet worden geladen.");
      }
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  }, []);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const handleRegistrationSuccess = (newPatient: Patient) => {
    setPatients((prevPatients) => [...prevPatients, newPatient]);
    setActiveTab("overzicht");
    // Optionally, re-fetch the entire list to ensure data consistency
    // fetchPatients();
  };

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
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
              <PatientRegistrationForm onSuccess={handleRegistrationSuccess} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Patienten;
