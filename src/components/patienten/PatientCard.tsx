
import React from "react";
import { User } from "lucide-react";
import AccordionCard from "@/components/AccordionCard";
import PatientPersonalInfo from "./PatientPersonalInfo";
import PatientMedicalInfo from "./PatientMedicalInfo";
import PatientActions from "./PatientActions";

export interface Patient {
  id: number;
  name: string;
  dob: string;
  bsn: string;
  address: string;
  phone: string;
  email: string;
  lastVisit: string;
  conditions: string[];
  medications: string[];
}

interface PatientCardProps {
  patient: Patient;
}

const PatientCard = ({ patient }: PatientCardProps) => {
  return (
    <AccordionCard
      key={patient.id}
      title={patient.name}
      icon={<User className="h-5 w-5" />}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PatientPersonalInfo 
            dob={patient.dob}
            bsn={patient.bsn}
            address={patient.address}
            phone={patient.phone}
            email={patient.email}
          />
          
          <PatientMedicalInfo 
            conditions={patient.conditions}
            medications={patient.medications}
            lastVisit={patient.lastVisit}
          />
        </div>
        
        <PatientActions />
      </div>
    </AccordionCard>
  );
};

export default PatientCard;
