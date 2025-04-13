
import { Calendar, Phone, Users, ClipboardList, Settings } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AccordionCard from "@/components/AccordionCard";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 animate-fade-in">
      <section className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Welkom, {user?.name}
        </h1>
        <p className="text-muted-foreground mb-6">
          Dashboard overzicht van uw praktijk
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Afspraken vandaag
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                3 meer dan gisteren
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Telefoontjes vandaag
              </CardTitle>
              <Phone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">
                2 minder dan gisteren
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Patiënten gezien
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">21</div>
              <p className="text-xs text-muted-foreground">
                5 meer dan gisteren
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Triages uitgevoerd
              </CardTitle>
              <ClipboardList className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">16</div>
              <p className="text-xs text-muted-foreground">
                1 meer dan gisteren
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <section>
        <h2 className="text-xl font-semibold mb-4">Praktijkoverzicht</h2>
        
        <AccordionCard 
          title="Afspraken vandaag" 
          icon={<Calendar className="h-5 w-5" />}
          defaultOpen={true}
        >
          <div className="space-y-4">
            <div className="border-b pb-2">
              <div className="flex justify-between mb-1">
                <div className="font-medium">09:00 - Dhr. van Veen</div>
                <div className="text-sm text-medical">Controle</div>
              </div>
              <div className="text-sm text-muted-foreground">Diabetes type 2 controle</div>
            </div>
            
            <div className="border-b pb-2">
              <div className="flex justify-between mb-1">
                <div className="font-medium">09:15 - Mevr. Jansen</div>
                <div className="text-sm text-medical">Consult</div>
              </div>
              <div className="text-sm text-muted-foreground">Hoofdpijn, duizeligheid</div>
            </div>
            
            <div className="border-b pb-2">
              <div className="flex justify-between mb-1">
                <div className="font-medium">09:30 - Kim de Vries</div>
                <div className="text-sm text-medical">Consult</div>
              </div>
              <div className="text-sm text-muted-foreground">Huiduitslag</div>
            </div>
            
            <div className="border-b pb-2">
              <div className="flex justify-between mb-1">
                <div className="font-medium">09:45 - Dhr. Bakker</div>
                <div className="text-sm text-medical">Controle</div>
              </div>
              <div className="text-sm text-muted-foreground">Bloeddruk controle</div>
            </div>
            
            <div className="text-center mt-4">
              <button className="text-sm text-medical hover:underline">
                Alle afspraken bekijken
              </button>
            </div>
          </div>
        </AccordionCard>
        
        <AccordionCard 
          title="Recente telefoongesprekken" 
          icon={<Phone className="h-5 w-5" />}
          className="mt-4"
        >
          <div className="space-y-4">
            <div className="border-b pb-2">
              <div className="flex justify-between mb-1">
                <div className="font-medium">08:45 - 06-12345678</div>
                <div className="text-sm text-gray-500">2 min. geleden</div>
              </div>
              <div className="text-sm text-muted-foreground">Mevr. Smits - Vraag over medicatie</div>
            </div>
            
            <div className="border-b pb-2">
              <div className="flex justify-between mb-1">
                <div className="font-medium">08:32 - 06-87654321</div>
                <div className="text-sm text-gray-500">15 min. geleden</div>
              </div>
              <div className="text-sm text-muted-foreground">Dhr. Janssen - Afspraak verzetten</div>
            </div>
            
            <div className="border-b pb-2">
              <div className="flex justify-between mb-1">
                <div className="font-medium">08:15 - 070-1234567</div>
                <div className="text-sm text-gray-500">32 min. geleden</div>
              </div>
              <div className="text-sm text-muted-foreground">Apotheek - Overleg over recept</div>
            </div>
            
            <div className="text-center mt-4">
              <button className="text-sm text-medical hover:underline">
                Alle telefoongesprekken bekijken
              </button>
            </div>
          </div>
        </AccordionCard>
        
        <AccordionCard 
          title="Te doen vandaag" 
          icon={<ClipboardList className="h-5 w-5" />}
          className="mt-4"
        >
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                id="task1" 
                className="h-4 w-4 rounded border-gray-300 text-medical focus:ring-medical"
              />
              <label 
                htmlFor="task1" 
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Recepten controleren en ondertekenen
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                id="task2" 
                className="h-4 w-4 rounded border-gray-300 text-medical focus:ring-medical"
              />
              <label 
                htmlFor="task2" 
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Labresultaten beoordelen
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                id="task3" 
                className="h-4 w-4 rounded border-gray-300 text-medical focus:ring-medical"
              />
              <label 
                htmlFor="task3" 
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Verwijzingen schrijven
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                id="task4" 
                className="h-4 w-4 rounded border-gray-300 text-medical focus:ring-medical"
              />
              <label 
                htmlFor="task4" 
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Teamoverleg 16:00
              </label>
            </div>
          </div>
        </AccordionCard>
        
        <AccordionCard 
          title="Praktijkinstellingen" 
          icon={<Settings className="h-5 w-5" />}
          className="mt-4"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-1">Praktijkinformatie</h4>
                <p className="text-sm text-muted-foreground">
                  Huisartsenpraktijk Gezond<br />
                  Medischstraat 123<br />
                  1234 AB Amsterdam<br />
                  020-1234567
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-1">Openingstijden</h4>
                <p className="text-sm text-muted-foreground">
                  Maandag - Vrijdag: 08:00 - 17:00<br />
                  Zaterdag: Gesloten<br />
                  Zondag: Gesloten
                </p>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-1">Spoednummer</h4>
              <p className="text-sm text-muted-foreground">
                Bij spoed buiten openingstijden: 020-7654321
              </p>
            </div>
          </div>
        </AccordionCard>
      </section>
    </div>
  );
};

export default Dashboard;
