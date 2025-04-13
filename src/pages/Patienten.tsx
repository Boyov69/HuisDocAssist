
import React from "react";
import PatientSearchBar from "@/components/patienten/PatientSearchBar";
import PatientTabs from "@/components/patienten/PatientTabs";
import { patients } from "@/data/patientData";

const Patienten = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2">Patiënten</h1>
        <p className="text-muted-foreground mb-6">
          Bekijk en beheer patiëntdossiers
        </p>
      </div>
      
      <PatientSearchBar />
      <PatientTabs patients={patients} />
    </div>
  );
};

export default Patienten;
