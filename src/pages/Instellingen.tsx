
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import SettingsTabs from "@/components/settings/SettingsTabs";

const Instellingen = () => {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);
  
  const handleSave = () => {
    // Simulate saving
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2">Instellingen</h1>
        <p className="text-muted-foreground mb-6">
          Beheer praktijk- en applicatie-instellingen
        </p>
      </div>
      
      <SettingsTabs onSave={handleSave} saved={saved} />
    </div>
  );
};

export default Instellingen;
