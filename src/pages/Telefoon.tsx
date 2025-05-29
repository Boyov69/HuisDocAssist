
import { useState, useEffect } from "react";
import ActiveCallSection from "@/components/telefoon/ActiveCallSection";
import CallHistoryTabs from "@/components/telefoon/CallHistoryTabs";
import ApiKeyDialog from "@/components/telefoon/ApiKeyDialog";
import { getApiKey, setApiKey } from "@/services/elevenLabsService";
import { useToast } from "@/hooks/use-toast";
import { useNotification } from "@/contexts/NotificationContext";

const Telefoon = () => {
  const [activeCall, setActiveCall] = useState<boolean>(false);
  const [apiKeyInput, setApiKeyInput] = useState(getApiKey());
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);
  const { toast } = useToast();
  const { showNotification } = useNotification();
  
  // Controleer of er een API sleutel is ingesteld bij het eerste laden
  useEffect(() => {
    if (!getApiKey()) {
      // Toon de dialoog na een korte vertraging zodat de pagina eerst volledig geladen is
      const timer = setTimeout(() => {
        setShowApiKeyDialog(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);
  
  const handleEndCall = () => {
    setActiveCall(false);
    showNotification(
      "Gesprek beëindigd",
      "Het telefoongesprek is succesvol beëindigd.",
      "info"
    );
  };
  
  const handleStartCall = () => {
    setActiveCall(true);
    showNotification(
      "Nieuw gesprek",
      "Er is een nieuw inkomend gesprek.",
      "info"
    );
  };
  
  const saveApiKey = () => {
    setApiKey(apiKeyInput);
    setShowApiKeyDialog(false);
    toast({
      title: "API sleutel opgeslagen",
      description: "Je ElevenLabs API sleutel is succesvol opgeslagen.",
    });
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
      
      <ApiKeyDialog
        open={showApiKeyDialog}
        onOpenChange={setShowApiKeyDialog}
        apiKey={apiKeyInput}
        onApiKeyChange={setApiKeyInput}
        onSave={saveApiKey}
      />
      
    </div>
  );
};

export default Telefoon;
