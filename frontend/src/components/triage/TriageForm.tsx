
import { useState } from "react";
import { Search, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface TriageFormProps {
  onSubmitTriage: (patientSearch: string, symptoms: string, category: string) => void;
}

const TriageForm = ({ onSubmitTriage }: TriageFormProps) => {
  const [patientSearch, setPatientSearch] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [category, setCategory] = useState("");

  const handleTriage = () => {
    onSubmitTriage(patientSearch, symptoms, category);
  };

  const clearForm = () => {
    setPatientSearch("");
    setSymptoms("");
    setCategory("");
  };

  return (
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
  );
};

export default TriageForm;
