
import React from "react";
import { Settings } from "lucide-react";
import AccordionCard from "@/components/AccordionCard";

const PracticeInfo = () => {
  return (
    <AccordionCard 
      title="Praktijkinstellingen" 
      icon={<Settings className="h-5 w-5" />}
      className="mt-4"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-1">Praktijkinformatie</h4>
            <p className="text-sm text-muted-foreground">
              Huisartsenpraktijk Gezond<br />
              Medischstraat 123<br />
              1234 AB Amsterdam<br />
              020-1234567
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-1">Openingstijden</h4>
            <p className="text-sm text-muted-foreground">
              Maandag - Vrijdag: 08:00 - 17:00<br />
              Zaterdag: Gesloten<br />
              Zondag: Gesloten
            </p>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium mb-1">Spoednummer</h4>
          <p className="text-sm text-muted-foreground">
            Bij spoed buiten openingstijden: 020-7654321
          </p>
        </div>
      </div>
    </AccordionCard>
  );
};

export default PracticeInfo;
