
import React from "react";
import { Calendar, Phone, Users, ClipboardList } from "lucide-react";
import StatCard from "./StatCard";

const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard 
        title="Afspraken vandaag" 
        value={24} 
        icon={Calendar} 
        description="3 meer dan gisteren"
      />
      
      <StatCard 
        title="Telefoontjes vandaag" 
        value={18} 
        icon={Phone} 
        description="2 minder dan gisteren"
      />
      
      <StatCard 
        title="Patiënten gezien" 
        value={21} 
        icon={Users} 
        description="5 meer dan gisteren"
      />
      
      <StatCard 
        title="Triages uitgevoerd" 
        value={16} 
        icon={ClipboardList} 
        description="1 meer dan gisteren"
      />
    </div>
  );
};

export default StatsCards;
