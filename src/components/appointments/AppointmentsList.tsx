
import React from "react";
import { Clock } from "lucide-react";
import AccordionCard from "@/components/AccordionCard";
import { Button } from "@/components/ui/button";
import { User, FileText } from "lucide-react";

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
            
            <div className="flex items-center justify-end space-x-2">
              <Button variant="outline" size="sm">
                Verzetten
              </Button>
              <Button variant="outline" size="sm">
                Annuleren
              </Button>
              <Button size="sm" className="bg-medical hover:bg-medical-accent">
                Patiëntdossier
              </Button>
            </div>
          </div>
        </AccordionCard>
      ))}
    </div>
  );
};

export default AppointmentsList;
