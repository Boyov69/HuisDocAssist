
import React, { useState } from "react";
import { FileText, Calendar, Activity, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import NewAppointmentForm from "@/components/appointments/NewAppointmentForm";
import PatientPrescriptions from "./PatientPrescriptions";
import PatientFullDossier from "./PatientFullDossier";
import { Patient } from "./PatientCard";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface PatientActionsProps {
  patient: Patient;
}

const PatientActions = ({ patient }: PatientActionsProps) => {
  const [showPrescriptions, setShowPrescriptions] = useState(false);
  const [showFullDossier, setShowFullDossier] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleAppointmentCreated = () => {
    // Handle appointment creation success
  };

  const MobileActions = () => (
    <div className="w-full">
      <Popover open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full flex items-center justify-between">
            <span>Patiënt acties</span>
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-2">
          <div className="flex flex-col space-y-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => setMobileMenuOpen(false)}>
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

            <DialogTrigger asChild onClick={() => {
              setShowPrescriptions(true);
              setMobileMenuOpen(false);
            }}>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Recepten
              </Button>
            </DialogTrigger>

            <DialogTrigger asChild onClick={() => {
              setShowFullDossier(true);
              setMobileMenuOpen(false);
            }}>
              <Button size="sm" className="w-full justify-start bg-medical hover:bg-medical-accent">
                <Activity className="h-4 w-4 mr-2" />
                Volledig dossier
              </Button>
            </DialogTrigger>
          </div>
        </PopoverContent>
      </Popover>

      <Dialog open={showPrescriptions} onOpenChange={setShowPrescriptions}>
        <DialogContent className="sm:max-w-[600px] w-[95vw] max-h-[90vh] overflow-y-auto">
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
        <DialogContent className="sm:max-w-[800px] w-[95vw] max-h-[90vh] overflow-y-auto">
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

  const DesktopActions = () => (
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

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className="w-full"
      >
        {isMobile ? <MobileActions /> : <DesktopActions />}
      </motion.div>
    </AnimatePresence>
  );
};

export default PatientActions;
