
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface Incident {
  id: number;
  type: string;
  location: string;
  date: string;
  status: string;
  severity: string;
}

interface SuperAdminIncidentManagementProps {
  incidents: Incident[];
  onIncidentsChange: (updatedIncidents: Incident[]) => void;
  showShortList?: boolean;
  onViewAll?: () => void;
}

const SuperAdminIncidentManagement = ({ 
  incidents, 
  onIncidentsChange, 
  showShortList = false,
  onViewAll
}: SuperAdminIncidentManagementProps) => {
  
  const displayIncidents = showShortList ? incidents.slice(0, 3) : incidents;
  
  const resolveIncident = (id: number) => {
    const updatedIncidents = incidents.map(incident => {
      if (incident.id === id) {
        toast.success(`Incident #${id} is als opgelost gemarkeerd`);
        return { ...incident, status: "Opgelost" };
      }
      return incident;
    });
    
    onIncidentsChange(updatedIncidents);
  };

  // Short list view for dashboard overview
  if (showShortList) {
    return (
      <div className="space-y-4">
        {displayIncidents.map((incident) => (
          <div key={incident.id} className="flex items-start justify-between border-b pb-3">
            <div>
              <h4 className="font-medium flex items-center">
                <AlertTriangle className={`h-4 w-4 mr-2 ${
                  incident.severity === 'Kritiek' ? 'text-red-500' :
                  incident.severity === 'Hoog' ? 'text-amber-500' : 'text-blue-500'
                }`} />
                {incident.type}
              </h4>
              <p className="text-sm text-muted-foreground mt-1">{incident.location} - {incident.date}</p>
            </div>
            <div>
              <span className={`${
                incident.status === 'Opgelost' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 
                'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300'
              } px-2 py-1 rounded-full text-xs`}>
                {incident.status}
              </span>
            </div>
          </div>
        ))}
        
        {onViewAll && (
          <div className="mt-6">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={onViewAll}
            >
              Bekijk alle incidenten
            </Button>
          </div>
        )}
      </div>
    );
  }

  // Full table view for incidents tab
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Incidentenbeheer</CardTitle>
            <CardDescription>
              Beheer en monitor systeem incidenten
            </CardDescription>
          </div>
          <Button className="bg-medical hover:bg-medical-accent" onClick={() => toast.success("Deze functie wordt binnenkort geïmplementeerd")}>
            <AlertTriangle className="h-4 w-4 mr-2" /> Nieuw incident
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Locatie</TableHead>
              <TableHead>Ernst</TableHead>
              <TableHead>Datum</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Acties</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {incidents.map((incident) => (
              <TableRow key={incident.id}>
                <TableCell>#{incident.id}</TableCell>
                <TableCell className="font-medium">{incident.type}</TableCell>
                <TableCell>{incident.location}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    incident.severity === 'Kritiek' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' : 
                    incident.severity === 'Hoog' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300' : 
                    'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                  }`}>
                    {incident.severity}
                  </span>
                </TableCell>
                <TableCell>{incident.date}</TableCell>
                <TableCell>
                  <span className={`capitalize px-2 py-1 rounded-full text-xs ${
                    incident.status === 'Opgelost' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 
                    'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300'
                  }`}>
                    {incident.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" className="mr-2" onClick={() => toast.success("Deze functie wordt binnenkort geïmplementeerd")}>
                    Details
                  </Button>
                  {incident.status !== "Opgelost" && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="bg-green-100 hover:bg-green-200 text-green-800"
                      onClick={() => resolveIncident(incident.id)}
                    >
                      Oplossen
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default SuperAdminIncidentManagement;
