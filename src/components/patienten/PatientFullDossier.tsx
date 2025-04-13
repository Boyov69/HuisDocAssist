
import React from "react";
import { Calendar, Activity, FileText, Stethoscope, Pill, User } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Patient } from "./PatientCard";
import { Separator } from "@/components/ui/separator";

interface Visit {
  id: number;
  date: string;
  doctor: string;
  symptoms: string;
  diagnosis: string;
  notes: string;
  followUp: boolean;
}

interface PatientFullDossierProps {
  patient: Patient;
}

const PatientFullDossier = ({ patient }: PatientFullDossierProps) => {
  // In a real app, these would come from an API
  const visits: Visit[] = [
    {
      id: 1,
      date: "22-03-2025",
      doctor: "Dr. Jansen",
      symptoms: "Vermoeidheid, dorst, frequent urineren",
      diagnosis: "Diabetes type 2",
      notes: "Bloedglucose: 11.2 mmol/L, HbA1c: 53 mmol/mol",
      followUp: true
    },
    {
      id: 2,
      date: "15-01-2025",
      doctor: "Dr. de Vries",
      symptoms: "Hoge bloeddruk bij routinecontrole",
      diagnosis: "Hypertensie",
      notes: "Bloeddruk: 160/95 mmHg",
      followUp: true
    }
  ];

  return (
    <div className="py-4 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-2">
          <User className="h-5 w-5 text-medical" />
          <div>
            <h3 className="font-semibold">{patient.name}</h3>
            <p className="text-sm text-muted-foreground">{patient.dob} • BSN: {patient.bsn}</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {patient.conditions.map((condition, index) => (
            <span 
              key={index} 
              className="bg-muted text-muted-foreground text-xs py-1 px-2 rounded-full"
            >
              {condition}
            </span>
          ))}
        </div>
      </div>
      
      <Separator />
      
      <Tabs defaultValue="bezoeken" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="bezoeken">
            <Calendar className="h-4 w-4 mr-2" />
            Bezoeken
          </TabsTrigger>
          <TabsTrigger value="medicatie">
            <Pill className="h-4 w-4 mr-2" />
            Medicatie
          </TabsTrigger>
          <TabsTrigger value="onderzoeken">
            <Stethoscope className="h-4 w-4 mr-2" />
            Onderzoeken
          </TabsTrigger>
          <TabsTrigger value="files">
            <FileText className="h-4 w-4 mr-2" />
            Documenten
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="bezoeken" className="space-y-4">
          {visits.length > 0 ? (
            visits.map((visit) => (
              <div key={visit.id} className="border rounded-md p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-medical" />
                    <span className="font-medium">{visit.date}</span>
                    <span className="text-muted-foreground text-sm">• {visit.doctor}</span>
                  </div>
                  {visit.followUp && (
                    <span className="text-xs bg-medical/20 text-medical px-2 py-1 rounded-full">
                      Follow-up
                    </span>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Symptomen</h4>
                    <p>{visit.symptoms}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Diagnose</h4>
                    <p>{visit.diagnosis}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Notities</h4>
                  <p>{visit.notes}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              Geen bezoeken gevonden voor deze patiënt.
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="medicatie" className="space-y-4">
          {patient.medications.length > 0 ? (
            <div className="space-y-3">
              {patient.medications.map((medication, index) => (
                <div key={index} className="border rounded-md p-3">
                  <div className="flex items-start gap-3">
                    <Pill className="h-5 w-5 text-medical mt-1" />
                    <div>
                      <h4 className="font-medium">{medication}</h4>
                      <p className="text-sm text-muted-foreground">
                        Actief voorgeschreven
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              Geen medicatie gevonden voor deze patiënt.
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="onderzoeken">
          <div className="text-center py-6 text-muted-foreground">
            Geen onderzoeksresultaten beschikbaar.
          </div>
        </TabsContent>
        
        <TabsContent value="files">
          <div className="text-center py-6 text-muted-foreground">
            Geen documenten beschikbaar.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientFullDossier;
