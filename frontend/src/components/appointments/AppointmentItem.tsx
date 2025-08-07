
import React from "react";

export interface AppointmentItemProps {
  time: string;
  patientName: string;
  type: string;
  description: string;
}

const AppointmentItem: React.FC<AppointmentItemProps> = ({
  time,
  patientName,
  type,
  description,
}) => {
  return (
    <div className="border-b pb-2">
      <div className="flex justify-between mb-1">
        <div className="font-medium">{time} - {patientName}</div>
        <div className="text-sm text-medical">{type}</div>
      </div>
      <div className="text-sm text-muted-foreground">{description}</div>
    </div>
  );
};

export default AppointmentItem;
