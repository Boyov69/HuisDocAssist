
import { Save } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const NotesSection = () => {
  return (
    <div className="border rounded-md p-4">
      <h4 className="font-medium mb-2 flex items-center">
        <Save className="h-4 w-4 mr-2 text-medical" />
        Notities
      </h4>
      <Textarea 
        placeholder="Notities over dit gesprek" 
        className="min-h-[100px]"
        defaultValue="Patient heeft keelpijn en voelt zich grieperig. Mogelijk griepverschijnselen."
      />
      
      <div className="mt-4 p-4 border rounded-md bg-medical-muted">
        <h5 className="font-medium mb-2">AI-suggesties:</h5>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start">
            <span className="bg-medical text-white text-xs px-2 py-0.5 rounded-full mr-2 mt-0.5">
              Triage
            </span>
            <span>
              Vraag naar duur van de klachten, koorts (gemeten temperatuur), hoesten, 
              moeite met slikken, en of er contact is geweest met COVID-positieve personen.
            </span>
          </li>
          <li className="flex items-start">
            <span className="bg-medical text-white text-xs px-2 py-0.5 rounded-full mr-2 mt-0.5">
              Planning
            </span>
            <span>
              Bij koorts &gt;38°C of aanhoudende klachten &gt;3 dagen: consult inplannen.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NotesSection;
