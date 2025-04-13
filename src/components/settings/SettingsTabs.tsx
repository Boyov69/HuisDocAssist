
import { Settings, User, Lock, BellRing, Building, Headphones } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PracticeSettingsTab from "./PracticeSettingsTab";
import UsersSettingsTab from "./UsersSettingsTab";
import NotificationsSettingsTab from "./NotificationsSettingsTab";
import SecuritySettingsTab from "./SecuritySettingsTab";
import AISettingsTab from "./AISettingsTab";

interface SettingsTabsProps {
  onSave: () => void;
  saved: boolean;
}

const SettingsTabs = ({ onSave, saved }: SettingsTabsProps) => {
  return (
    <Tabs defaultValue="practice" className="w-full">
      <TabsList className="mb-4 grid grid-cols-1 md:grid-cols-5">
        <TabsTrigger value="practice" className="flex items-center">
          <Building className="h-4 w-4 mr-2" />
          Praktijk
        </TabsTrigger>
        <TabsTrigger value="users" className="flex items-center">
          <User className="h-4 w-4 mr-2" />
          Gebruikers
        </TabsTrigger>
        <TabsTrigger value="notifications" className="flex items-center">
          <BellRing className="h-4 w-4 mr-2" />
          Notificaties
        </TabsTrigger>
        <TabsTrigger value="security" className="flex items-center">
          <Lock className="h-4 w-4 mr-2" />
          Beveiliging
        </TabsTrigger>
        <TabsTrigger value="ai" className="flex items-center">
          <Headphones className="h-4 w-4 mr-2" />
          AI-assistent
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="practice">
        <PracticeSettingsTab onSave={onSave} saved={saved} />
      </TabsContent>
      
      <TabsContent value="users">
        <UsersSettingsTab />
      </TabsContent>
      
      <TabsContent value="notifications">
        <NotificationsSettingsTab />
      </TabsContent>
      
      <TabsContent value="security">
        <SecuritySettingsTab />
      </TabsContent>
      
      <TabsContent value="ai">
        <AISettingsTab onSave={onSave} saved={saved} />
      </TabsContent>
    </Tabs>
  );
};

export default SettingsTabs;
