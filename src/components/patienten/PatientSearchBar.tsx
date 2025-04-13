
import React from "react";
import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PatientSearchBarProps {
  onSearch?: (query: string) => void;
}

const PatientSearchBar = ({ onSearch }: PatientSearchBarProps) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <div className="flex items-center space-x-2 mb-4">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input 
          type="search" 
          placeholder="Zoek op naam, BSN, of telefoonnummer..." 
          className="pl-8"
          onChange={handleSearch}
        />
      </div>
      
      <Button className="bg-medical hover:bg-medical-accent">
        <Plus className="h-4 w-4 mr-2" />
        Nieuwe patiënt
      </Button>
    </div>
  );
};

export default PatientSearchBar;
