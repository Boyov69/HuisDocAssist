
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database, ServerCog, Shield, Globe, Bell } from "lucide-react";
import { toast } from "sonner";

const SuperAdminSystemStatus = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Systeem status</CardTitle>
        <CardDescription>
          Huidige status van alle subsystemen
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Database className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>Database clusters</span>
            </div>
            <div className="flex items-center">
              <span className="text-green-600 bg-green-100 dark:bg-green-900 px-2 py-1 rounded-full text-xs">Online</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <ServerCog className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>Application servers</span>
            </div>
            <div className="flex items-center">
              <span className="text-green-600 bg-green-100 dark:bg-green-900 px-2 py-1 rounded-full text-xs">Online</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Shield className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>Security services</span>
            </div>
            <div className="flex items-center">
              <span className="text-green-600 bg-green-100 dark:bg-green-900 px-2 py-1 rounded-full text-xs">Online</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>API gateways</span>
            </div>
            <div className="flex items-center">
              <span className="text-amber-600 bg-amber-100 dark:bg-amber-900 px-2 py-1 rounded-full text-xs">Gedeeltelijk</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Bell className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>Notification services</span>
            </div>
            <div className="flex items-center">
              <span className="text-green-600 bg-green-100 dark:bg-green-900 px-2 py-1 rounded-full text-xs">Online</span>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <Button 
            className="w-full bg-medical hover:bg-medical-accent"
            onClick={() => toast.success("Systeem status vernieuwd")}
          >
            Vernieuw status
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SuperAdminSystemStatus;
