
import { useState } from "react";
import ActiveCallSection from "@/components/telefoon/ActiveCallSection";
import CallHistoryTabs from "@/components/telefoon/CallHistoryTabs";
import { Toaster } from "@/components/ui/toaster";

const Telefoon = () => {
  const [activeCall, setActiveCall] = useState<boolean>(false);
  
  const handleEndCall = () => {
    setActiveCall(false);
  };
  
  const handleStartCall = () => {
    setActiveCall(true);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2">Telefoongesprekken</h1>
        <p className="text-muted-foreground mb-6">
          Beheer inkomende telefoongesprekken met AI-ondersteuning
        </p>
      </div>
      
      <ActiveCallSection 
        activeCall={activeCall} 
        onEndCall={handleEndCall} 
        onStartCall={handleStartCall}
      />
      
      <CallHistoryTabs />
      <Toaster />
    </div>
  );
};

export default Telefoon;
