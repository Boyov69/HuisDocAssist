
import { MessageSquare, Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranscription } from "@/hooks/use-transcription";
import ApiKeyDialog from "./ApiKeyDialog";
import { useEffect } from "react";

interface TranscriptionSectionProps {
  activeCall: boolean;
  onEndCall?: () => void;
}

const TranscriptionSection = ({ activeCall, onEndCall }: TranscriptionSectionProps) => {
  const {
    isRecording,
    transcriptLines,
    startRecording,
    stopRecording,
    clearTranscription,
    apiKeyInput,
    setApiKeyInput,
    showApiKeyDialog,
    setShowApiKeyDialog,
    saveApiKey
  } = useTranscription();

  // Wanneer een gesprek wordt beëindigd of gestart
  useEffect(() => {
    if (!activeCall) {
      stopRecording();
    } else {
      clearTranscription();
    }
  }, [activeCall, stopRecording, clearTranscription]);

  return (
    <>
      <div className="border rounded-md p-4 bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-medium flex items-center">
            <MessageSquare className="h-4 w-4 mr-2 text-medical" />
            Live transcriptie
          </h4>
          <div className="flex items-center space-x-2">
            {activeCall && (
              <Button
                variant={isRecording ? "destructive" : "outline"}
                size="sm"
                onClick={isRecording ? stopRecording : startRecording}
                className="flex items-center space-x-1"
              >
                {isRecording ? (
                  <>
                    <MicOff className="h-4 w-4 mr-1" />
                    <span>Stop opname</span>
                  </>
                ) : (
                  <>
                    <Mic className="h-4 w-4 mr-1" />
                    <span>Start opname</span>
                  </>
                )}
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowApiKeyDialog(true)}
            >
              API Sleutel
            </Button>
          </div>
        </div>

        <ScrollArea className="h-[200px] relative">
          <div className="text-sm space-y-2">
            {transcriptLines.length > 0 ? (
              transcriptLines.map((line) => (
                <p
                  key={line.id}
                  className={
                    line.isProcessing
                      ? "animate-pulse border-l-2 border-medical pl-2"
                      : ""
                  }
                >
                  <span className="font-medium">
                    {line.speaker === "beller" ? "Beller" : "Assistente"}:
                  </span>{" "}
                  {line.text}
                </p>
              ))
            ) : activeCall ? (
              <p className="text-muted-foreground italic">
                Transcriptie zal hier verschijnen. Klik op "Start opname" om te beginnen.
              </p>
            ) : (
              <>
                <p><span className="font-medium">Beller:</span> Goedemorgen, ik wil graag een afspraak maken bij de huisarts.</p>
                <p><span className="font-medium">Assistente:</span> Goedemorgen, dat kan. Waar gaat het om?</p>
                <p><span className="font-medium">Beller:</span> Ik heb al een paar dagen keelpijn en het wordt niet beter.</p>
                <p><span className="font-medium">Assistente:</span> Heeft u ook koorts of andere klachten?</p>
                <p className="animate-pulse border-l-2 border-medical pl-2">
                  <span className="font-medium">Beller:</span> Ja, ik voel me ook wat grieperig en...
                </p>
              </>
            )}
          </div>
        </ScrollArea>
      </div>

      <ApiKeyDialog
        open={showApiKeyDialog}
        onOpenChange={setShowApiKeyDialog}
        apiKey={apiKeyInput}
        onApiKeyChange={setApiKeyInput}
        onSave={saveApiKey}
      />
    </>
  );
};

export default TranscriptionSection;
