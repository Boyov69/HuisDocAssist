
import React from "react";
import { Phone } from "lucide-react";
import AccordionCard from "@/components/AccordionCard";

const RecentCalls = () => {
  return (
    <AccordionCard 
      title="Recente telefoongesprekken" 
      icon={<Phone className="h-5 w-5" />}
      className="mt-4"
    >
      <div className="space-y-4">
        <div className="border-b pb-2">
          <div className="flex justify-between mb-1">
            <div className="font-medium">08:45 - 06-12345678</div>
            <div className="text-sm text-gray-500">2 min. geleden</div>
          </div>
          <div className="text-sm text-muted-foreground">Mevr. Smits - Vraag over medicatie</div>
        </div>
        
        <div className="border-b pb-2">
          <div className="flex justify-between mb-1">
            <div className="font-medium">08:32 - 06-87654321</div>
            <div className="text-sm text-gray-500">15 min. geleden</div>
          </div>
          <div className="text-sm text-muted-foreground">Dhr. Janssen - Afspraak verzetten</div>
        </div>
        
        <div className="border-b pb-2">
          <div className="flex justify-between mb-1">
            <div className="font-medium">08:15 - 070-1234567</div>
            <div className="text-sm text-gray-500">32 min. geleden</div>
          </div>
          <div className="text-sm text-muted-foreground">Apotheek - Overleg over recept</div>
        </div>
        
        <div className="text-center mt-4">
          <button className="text-sm text-medical hover:underline">
            Alle telefoongesprekken bekijken
          </button>
        </div>
      </div>
    </AccordionCard>
  );
};

export default RecentCalls;
