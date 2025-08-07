
import React, { useState } from "react";
import { Clock, Calendar } from "lucide-react";
import AccordionCard from "@/components/AccordionCard";
import { Button } from "@/components/ui/button";
import { User, FileText } from "lucide-react";
import { updateAppointmentStatus, rescheduleAppointment } from "@/data/appointmentData";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

export interface Appointment {
  id: number;
  patient: string;
  time: string;
  date: string;
  type: string;
  notes: string;
  status: "confirmed" | "pending" | "cancelled";
}

interface AppointmentsListProps {
  appointments: Appointment[];
  date: string;
}

const AppointmentsList = ({ appointments, date }: AppointmentsListProps) => {
  const [rescheduleDialogOpen, setRescheduleDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [newTime, setNewTime] = useState("");
  const [newDate, setNewDate] = useState("");

  const handleRescheduleClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setNewTime(appointment.time);
    setNewDate(appointment.date);
    setRescheduleDialogOpen(true);
  };

  const handleCancelClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setCancelDialogOpen(true);
  };

  const handleRescheduleConfirm = () => {
    if (selectedAppointment && newTime && newDate) {
      if (rescheduleAppointment(selectedAppointment.id, newTime, newDate)) {
        toast({
          title: "Afspraak verzet",
          description: `De afspraak voor ${selectedAppointment.patient} is verzet naar ${newDate} om ${newTime}.`,
          duration: 3000,
        });
      }
    }
    setRescheduleDialogOpen(false);
  };

  const handleCancelConfirm = () => {
    if (selectedAppointment) {
      if (updateAppointmentStatus(selectedAppointment.id, "cancelled")) {
        toast({
          title: "Afspraak geannuleerd",
          description: `De afspraak voor ${selectedAppointment.patient} is geannuleerd.`,
          duration: 3000,
        });
      }
    }
    setCancelDialogOpen(false);
  };

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <AccordionCard
          key={appointment.id}
          title={`${appointment.time} - ${appointment.patient}`}
          icon={<Clock className="h-5 w-5" />}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center mb-2">
                  <User className="h-4 w-4 mr-2 text-medical" />
                  <span className="font-medium">Patiënt</span>
                </div>
                <p className="text-sm text-muted-foreground ml-6">
                  {appointment.patient}
                </p>
              </div>
              
              <div>
                <div className="flex items-center mb-2">
                  <Clock className="h-4 w-4 mr-2 text-medical" />
                  <span className="font-medium">Tijd</span>
                </div>
                <p className="text-sm text-muted-foreground ml-6">
                  {appointment.time}, {appointment.date}
                </p>
              </div>
            </div>
            
            <div>
              <div className="flex items-center mb-2">
                <FileText className="h-4 w-4 mr-2 text-medical" />
                <span className="font-medium">Type & Notities</span>
              </div>
              <p className="text-sm ml-6">
                <span className="text-medical font-medium">{appointment.type}</span>
              </p>
              <p className="text-sm text-muted-foreground ml-6 mt-1">
                {appointment.notes}
              </p>
            </div>

            <div className="flex items-center mt-2">
              <div className={`ml-6 px-2 py-1 text-xs font-medium rounded-full ${
                appointment.status === "confirmed" ? "bg-green-100 text-green-800" :
                appointment.status === "pending" ? "bg-amber-100 text-amber-800" :
                "bg-red-100 text-red-800"
              }`}>
                {appointment.status === "confirmed" ? "Bevestigd" :
                 appointment.status === "pending" ? "In behandeling" : "Geannuleerd"}
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleRescheduleClick(appointment)}
                disabled={appointment.status === "cancelled"}
              >
                Verzetten
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleCancelClick(appointment)}
                disabled={appointment.status === "cancelled"}
              >
                Annuleren
              </Button>
              <Button size="sm" className="bg-medical hover:bg-medical-accent">
                Patiëntdossier
              </Button>
            </div>
          </div>
        </AccordionCard>
      ))}

      {/* Verzet Afspraak Dialog */}
      <Dialog open={rescheduleDialogOpen} onOpenChange={setRescheduleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Afspraak verzetten</DialogTitle>
            <DialogDescription>
              Kies een nieuwe datum en tijd voor de afspraak van {selectedAppointment?.patient}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Datum
              </Label>
              <Input
                id="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="time" className="text-right">
                Tijd
              </Label>
              <Input
                id="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRescheduleDialogOpen(false)}>
              Annuleren
            </Button>
            <Button onClick={handleRescheduleConfirm} className="bg-medical hover:bg-medical-accent">
              Bevestigen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Annuleer Afspraak Alert Dialog */}
      <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Afspraak annuleren</AlertDialogTitle>
            <AlertDialogDescription>
              Weet u zeker dat u de afspraak van {selectedAppointment?.patient} op {selectedAppointment?.date} om {selectedAppointment?.time} wilt annuleren?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Terug</AlertDialogCancel>
            <AlertDialogAction onClick={handleCancelConfirm} className="bg-destructive hover:bg-destructive/90">
              Annuleren
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AppointmentsList;
