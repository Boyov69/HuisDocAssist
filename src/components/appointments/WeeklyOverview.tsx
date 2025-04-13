
import React from "react";

interface DayAppointments {
  date: string;
  formattedDate: string;
  appointments: {
    time: string;
    patient: string;
    type: string;
  }[];
}

interface WeeklyOverviewProps {
  weekData: DayAppointments[];
}

const WeeklyOverview = ({ weekData }: WeeklyOverviewProps) => {
  return (
    <div className="space-y-6">
      {weekData.map((day) => (
        <div key={day.date}>
          <h3 className="font-medium mb-2">{day.formattedDate}</h3>
          <div className={`border-l-2 ${day.appointments.length > 0 ? 'border-medical' : 'border-gray-200'} pl-4 ml-2 space-y-2`}>
            {day.appointments.length > 0 ? (
              day.appointments.map((appointment, index) => (
                <p key={index} className="text-sm">
                  {appointment.time} - {appointment.patient} ({appointment.type})
                </p>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">Geen afspraken</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeeklyOverview;
