
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Building } from "lucide-react";
import { toast } from "sonner";

interface Practice {
  id: number;
  name: string;
  users: number;
  status: string;
  region: string;
  aiEnabled: boolean;
}

interface SuperAdminPracticeManagementProps {
  practices: Practice[];
  onPracticesChange: (updatedPractices: Practice[]) => void;
}

const SuperAdminPracticeManagement = ({ practices, onPracticesChange }: SuperAdminPracticeManagementProps) => {
  const handleTogglePracticeStatus = (id: number) => {
    const updatedPractices = practices.map(practice => {
      if (practice.id === id) {
        const newStatus = practice.status === "Actief" ? "Inactief" : "Actief";
        toast.success(`Praktijk status bijgewerkt naar ${newStatus}`);
        return { ...practice, status: newStatus };
      }
      return practice;
    });
    
    onPracticesChange(updatedPractices);
  };

  const handleToggleAI = (id: number) => {
    const updatedPractices = practices.map(practice => {
      if (practice.id === id) {
        const newAiStatus = !practice.aiEnabled;
        toast.success(`AI-functionaliteit ${newAiStatus ? 'ingeschakeld' : 'uitgeschakeld'} voor praktijk ID ${id}`);
        return { ...practice, aiEnabled: newAiStatus };
      }
      return practice;
    });
    
    onPracticesChange(updatedPractices);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Praktijkenbeheer</CardTitle>
            <CardDescription>
              Beheer alle praktijken in het systeem
            </CardDescription>
          </div>
          <Button className="bg-medical hover:bg-medical-accent" onClick={() => toast.success("Deze functie wordt binnenkort geïmplementeerd")}>
            <Building className="h-4 w-4 mr-2" /> Nieuwe praktijk
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Praktijk</TableHead>
              <TableHead>Regio</TableHead>
              <TableHead>Gebruikers</TableHead>
              <TableHead>AI-functionaliteit</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Acties</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {practices.map((practice) => (
              <TableRow key={practice.id}>
                <TableCell className="font-medium">{practice.name}</TableCell>
                <TableCell>{practice.region}</TableCell>
                <TableCell>{practice.users}</TableCell>
                <TableCell>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className={practice.aiEnabled ? "bg-green-100 hover:bg-green-200 text-green-800" : "bg-gray-100 hover:bg-gray-200 text-gray-800"}
                    onClick={() => handleToggleAI(practice.id)}
                  >
                    {practice.aiEnabled ? "Ingeschakeld" : "Uitgeschakeld"}
                  </Button>
                </TableCell>
                <TableCell>
                  <span className={`capitalize px-2 py-1 rounded-full text-xs ${
                    practice.status === 'Actief' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 
                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                  }`}>
                    {practice.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" className="mr-2" onClick={() => toast.success("Deze functie wordt binnenkort geïmplementeerd")}>
                    Details
                  </Button>
                  <Button 
                    variant={practice.status === "Actief" ? "destructive" : "outline"}
                    size="sm"
                    onClick={() => handleTogglePracticeStatus(practice.id)}
                  >
                    {practice.status === "Actief" ? "Deactiveren" : "Activeren"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default SuperAdminPracticeManagement;
