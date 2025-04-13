
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Call } from "./types";

export const useCallHistory = () => {
  const { toast } = useToast();
  const [editingCall, setEditingCall] = useState<Call | null>(null);
  const [editedNotes, setEditedNotes] = useState("");
  const [callbackDialogOpen, setCallbackDialogOpen] = useState(false);
  const [callbackNumber, setCallbackNumber] = useState("");
  const [callbackName, setCallbackName] = useState("");
  
  // Dummy data voor recente gesprekken
  const [recentCalls, setRecentCalls] = useState<Call[]>([
    {
      id: 1,
      phoneNumber: "06-12345678",
      caller: "Mevr. Smits",
      time: "08:45",
      date: "13 April 2025",
      duration: "3:24",
      notes: "Vraag over medicatie. Patient gebruikt diclofenac en vroeg of ze dit mag combineren met ibuprofen. Geadviseerd om dit niet te doen en contact op te nemen met apotheek voor alternatieven.",
      status: "completed",
      transcription: "Goedemorgen, met mevrouw Smits. Ik heb een vraag over mijn medicijnen. Ik gebruik diclofenac voor mijn knie, maar nu heb ik ook hoofdpijn. Mag ik daar ibuprofen voor nemen?"
    },
    {
      id: 2,
      phoneNumber: "06-87654321",
      caller: "Dhr. Janssen",
      time: "08:32",
      date: "13 April 2025",
      duration: "2:10",
      notes: "Wil afspraak van vrijdag verzetten naar volgende week dinsdag. Nieuwe afspraak ingepland voor 10:30.",
      status: "completed",
      transcription: "Goedemorgen, u spreekt met meneer Janssen. Ik heb een afspraak staan voor aanstaande vrijdag, maar ik kan dan helaas niet. Kan ik deze verzetten naar volgende week dinsdag?"
    },
    {
      id: 3,
      phoneNumber: "070-1234567",
      caller: "Apotheek",
      time: "08:15",
      date: "13 April 2025",
      duration: "4:45",
      notes: "Overleg over recept van Dhr. Pietersen. Dosering aangepast na overleg met huisarts.",
      status: "completed",
      transcription: "Goedemorgen, u spreekt met apotheker de Vries van Apotheek Centrum. Ik bel over het recept van meneer Pietersen. De dosering lijkt niet te kloppen."
    }
  ]);

  const handleEditClick = (call: Call) => {
    setEditingCall(call);
    setEditedNotes(call.notes);
  };

  const saveEditedNotes = () => {
    if (!editingCall) return;
    
    const updatedCalls = recentCalls.map(call => {
      if (call.id === editingCall.id) {
        return { ...call, notes: editedNotes };
      }
      return call;
    });
    
    setRecentCalls(updatedCalls);
    setEditingCall(null);
    
    toast({
      title: "Notities bijgewerkt",
      description: "De notities zijn succesvol opgeslagen.",
    });
  };

  const handleCallbackClick = (call: Call) => {
    setCallbackDialogOpen(true);
    setCallbackNumber(call.phoneNumber);
    setCallbackName(call.caller);
  };

  const startCallback = () => {
    // Hier zou in een echte implementatie de terugbel-functionaliteit worden gestart
    setCallbackDialogOpen(false);
    
    toast({
      title: "Terugbellen gestart",
      description: `${callbackName} (${callbackNumber}) wordt nu gebeld.`,
    });
  };

  return {
    recentCalls,
    editingCall,
    setEditingCall,
    editedNotes,
    setEditedNotes,
    callbackDialogOpen,
    setCallbackDialogOpen,
    callbackNumber,
    callbackName,
    handleEditClick,
    saveEditedNotes,
    handleCallbackClick,
    startCallback
  };
};
