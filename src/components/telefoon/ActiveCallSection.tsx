
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
                  <Badge className="bg-green-500 mr-2 animate-pulse">Live</Badge>
                  <h3 className="font-medium">Inkomend gesprek: 06-55443322</h3>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Gestart om 09:32 • Duur: 01:24
                </p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  In wacht
                </Button>
                <Button variant="destructive" size="sm" onClick={onEndCall}>
                  Ophangen
                </Button>
              </div>
            </div>
            
            <TranscriptionSection />
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
