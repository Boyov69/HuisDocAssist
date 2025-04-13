
import React from "react";
import { Calendar } from "lucide-react";
import AccordionCard from "@/components/AccordionCard";

const DashboardAppointments = () => {
  return (
    <AccordionCard 
      title="Afspraken vandaag" 
      icon={<Calendar className="h-5 w-5" />}
      defaultOpen={true}
    >
      <div className="space-y-4">
        <div className="border-b pb-2">
          <div className="flex justify-between mb-1">
            <div className="font-medium">09:00 - Dhr. van Veen</div>
            <div className="text-sm text-medical">Controle</div>
          </div>
          <div className="text-sm text-muted-foreground">Diabetes type 2 controle</div>
        </div>
        
        <div className="border-b pb-2">
          <div className="flex justify-between mb-1">
            <div className="font-medium">09:15 - Mevr. Jansen</div>
            <div className="text-sm text-medical">Consult</div>
          </div>
          <div className="text-sm text-muted-foreground">Hoofdpijn, duizeligheid</div>
        </div>
        
        <div className="border-b pb-2">
          <div className="flex justify-between mb-1">
            <div className="font-medium">09:30 - Kim de Vries</div>
            <div className="text-sm text-medical">Consult</div>
          </div>
          <div className="text-sm text-muted-foreground">Huiduitslag</div>
        </div>
        
        <div className="border-b pb-2">
          <div className="flex justify-between mb-1">
            <div className="font-medium">09:45 - Dhr. Bakker</div>
            <div className="text-sm text-medical">Controle</div>
          </div>
          <div className="text-sm text-muted-foreground">Bloeddruk controle</div>
        </div>
        
        <div className="text-center mt-4">
          <button className="text-sm text-medical hover:underline">
            Alle afspraken bekijken
          </button>
        </div>
      </div>
    </AccordionCard>
  );
};

export default DashboardAppointments;
