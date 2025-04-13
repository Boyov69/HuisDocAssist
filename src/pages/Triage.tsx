
import { useState } from "react";
import { AlertTriangle, CheckCircle, ClipboardList, Search, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Triage = () => {
  const [patientSearch, setPatientSearch] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [category, setCategory] = useState("");
  const [triageResult, setTriageResult] = useState<null | {
    urgency: "laag" | "medium" | "hoog" | "spoed";
    advice: string;
    aiSuggestions: string[];
  }>(null);

  const handleTriage = () => {
    // Fake triage analysis based on symptoms
    let urgency: "laag" | "medium" | "hoog" | "spoed" = "laag";
    let advice = "";
    let aiSuggestions = [];
    
    const symptomText = symptoms.toLowerCase();
    
    if (symptomText.includes("pijn op de borst") || 
        symptomText.includes("kortademig") || 
        symptomText.includes("bewusteloos")) {
      urgency = "spoed";
      advice = "Directe medische hulp nodig. Bel 112 of stuur patiënt naar spoedeisende hulp.";
      aiSuggestions = [
        "Vraag naar uitstraling van pijn naar arm, kaak of rug",
        "Controleer ademhaling en bewustzijn",
        "Vraag naar transpireren, misselijkheid, duizeligheid"
      ];
    } else if (symptomText.includes("koorts") && 
               (symptomText.includes("uitslag") || symptomText.includes("stijve nek"))) {
      urgency = "hoog";
      advice = "Dezelfde dag consult inplannen bij huisarts.";
      aiSuggestions = [
        "Controleer op meningitis symptomen: lichtgevoeligheid, hoofdpijn, nekstijfheid",
        "Vraag naar exacte temperatuur (wanneer gemeten)",
        "Vraag naar recente reizen of contact met zieken"
      ];
    } else if (symptomText.includes("hoofdpijn") && symptomText.includes("dagen")) {
      urgency = "medium";
      advice = "Consult inplannen binnen 2 werkdagen.";
      aiSuggestions = [
        "Vraag naar begin, duur en intensiteit van de hoofdpijn",
        "Vraag naar misselijkheid, braken, lichtgevoeligheid",
        "Controleer medicatiegebruik en mogelijk overgebruik pijnstillers"
      ];
    } else {
      urgency = "laag";
      advice = "Patiënt kan ingepland worden voor regulier consult.";
      aiSuggestions = [
        "Geef zelfzorgadviezen mee",
        "Adviseer terug te bellen bij verergering klachten",
        "Plan consult in binnen 1-2 weken indien gewenst"
      ];
    }
    
    setTriageResult({ urgency, advice, aiSuggestions });
  };

  const clearForm = () => {
    setPatientSearch("");
    setSymptoms("");
    setCategory("");
    setTriageResult(null);
  };
  
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
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2">Triage</h1>
        <p className="text-muted-foreground mb-6">
          AI-ondersteunde triage voor patiënten
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Nieuwe triage</CardTitle>
          <CardDescription>
            Voer patiëntgegevens en symptomen in voor een AI-ondersteunde triage
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Patiënt</label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Zoek patiënt op naam of BSN..." 
                className="pl-8"
                value={patientSearch}
                onChange={(e) => setPatientSearch(e.target.value)}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Of voer een nieuwe patiënt in (later toe te voegen aan systeem)
            </p>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Klachtencategorie</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Selecteer een categorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="algemeen">Algemeen</SelectItem>
                <SelectItem value="ademhaling">Ademhaling</SelectItem>
                <SelectItem value="spijsvertering">Spijsvertering</SelectItem>
                <SelectItem value="huid">Huid</SelectItem>
                <SelectItem value="bewegingsapparaat">Bewegingsapparaat</SelectItem>
                <SelectItem value="psychisch">Psychisch</SelectItem>
                <SelectItem value="hart-vaat">Hart en bloedvaten</SelectItem>
                <SelectItem value="hoofdhals">Hoofd-hals gebied</SelectItem>
                <SelectItem value="neurologisch">Neurologisch</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Symptomen en klachten</label>
            <Textarea 
              placeholder="Beschrijf de symptomen van de patiënt..."
              className="min-h-[150px]"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Probeer een zo volledig mogelijke beschrijving te geven. Vermeld duur, ernst en bijkomende klachten.
            </p>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={clearForm}>
              Wissen
            </Button>
            <Button className="bg-medical hover:bg-medical-accent" onClick={handleTriage}>
              <ClipboardList className="h-4 w-4 mr-2" />
              Triage uitvoeren
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {triageResult && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Triage resultaat</CardTitle>
              <Badge className={`${getUrgencyColor(triageResult.urgency)}`}>
                {triageResult.urgency === "spoed" && <AlertTriangle className="h-3 w-3 mr-1" />}
                {triageResult.urgency === "laag" && <CheckCircle className="h-3 w-3 mr-1" />}
                {triageResult.urgency.charAt(0).toUpperCase() + triageResult.urgency.slice(1)} urgentie
              </Badge>
            </div>
            <CardDescription>
              AI-gebaseerde analyse van de beschreven symptomen
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Advies</h3>
              <p>{triageResult.advice}</p>
            </div>
            
            <div>
              <h3 className="flex items-center font-medium mb-2">
                <Brain className="h-4 w-4 mr-2 text-medical" />
                AI-suggesties voor vervolgvragen
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                {triageResult.aiSuggestions.map((suggestion, index) => (
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
      )}
      
      <Card>
        <CardHeader>
          <CardTitle>Recente triages</CardTitle>
          <CardDescription>
            De laatste 5 uitgevoerde triages
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-10 text-muted-foreground">
            <p>Geen recente triages gevonden</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Triage;
