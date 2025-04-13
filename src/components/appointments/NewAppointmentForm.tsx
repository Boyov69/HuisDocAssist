
import React from "react";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import PatientSelector from "@/components/patienten/PatientSelector";
import PatientRegistrationDialog from "@/components/patienten/PatientRegistrationDialog";
import { getAllPatients } from "@/utils/patientUtils";

const NewAppointmentForm = () => {
  const patients = getAllPatients();
  const [selectedPatient, setSelectedPatient] = React.useState(null);

  return (
    <div className="py-6 space-y-6">
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
          {/* Here future appointment form fields would go */}
          <p className="text-xs text-muted-foreground">
            Afspraak plannen voor: <strong>{selectedPatient.name}</strong>
          </p>
          
          <div className="flex justify-end">
            <Button className="bg-medical hover:bg-medical-accent">
              Afspraak inplannen
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewAppointmentForm;
