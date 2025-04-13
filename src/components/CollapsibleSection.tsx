
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  defaultOpen?: boolean;
}

const CollapsibleSection = ({
  title,
  children,
  icon,
  className,
  triggerClassName,
  contentClassName,
  defaultOpen = false,
}: CollapsibleSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className={cn("w-full", className)}
    >
      <CollapsibleTrigger
        className={cn(
          "flex w-full items-center justify-between py-2 text-left font-medium transition-all",
          isOpen ? "text-medical" : "text-foreground",
          triggerClassName
        )}
      >
        <div className="flex items-center gap-2">
          {icon}
          <span>{title}</span>
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            isOpen ? "rotate-180 transform" : ""
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent
        className={cn(
          "animate-accordion-down overflow-hidden pt-2 text-sm",
          contentClassName
        )}
      >
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default CollapsibleSection;
