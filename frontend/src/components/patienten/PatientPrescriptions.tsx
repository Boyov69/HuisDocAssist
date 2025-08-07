
import React, { useState } from "react";
import { Plus, FileText, Calendar, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Patient } from "./PatientCard";
import { toast } from "@/hooks/use-toast";

interface Prescription {
  id: number;
  medication: string;
  dosage: string;
  instructions: string;
  date: string;
}

interface PatientPrescriptionsProps {
  patient: Patient;
}

const PatientPrescriptions = ({ patient }: PatientPrescriptionsProps) => {
  // In a real app, these would come from an API
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(
    patient.medications.map((med, index) => ({
      id: index + 1,
      medication: med.split(' ')[0], // Extract medication name
      dosage: med.split(' ').slice(1, 2).join(' '), // Extract dosage
      instructions: med.split(' ').slice(2).join(' '), // Extract instructions
      date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(), // Random date in the last 30 days
    }))
  );

  const [showNewForm, setShowNewForm] = useState(false);
  const [newPrescription, setNewPrescription] = useState({
    medication: "",
    dosage: "",
    instructions: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const prescription: Prescription = {
      id: prescriptions.length + 1,
      ...newPrescription,
      date: new Date().toLocaleDateString(),
    };
    
    setPrescriptions([prescription, ...prescriptions]);
    setNewPrescription({ medication: "", dosage: "", instructions: "" });
    setShowNewForm(false);
    
    toast({
      title: "Recept toegevoegd",
      description: `Recept voor ${prescription.medication} is toegevoegd.`,
      duration: 3000,
    });
  };

  const handleDelete = (id: number) => {
    setPrescriptions(prescriptions.filter(p => p.id !== id));
    toast({
      title: "Recept verwijderd",
      description: "Het recept is succesvol verwijderd.",
      duration: 3000,
    });
  };

  return (
    <div className="space-y-4 py-4">
      {!showNewForm ? (
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={() => setShowNewForm(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Nieuw recept
        </Button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 border rounded-md p-4">
          <h3 className="font-medium">Nieuw recept</h3>
          
          <div className="space-y-2">
            <label htmlFor="medication" className="text-sm font-medium">Medicatie</label>
            <Input
              id="medication"
              value={newPrescription.medication}
              onChange={(e) => setNewPrescription({...newPrescription, medication: e.target.value})}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="dosage" className="text-sm font-medium">Dosering</label>
            <Input
              id="dosage"
              value={newPrescription.dosage}
              onChange={(e) => setNewPrescription({...newPrescription, dosage: e.target.value})}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="instructions" className="text-sm font-medium">Instructies</label>
            <Textarea
              id="instructions"
              value={newPrescription.instructions}
              onChange={(e) => setNewPrescription({...newPrescription, instructions: e.target.value})}
              required
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setShowNewForm(false)}>
              Annuleren
            </Button>
            <Button type="submit" className="bg-medical hover:bg-medical-accent">
              Recept toevoegen
            </Button>
          </div>
        </form>
      )}
      
      {prescriptions.length > 0 ? (
        <div className="space-y-3">
          <h3 className="font-medium">Huidige recepten</h3>
          {prescriptions.map((prescription) => (
            <div key={prescription.id} className="border rounded-md p-3 relative">
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-2 top-2"
                onClick={() => handleDelete(prescription.id)}
              >
                <X className="h-4 w-4" />
              </Button>
              
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-medical mt-1" />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="font-semibold">{prescription.medication}</h4>
                    <span className="text-xs text-muted-foreground flex items-center">
                      <Calendar className="h-3 w-3 mr-1" /> {prescription.date}
                    </span>
                  </div>
                  <p className="text-sm font-medium">{prescription.dosage}</p>
                  <p className="text-sm text-muted-foreground">{prescription.instructions}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 text-muted-foreground">
          Geen recepten gevonden voor deze patiënt.
        </div>
      )}
    </div>
  );
};

export default PatientPrescriptions;
