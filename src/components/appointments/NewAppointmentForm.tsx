
import React, { useState } from "react";
import { User, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import PatientSelector from "@/components/patienten/PatientSelector";
import PatientRegistrationDialog from "@/components/patienten/PatientRegistrationDialog";
import { getAllPatients } from "@/utils/patientUtils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Patient } from "@/components/patienten/PatientCard";

interface NewAppointmentFormProps {
  onSuccess?: () => void;
}

const NewAppointmentForm = ({ onSuccess }: NewAppointmentFormProps) => {
  const patients = getAllPatients();
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally save the appointment to a database
    console.log("Creating appointment:", { selectedPatient, date, time, type, notes });
    
    // Call the success callback if provided
    if (onSuccess) {
      onSuccess();
    }
    
    // Reset form
    setDate("");
    setTime("");
    setType("");
    setNotes("");
  };

  return (
    <form onSubmit={handleSubmit} className="py-6 space-y-6">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Patiënt</h3>
        <div className="flex flex-col sm:flex-row gap-2">
          <PatientSelector 
            patients={patients}
            onSelect={setSelectedPatient}
            selectedPatient={selectedPatient}
          />
          <PatientRegistrationDialog 
            triggerText="Nieuwe patiënt" 
            buttonVariant="outline"
          />
        </div>
      </div>
      
      {!selectedPatient ? (
        <p className="text-muted-foreground text-sm">
          Selecteer eerst een patiënt om door te gaan met het plannen van een afspraak.
        </p>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="date" className="text-sm font-medium">Datum</label>
              <div className="relative">
                <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="date"
                  type="date" 
                  className="pl-8"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="time" className="text-sm font-medium">Tijd</label>
              <Input 
                id="time"
                type="time" 
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="type" className="text-sm font-medium">Type afspraak</label>
            <Select value={type} onValueChange={setType} required>
              <SelectTrigger>
                <SelectValue placeholder="Selecteer type afspraak" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="consult">Consult (10 min)</SelectItem>
                <SelectItem value="dubbel">Dubbel consult (20 min)</SelectItem>
                <SelectItem value="huisbezoek">Huisbezoek</SelectItem>
                <SelectItem value="telefonisch">Telefonisch consult</SelectItem>
                <SelectItem value="video">Video consult</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="notes" className="text-sm font-medium">Notities</label>
            <Textarea 
              id="notes"
              placeholder="Optionele notities over de afspraak..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          
          <p className="text-xs text-muted-foreground">
            Afspraak plannen voor: <strong>{selectedPatient.name}</strong>
          </p>
          
          <div className="flex justify-end">
            <Button type="submit" className="bg-medical hover:bg-medical-accent">
              Afspraak inplannen
            </Button>
          </div>
        </div>
      )}
    </form>
  );
};

export default NewAppointmentForm;
