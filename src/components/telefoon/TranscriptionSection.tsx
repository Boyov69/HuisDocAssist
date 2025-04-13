
import { MessageSquare } from "lucide-react";

const TranscriptionSection = () => {
  return (
    <div className="border rounded-md p-4 bg-gray-50 dark:bg-gray-800">
      <h4 className="font-medium mb-2 flex items-center">
        <MessageSquare className="h-4 w-4 mr-2 text-medical" />
        Live transcriptie
      </h4>
      <div className="text-sm space-y-2">
        <p><span className="font-medium">Beller:</span> Goedemorgen, ik wil graag een afspraak maken bij de huisarts.</p>
        <p><span className="font-medium">Assistente:</span> Goedemorgen, dat kan. Waar gaat het om?</p>
        <p><span className="font-medium">Beller:</span> Ik heb al een paar dagen keelpijn en het wordt niet beter.</p>
        <p><span className="font-medium">Assistente:</span> Heeft u ook koorts of andere klachten?</p>
        <p className="animate-pulse border-l-2 border-medical pl-2">
          <span className="font-medium">Beller:</span> Ja, ik voel me ook wat grieperig en...
        </p>
      </div>
    </div>
  );
};

export default TranscriptionSection;
