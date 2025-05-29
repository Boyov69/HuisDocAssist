
import { useState, useRef, useCallback, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNotification } from "@/contexts/NotificationContext";
import { transcribeAudio, getApiKey, setApiKey, TranscriptionResult } from "@/services/elevenLabsService";

export interface TranscriptionLine {
  id: string;
  text: string;
  speaker: "beller" | "assistent";
  timestamp: Date;
  isProcessing?: boolean;
}

export const useTranscription = () => {
  const { toast } = useToast();
  const { showNotification } = useNotification();
  const [isRecording, setIsRecording] = useState(false);
  const [transcriptLines, setTranscriptLines] = useState<TranscriptionLine[]>([]);
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Laad de API sleutel uit localStorage bij het laden van de hook
  useEffect(() => {
    const key = getApiKey();
    setApiKeyInput(key);
    if (!key) {
      setShowApiKeyDialog(true);
    }
  }, []);

  // Functie om de API sleutel op te slaan
  const saveApiKey = useCallback(() => {
    setApiKey(apiKeyInput);
    setShowApiKeyDialog(false);
    toast({
      title: "API sleutel opgeslagen",
      description: "Je ElevenLabs API sleutel is succesvol opgeslagen.",
    });
  }, [apiKeyInput, toast]);

  // Start audio opname
  const startRecording = useCallback(async () => {
    if (!getApiKey()) {
      setShowApiKeyDialog(true);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const newLineId = Date.now().toString();
        
        // Voeg een tijdelijke regel toe die aangeeft dat transcriptie bezig is
        setTranscriptLines((prev) => [
          ...prev,
          {
            id: newLineId,
            text: "Audio wordt getranscribeerd...",
            speaker: "beller",
            timestamp: new Date(),
            isProcessing: true,
          },
        ]);

        // Transcribeer de audio
        const result = await transcribeAudio(audioBlob);
        
        if (result) {
          // Update de regel met de transcriptie
          setTranscriptLines((prev) =>
            prev.map((line) =>
              line.id === newLineId
                ? {
                    ...line,
                    text: result.text,
                    isProcessing: false,
                  }
                : line
            )
          );
        } else {
          // Verwijder de tijdelijke regel bij een fout
          setTranscriptLines((prev) => prev.filter((line) => line.id !== newLineId));
          
          showNotification(
            "Transcriptie mislukt",
            "Er is een fout opgetreden bij het transcriberen van de audio.",
            "error"
          );
        }
      };

      mediaRecorder.start(1000); // Chunk elke seconde
      setIsRecording(true);
    } catch (error) {
      console.error("Kon microfoon niet gebruiken:", error);
      toast({
        title: "Microfoon niet beschikbaar",
        description: "Zorg dat je toestemming geeft voor het gebruik van de microfoon.",
        variant: "destructive",
      });
    }
  }, [showNotification, toast]);

  // Stop audio opname
  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      // Stop alle actieve tracks
      if (mediaRecorderRef.current.stream) {
        mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
      }
    }
  }, [isRecording]);

  // Voeg handmatig een nieuwe regel toe voor de assistent
  const addAssistantLine = useCallback((text: string) => {
    setTranscriptLines((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text,
        speaker: "assistent",
        timestamp: new Date(),
      },
    ]);
  }, []);

  // Wis alle transcriptie regels
  const clearTranscription = useCallback(() => {
    setTranscriptLines([]);
  }, []);

  return {
    isRecording,
    transcriptLines,
    startRecording,
    stopRecording,
    addAssistantLine,
    clearTranscription,
    apiKeyInput,
    setApiKeyInput,
    showApiKeyDialog,
    setShowApiKeyDialog,
    saveApiKey,
  };
};
