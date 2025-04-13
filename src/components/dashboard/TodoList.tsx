
import React from "react";
import { ClipboardList } from "lucide-react";
import AccordionCard from "@/components/AccordionCard";

const TodoList = () => {
  return (
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
  );
};

export default TodoList;
