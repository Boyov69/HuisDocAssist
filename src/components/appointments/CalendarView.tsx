
import React, { useState } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { appointments } from "@/data/appointmentData";
import { Badge } from "@/components/ui/badge";

const CalendarView = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [month, setMonth] = useState<Date>(new Date());

  // Create a mapping of dates with appointments
  const appointmentDates = appointments.reduce((acc, appointment) => {
    const dateStr = appointment.date;
    if (!acc[dateStr]) {
      acc[dateStr] = [];
    }
    acc[dateStr].push(appointment);
    return acc;
  }, {} as Record<string, typeof appointments>);

  // Custom day rendering for the calendar
  const dayWithAppointments = (props: { date: Date; displayMonth: Date }) => {
    const day = props.date;
    const dateStr = format(day, "dd MMMM yyyy", { locale: nl });
    const hasAppointments = appointmentDates[dateStr] && appointmentDates[dateStr].length > 0;
    
    return hasAppointments ? (
      <div className="relative">
        <div>{format(day, "d")}</div>
        <Badge className="absolute bottom-0 right-0 h-2 w-2 p-0 bg-medical" />
      </div>
    ) : (
      <div>{format(day, "d")}</div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">
          {format(month, "MMMM yyyy", { locale: nl })}
        </h2>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              const newMonth = new Date(month);
              newMonth.setMonth(newMonth.getMonth() - 1);
              setMonth(newMonth);
            }}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              const newMonth = new Date(month);
              newMonth.setMonth(newMonth.getMonth() + 1);
              setMonth(newMonth);
            }}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        month={month}
        onMonthChange={setMonth}
        className="rounded-md border w-full"
        components={{
          DayContent: dayWithAppointments,
        }}
      />

      {date && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">
              Afspraken voor {format(date, "d MMMM yyyy", { locale: nl })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {appointmentDates[format(date, "dd MMMM yyyy", { locale: nl })] ? (
              <div className="space-y-2">
                {appointmentDates[format(date, "dd MMMM yyyy", { locale: nl })].map((appointment, index) => (
                  <div key={index} className="p-2 border rounded-md">
                    <div className="flex justify-between">
                      <span className="font-medium">{appointment.time}</span>
                      <span className="text-medical">{appointment.type}</span>
                    </div>
                    <div>{appointment.patient}</div>
                    <div className="text-sm text-muted-foreground">{appointment.notes}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">
                Geen afspraken voor deze dag.
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CalendarView;
