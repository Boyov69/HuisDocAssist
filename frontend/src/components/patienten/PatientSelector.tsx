
import React, { useState } from "react";
import { User, Search, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Patient } from "@/components/patienten/PatientCard";
import { cn } from "@/lib/utils";

interface PatientSelectorProps {
  patients: Patient[];
  onSelect: (patient: Patient) => void;
  selectedPatient?: Patient;
}

const PatientSelector = ({ patients, onSelect, selectedPatient }: PatientSelectorProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          role="combobox" 
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedPatient ? (
            <div className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              <span>{selectedPatient.name}</span>
            </div>
          ) : (
            <div className="flex items-center">
              <Search className="mr-2 h-4 w-4" />
              <span>Zoek een patiënt...</span>
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder="Zoek op naam, BSN of telefoon..." />
          <CommandList>
            <CommandEmpty>Geen patiënten gevonden.</CommandEmpty>
            <CommandGroup heading="Patiënten">
              {patients.map((patient) => (
                <CommandItem
                  key={patient.id}
                  value={patient.name}
                  onSelect={() => {
                    onSelect(patient);
                    setOpen(false);
                  }}
                  className="cursor-pointer"
                >
                  <div className="flex items-center">
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedPatient?.id === patient.id 
                          ? "opacity-100" 
                          : "opacity-0"
                      )}
                    />
                    <div>
                      <p>{patient.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {patient.dob} • {patient.phone}
                      </p>
                    </div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default PatientSelector;
