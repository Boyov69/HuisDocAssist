
import React, { useState } from "react";
import { User, FileText } from "lucide-react";
import AccordionCard from "@/components/AccordionCard";
import PatientPersonalInfo from "./PatientPersonalInfo";
import PatientMedicalInfo from "./PatientMedicalInfo";
import PatientActions from "./PatientActions";
import DocumentUpload from "./DocumentUpload";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const [documents, setDocuments] = useState<{ name: string; type: string; size: number }[]>([]);

  const handleUploadComplete = (fileData: { name: string; type: string; size: number }) => {
    setDocuments([...documents, fileData]);
  };

  return (
    <AccordionCard
      key={patient.id}
      title={patient.name}
      icon={<User className="h-5 w-5" />}
    >
      <div className="space-y-4">
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="info">Patiëntgegevens</TabsTrigger>
            <TabsTrigger value="documents">
              <FileText className="h-4 w-4 mr-2" />
              Documenten
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="info">
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
          </TabsContent>
          
          <TabsContent value="documents">
            <div className="space-y-4">
              <DocumentUpload 
                patientId={patient.id} 
                onUploadComplete={handleUploadComplete}
              />
              
              <div>
                <h3 className="font-medium mb-2">Recente documenten</h3>
                {documents.length > 0 ? (
                  <ul className="space-y-2">
                    {documents.map((doc, index) => (
                      <li key={index} className="flex items-center p-2 border rounded-md">
                        <FileText className="h-4 w-4 mr-2 text-medical" />
                        <div>
                          <p className="text-sm font-medium">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(doc.size / 1024).toFixed(0)} KB • Geüpload op {new Date().toLocaleDateString()}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Geen documenten beschikbaar. Upload documenten hierboven.
                  </p>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <PatientActions />
      </div>
    </AccordionCard>
  );
};

export default PatientCard;
