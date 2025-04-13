
import { useState } from "react";
import { Phone, Badge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TranscriptionSection from "./TranscriptionSection";
import NotesSection from "./NotesSection";

interface ActiveCallSectionProps {
  activeCall: boolean;
  onEndCall: () => void;
  onStartCall: () => void;
}

const ActiveCallSection = ({ activeCall, onEndCall, onStartCall }: ActiveCallSectionProps) => {
  const [callDuration, setCallDuration] = useState<number>(0);
  const [callStartTime, setCallStartTime] = useState<string>("");
  const [inHold, setInHold] = useState<boolean>(false);
  
  // Start de timer wanneer een gesprek actief wordt
  useState(() => {
    let timer: NodeJS.Timeout;
    
    if (activeCall) {
      // Set start time
      const now = new Date();
      setCallStartTime(
        `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
      );
      setCallDuration(0);
      
      // Start duration timer
      timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [activeCall]);
  
  // Format duration as mm:ss
  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const toggleHold = () => {
    setInHold(!inHold);
  };

  return (
    <Card className={activeCall ? "border-medical" : ""}>
      <CardHeader className={`pb-2 ${activeCall ? "bg-medical-muted" : ""}`}>
        <CardTitle className="text-xl flex items-center">
          <Phone className="h-5 w-5 mr-2" />
          {activeCall ? "Actief gesprek" : "Telefooncentrale"}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {activeCall ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center">
                  <Badge className={`${inHold ? "bg-amber-500" : "bg-green-500"} mr-2 animate-pulse`}>
                    {inHold ? "In wacht" : "Live"}
                  </Badge>
                  <h3 className="font-medium">Inkomend gesprek: 06-55443322</h3>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Gestart om {callStartTime} • Duur: {formatDuration(callDuration)}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant={inHold ? "default" : "outline"} 
                  size="sm"
                  onClick={toggleHold}
                  className={inHold ? "bg-amber-500 hover:bg-amber-600" : ""}
                >
                  {inHold ? "Hervatten" : "In wacht"}
                </Button>
                <Button variant="destructive" size="sm" onClick={onEndCall}>
                  Ophangen
                </Button>
              </div>
            </div>
            
            <TranscriptionSection activeCall={activeCall} onEndCall={onEndCall} />
            <NotesSection />
          </div>
        ) : (
          <div className="text-center py-6">
            <Phone className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">Geen actieve gesprekken</h3>
            <p className="text-muted-foreground mb-6">
              Inkomende gesprekken verschijnen hier automatisch
            </p>
            <Button onClick={onStartCall} className="bg-medical hover:bg-medical-accent">
              Simuleer inkomend gesprek
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActiveCallSection;
