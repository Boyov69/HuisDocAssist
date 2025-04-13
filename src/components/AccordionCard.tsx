
import { useState, ReactNode } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionCardProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

const AccordionCard = ({
  title,
  icon,
  children,
  defaultOpen = false,
  className,
}: AccordionCardProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Card className={cn("overflow-hidden mb-4", className)}>
      <CardHeader
        className="p-4 cursor-pointer flex flex-row items-center justify-between bg-medical-muted"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          {icon && <span className="mr-2 text-medical">{icon}</span>}
          <h3 className="font-medium text-medical-muted-foreground">{title}</h3>
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-medical-muted-foreground transition-transform duration-200",
            isOpen && "transform rotate-180"
          )}
        />
      </CardHeader>
      {isOpen && (
        <CardContent className="p-4 animate-accordion-down">
          {children}
        </CardContent>
      )}
    </Card>
  );
};

export default AccordionCard;
