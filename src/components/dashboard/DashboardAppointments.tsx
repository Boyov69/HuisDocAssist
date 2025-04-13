
import React from "react";
import { Calendar } from "lucide-react";
import AccordionCard from "@/components/AccordionCard";
import AppointmentItem, { AppointmentItemProps } from "@/components/appointments/AppointmentItem";
import ItemList from "@/components/common/ItemList";

const appointments: AppointmentItemProps[] = [
  {
    time: "09:00",
    patientName: "Dhr. van Veen",
    type: "Controle",
    description: "Diabetes type 2 controle"
  },
  {
    time: "09:15",
    patientName: "Mevr. Jansen",
    type: "Consult",
    description: "Hoofdpijn, duizeligheid"
  },
  {
    time: "09:30",
    patientName: "Kim de Vries",
    type: "Consult",
    description: "Huiduitslag"
  },
  {
    time: "09:45",
    patientName: "Dhr. Bakker",
    type: "Controle",
    description: "Bloeddruk controle"
  }
];

const DashboardAppointments: React.FC = () => {
  const handleViewAll = () => {
    console.log("View all appointments clicked");
    // Navigation logic could be added here
  };

  return (
    <AccordionCard 
      title="Afspraken vandaag" 
      icon={<Calendar className="h-5 w-5" />}
      defaultOpen={true}
    >
      <ItemList viewAllLabel="Alle afspraken bekijken" onViewAll={handleViewAll}>
        {appointments.map((appointment, index) => (
          <AppointmentItem 
            key={index}
            time={appointment.time}
            patientName={appointment.patientName}
            type={appointment.type}
            description={appointment.description}
          />
        ))}
      </ItemList>
    </AccordionCard>
  );
};

export default DashboardAppointments;
