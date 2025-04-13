
import React from "react";
import { Phone, User, Clock, MessageSquare, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Call } from "./types";

interface CallDetailsProps {
  call: Call;
  onEditClick: (call: Call) => void;
  onCallbackClick: (call: Call) => void;
}

const CallDetails: React.FC<CallDetailsProps> = ({
  call,
  onEditClick,
  onCallbackClick,
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center mb-2">
            <User className="h-4 w-4 mr-2 text-medical" />
            <span className="font-medium">Beller</span>
          </div>
          <p className="text-sm text-muted-foreground ml-6">
            {call.caller} ({call.phoneNumber})
          </p>
        </div>
        
        <div>
          <div className="flex items-center mb-2">
            <Clock className="h-4 w-4 mr-2 text-medical" />
            <span className="font-medium">Tijdstip & Duur</span>
          </div>
          <p className="text-sm text-muted-foreground ml-6">
            {call.time}, {call.date} ({call.duration})
          </p>
        </div>
      </div>
      
      <div>
        <div className="flex items-center mb-2">
          <MessageSquare className="h-4 w-4 mr-2 text-medical" />
          <span className="font-medium">Transcriptie</span>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md text-sm">
          {call.transcription}
        </div>
      </div>
      
      <div>
        <div className="flex items-center mb-2">
          <Save className="h-4 w-4 mr-2 text-medical" />
          <span className="font-medium">Notities</span>
        </div>
        <p className="text-sm text-muted-foreground ml-6">
          {call.notes}
        </p>
      </div>
      
      <div className="flex items-center justify-end space-x-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onEditClick(call)}
        >
          Bewerken
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onCallbackClick(call)}
        >
          Terugbellen
        </Button>
        <Button size="sm" className="bg-medical hover:bg-medical-accent">
          Toevoegen aan dossier
        </Button>
      </div>
    </div>
  );
};

export default CallDetails;
