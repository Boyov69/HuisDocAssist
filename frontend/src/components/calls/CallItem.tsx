
import React from "react";

export interface CallItemProps {
  time: string;
  phoneNumber: string;
  timeAgo: string;
  description: string;
}

const CallItem: React.FC<CallItemProps> = ({
  time,
  phoneNumber,
  timeAgo,
  description,
}) => {
  return (
    <div className="border-b pb-2">
      <div className="flex justify-between mb-1">
        <div className="font-medium">{time} - {phoneNumber}</div>
        <div className="text-sm text-gray-500">{timeAgo}</div>
      </div>
      <div className="text-sm text-muted-foreground">{description}</div>
    </div>
  );
};

export default CallItem;
