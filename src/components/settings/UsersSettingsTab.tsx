
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const UsersSettingsTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gebruikersbeheer</CardTitle>
        <CardDescription>
          Beheer alle gebruikers van de praktijk
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-10">
          <p>Functionaliteit in ontwikkeling</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default UsersSettingsTab;
