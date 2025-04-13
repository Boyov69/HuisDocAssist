
import { User, Search, FileText, Calendar, Activity, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccordionCard from "@/components/AccordionCard";

// Dummy patiënt data
const patients = [
  {
    id: 1,
    name: "Jan van Veen",
    dob: "12-05-1965",
    bsn: "123456782",
    address: "Medischstraat 10, 1234 AB Amsterdam",
    phone: "06-12345678",
    email: "jan.veen@email.com",
    lastVisit: "22-03-2025",
    conditions: ["Diabetes type 2", "Hypertensie"],
    medications: ["Metformine 500mg 2dd1", "Lisinopril 10mg 1dd1"]
  },
  {
    id: 2,
    name: "Maria Jansen",
    dob: "28-11-1978",
    bsn: "123456783",
    address: "Zorgweg 5, 1234 CD Amsterdam",
    phone: "06-23456789",
    email: "m.jansen@email.com",
    lastVisit: "01-04-2025",
    conditions: ["Migraine", "Allergische rhinitis"],
    medications: ["Sumatriptan 50mg zo nodig", "Desloratadine 5mg 1dd1"]
  },
  {
    id: 3,
    name: "Kim de Vries",
    dob: "03-07-1992",
    bsn: "123456784",
    address: "Gezondlaan 15, 1234 EF Amsterdam",
    phone: "06-34567890",
    email: "kim.devries@email.com",
    lastVisit: "05-04-2025",
    conditions: ["Eczeem"],
    medications: ["Hydrocortison crème 1% zo nodig"]
  },
  {
    id: 4,
    name: "Pieter Bakker",
    dob: "15-09-1955",
    bsn: "123456785",
    address: "Artsenplein 8, 1234 GH Amsterdam",
    phone: "06-45678901",
    email: "p.bakker@email.com",
    lastVisit: "10-04-2025",
    conditions: ["COPD", "Hypercholesterolemie"],
    medications: ["Salbutamol 100mcg 4dd1 zo nodig", "Simvastatine 40mg 1dd1"]
  },
  {
    id: 5,
    name: "Lisa Visser",
    dob: "22-02-1988",
    bsn: "123456786",
    address: "Doktershof 3, 1234 IJ Amsterdam",
    phone: "06-56789012",
    email: "l.visser@email.com",
    lastVisit: "02-04-2025",
    conditions: ["Depressie", "Slaapstoornissen"],
    medications: ["Sertraline 50mg 1dd1", "Temazepam 10mg 1dd1 zo nodig"]
  }
];

const Patienten = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2">Patiënten</h1>
        <p className="text-muted-foreground mb-6">
          Bekijk en beheer patiëntdossiers
        </p>
      </div>
      
      <div className="flex items-center space-x-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Zoek op naam, BSN, of telefoonnummer..." 
            className="pl-8"
          />
        </div>
        
        <Button className="bg-medical hover:bg-medical-accent">
          <Plus className="h-4 w-4 mr-2" />
          Nieuwe patiënt
        </Button>
      </div>
      
      <Tabs defaultValue="recent" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="recent">Recent bezocht</TabsTrigger>
          <TabsTrigger value="all">Alle patiënten</TabsTrigger>
          <TabsTrigger value="appointments">Met afspraken</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recent" className="space-y-4">
          {patients.map((patient) => (
            <AccordionCard
              key={patient.id}
              title={patient.name}
              icon={<User className="h-5 w-5" />}
            >
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-sm mb-2 text-medical">Persoonlijke informatie</h4>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-medium">Geboortedatum:</span> {patient.dob}
                      </p>
                      <p>
                        <span className="font-medium">BSN:</span> {patient.bsn}
                      </p>
                      <p>
                        <span className="font-medium">Adres:</span> {patient.address}
                      </p>
                      <p>
                        <span className="font-medium">Telefoon:</span> {patient.phone}
                      </p>
                      <p>
                        <span className="font-medium">E-mail:</span> {patient.email}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm mb-2 text-medical">Medische informatie</h4>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-medium">Aandoeningen:</span>{" "}
                        {patient.conditions.join(", ")}
                      </p>
                      <p>
                        <span className="font-medium">Medicatie:</span>
                      </p>
                      <ul className="list-disc pl-5">
                        {patient.medications.map((med, idx) => (
                          <li key={idx}>{med}</li>
                        ))}
                      </ul>
                      <p>
                        <span className="font-medium">Laatste bezoek:</span> {patient.lastVisit}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    Afspraak plannen
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Recepten
                  </Button>
                  <Button size="sm" className="bg-medical hover:bg-medical-accent">
                    <Activity className="h-4 w-4 mr-2" />
                    Volledig dossier
                  </Button>
                </div>
              </div>
            </AccordionCard>
          ))}
        </TabsContent>
        
        <TabsContent value="all">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-6">
                <p className="text-muted-foreground mb-6">
                  Alle patiënten in het systeem.
                </p>
                <p>Functionaliteit in ontwikkeling</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appointments">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-6">
                <p className="text-muted-foreground mb-6">
                  Patiënten met geplande afspraken.
                </p>
                <p>Functionaliteit in ontwikkeling</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Patienten;
