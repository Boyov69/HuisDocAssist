
import React, { useState } from "react";
import { FileText, Calendar, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import NewAppointmentForm from "@/components/appointments/NewAppointmentForm";
import PatientPrescriptions from "./PatientPrescriptions";
import PatientFullDossier from "./PatientFullDossier";
import { Patient } from "./PatientCard";

interface PatientActionsProps {
  patient: Patient;
}

const PatientActions = ({ patient }: PatientActionsProps) => {
  const [showPrescriptions, setShowPrescriptions] = useState(false);
  const [showFullDossier, setShowFullDossier] = useState(false);

  const handleAppointmentCreated = () => {
    // Handle appointment creation success
  };

  return (
    <div className="flex items-center justify-end space-x-2">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Afspraak plannen
          </Button>
        </SheetTrigger>
        <SheetContent className="sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>Afspraak plannen voor {patient.name}</SheetTitle>
            <SheetDescription>
              Plan een nieuwe afspraak voor deze patiënt.
            </SheetDescription>
          </SheetHeader>
          <NewAppointmentForm onSuccess={handleAppointmentCreated} preselectedPatient={patient} />
        </SheetContent>
      </Sheet>

      <Dialog open={showPrescriptions} onOpenChange={setShowPrescriptions}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Recepten
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Recepten voor {patient.name}</DialogTitle>
            <DialogDescription>
              Bekijk en beheer recepten voor deze patiënt.
            </DialogDescription>
          </DialogHeader>
          <PatientPrescriptions patient={patient} />
        </DialogContent>
      </Dialog>

      <Dialog open={showFullDossier} onOpenChange={setShowFullDossier}>
        <DialogTrigger asChild>
          <Button size="sm" className="bg-medical hover:bg-medical-accent">
            <Activity className="h-4 w-4 mr-2" />
            Volledig dossier
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Volledig dossier van {patient.name}</DialogTitle>
            <DialogDescription>
              Bekijk het volledige medische dossier van deze patiënt.
            </DialogDescription>
          </DialogHeader>
          <PatientFullDossier patient={patient} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PatientActions;
