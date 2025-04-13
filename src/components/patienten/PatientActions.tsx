
import React from "react";
import { FileText, Calendar, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

const PatientActions = () => {
  return (
    <div className="flex items-center justify-end space-x-2">
      <Button variant="outline" size="sm">
        <Calendar className="h-4 w-4 mr-2" />
        Afspraak plannen
      </Button>
      <Button variant="outline" size="sm">
        <FileText className="h-4 w-4 mr-2" />
        Recepten
      </Button>
      <Button size="sm" className="bg-medical hover:bg-medical-accent">
        <Activity className="h-4 w-4 mr-2" />
        Volledig dossier
      </Button>
    </div>
  );
};

export default PatientActions;
