
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const RecentTriages = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recente triages</CardTitle>
        <CardDescription>
          De laatste 5 uitgevoerde triages
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-10 text-muted-foreground">
          <p>Geen recente triages gevonden</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTriages;
