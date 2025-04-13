
import React from "react";
import { Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccordionCard from "@/components/AccordionCard";
import CallDetails from "./CallDetails";
import EditNotesDialog from "./EditNotesDialog";
import CallbackDialog from "./CallbackDialog";
import { useCallHistory } from "./useCallHistory";

const CallHistoryTabs = () => {
  const {
    recentCalls,
    editingCall,
    editedNotes,
    setEditedNotes,
    setEditingCall,
    callbackDialogOpen,
    setCallbackDialogOpen,
    callbackNumber,
    callbackName,
    handleEditClick,
    saveEditedNotes,
    handleCallbackClick,
    startCallback
  } = useCallHistory();

  return (
    <>
      <Tabs defaultValue="recent" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="recent">Recente gesprekken</TabsTrigger>
          <TabsTrigger value="missed">Gemiste gesprekken</TabsTrigger>
          <TabsTrigger value="all">Alle gesprekken</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recent" className="space-y-4">
          {recentCalls.map((call) => (
            <AccordionCard
              key={call.id}
              title={`${call.time} - ${call.caller} (${call.phoneNumber})`}
              icon={<Phone className="h-5 w-5" />}
            >
              <CallDetails
                call={call}
                onEditClick={handleEditClick}
                onCallbackClick={handleCallbackClick}
              />
            </AccordionCard>
          ))}
        </TabsContent>
        
        <TabsContent value="missed">
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground text-center py-6">
                Geen gemiste gesprekken vandaag.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="all">
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground mb-4">
                Historie van alle telefoongesprekken.
              </p>
              <div className="text-center py-10">
                <p>Functionaliteit in ontwikkeling</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog voor het bewerken van notities */}
      <EditNotesDialog
        call={editingCall}
        editedNotes={editedNotes}
        onNotesChange={setEditedNotes}
        onSave={saveEditedNotes}
        onCancel={() => setEditingCall(null)}
      />

      {/* Dialog voor terugbellen */}
      <CallbackDialog
        open={callbackDialogOpen}
        callbackName={callbackName}
        callbackNumber={callbackNumber}
        onClose={() => setCallbackDialogOpen(false)}
        onStartCallback={startCallback}
      />
    </>
  );
};

export default CallHistoryTabs;
