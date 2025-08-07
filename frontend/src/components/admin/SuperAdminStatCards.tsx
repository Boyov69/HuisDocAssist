
import { Building, Users, HardDrive, ServerCog } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface SuperAdminStatCardsProps {
  stats: {
    totalPractices: number;
    activePractices: number;
    totalUsers: number;
    activeUsers: number;
    totalStorage: number;
    usedStorage: number;
    serverLoad: number;
  };
}

const SuperAdminStatCards = ({ stats }: SuperAdminStatCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Praktijken</CardTitle>
          <Building className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalPractices}</div>
          <p className="text-xs text-muted-foreground">
            {stats.activePractices} actief
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Gebruikers</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalUsers}</div>
          <p className="text-xs text-muted-foreground">
            {stats.activeUsers} actief ({Math.round(stats.activeUsers/stats.totalUsers*100)}%)
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Opslagruimte</CardTitle>
          <HardDrive className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-1">
            <div className="text-2xl font-bold">{stats.usedStorage} GB</div>
            <div className="text-sm text-muted-foreground">van {stats.totalStorage} GB</div>
          </div>
          <Progress value={(stats.usedStorage/stats.totalStorage)*100} className="h-2" />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Server belasting</CardTitle>
          <ServerCog className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.serverLoad}%</div>
          <Progress value={stats.serverLoad} className="h-2" />
        </CardContent>
      </Card>
    </div>
  );
};

export default SuperAdminStatCards;
