
import { AlertTriangle, CheckCircle, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TriageResultProps {
  result: {
    urgency: "laag" | "medium" | "hoog" | "spoed";
    advice: string;
    aiSuggestions: string[];
  };
}

const TriageResult = ({ result }: TriageResultProps) => {
  const getUrgencyColor = (urgency: string | undefined) => {
    switch(urgency) {
      case "spoed": return "bg-red-500";
      case "hoog": return "bg-orange-500";
      case "medium": return "bg-yellow-500";
      case "laag": return "bg-green-500";
      default: return "bg-slate-500";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Triage resultaat</CardTitle>
          <Badge className={`${getUrgencyColor(result.urgency)}`}>
            {result.urgency === "spoed" && <AlertTriangle className="h-3 w-3 mr-1" />}
            {result.urgency === "laag" && <CheckCircle className="h-3 w-3 mr-1" />}
            {result.urgency.charAt(0).toUpperCase() + result.urgency.slice(1)} urgentie
          </Badge>
        </div>
        <CardDescription>
          AI-gebaseerde analyse van de beschreven symptomen
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-medium mb-2">Advies</h3>
          <p>{result.advice}</p>
        </div>
        
        <div>
          <h3 className="flex items-center font-medium mb-2">
            <Brain className="h-4 w-4 mr-2 text-medical" />
            AI-suggesties voor vervolgvragen
          </h3>
          <ul className="list-disc pl-5 space-y-1">
            {result.aiSuggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>
        
        <div className="bg-medical-muted p-4 rounded-md">
          <h3 className="font-medium mb-2">Disclaimer</h3>
          <p className="text-sm">
            Deze triage is een hulpmiddel en is bedoeld ter ondersteuning van de besluitvorming. 
            De uiteindelijke beoordeling dient altijd door een medisch professional te gebeuren.
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline">
          Opslaan in patiëntendossier
        </Button>
        <Button className="bg-medical hover:bg-medical-accent">
          Afspraak inplannen
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TriageResult;
