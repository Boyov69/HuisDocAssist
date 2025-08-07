
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import TriageForm from "@/components/triage/TriageForm";
import TriageResult from "@/components/triage/TriageResult";
import RecentTriages from "@/components/triage/RecentTriages";
import { analyzeSymptoms } from "@/utils/triageUtils";

const Triage = () => {
  const { toast } = useToast();
  const [triageResult, setTriageResult] = useState<null | {
    urgency: "laag" | "medium" | "hoog" | "spoed";
    advice: string;
    aiSuggestions: string[];
  }>(null);

  const handleTriage = (patientSearch: string, symptoms: string, category: string) => {
    if (!symptoms) {
      toast({
        title: "Ontbrekende informatie",
        description: "Vul de symptomen in om een triage uit te voeren",
        variant: "destructive"
      });
      return;
    }

    const result = analyzeSymptoms(symptoms, category);
    setTriageResult(result);
    
    toast({
      title: "Triage uitgevoerd",
      description: `${result.urgency.charAt(0).toUpperCase() + result.urgency.slice(1)} urgentie gedetecteerd.`,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2">Triage</h1>
        <p className="text-muted-foreground mb-6">
          AI-ondersteunde triage voor patiënten
        </p>
      </div>
      
      <TriageForm onSubmitTriage={handleTriage} />
      
      {triageResult && <TriageResult result={triageResult} />}
      
      <RecentTriages />
    </div>
  );
};

export default Triage;
