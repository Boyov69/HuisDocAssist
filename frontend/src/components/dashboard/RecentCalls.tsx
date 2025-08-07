
import React from "react";
import { Phone } from "lucide-react";
import AccordionCard from "@/components/AccordionCard";
import CallItem, { CallItemProps } from "@/components/calls/CallItem";
import ItemList from "@/components/common/ItemList";

const calls: CallItemProps[] = [
  {
    time: "08:45",
    phoneNumber: "06-12345678",
    timeAgo: "2 min. geleden",
    description: "Mevr. Smits - Vraag over medicatie"
  },
  {
    time: "08:32",
    phoneNumber: "06-87654321",
    timeAgo: "15 min. geleden",
    description: "Dhr. Janssen - Afspraak verzetten"
  },
  {
    time: "08:15",
    phoneNumber: "070-1234567",
    timeAgo: "32 min. geleden",
    description: "Apotheek - Overleg over recept"
  }
];

const RecentCalls: React.FC = () => {
  const handleViewAll = () => {
    console.log("View all calls clicked");
    // Navigation logic could be added here
  };

  return (
    <AccordionCard 
      title="Recente telefoongesprekken" 
      icon={<Phone className="h-5 w-5" />}
      className="mt-4"
    >
      <ItemList viewAllLabel="Alle telefoongesprekken bekijken" onViewAll={handleViewAll}>
        {calls.map((call, index) => (
          <CallItem 
            key={index}
            time={call.time}
            phoneNumber={call.phoneNumber}
            timeAgo={call.timeAgo}
            description={call.description}
          />
        ))}
      </ItemList>
    </AccordionCard>
  );
};

export default RecentCalls;
