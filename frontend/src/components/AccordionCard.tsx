
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AccordionCardProps {
  title: string;
  description?: string;
  items?: {
    id: string;
    title: string;
    content: React.ReactNode;
  }[];
  defaultValue?: string;
  className?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  defaultOpen?: boolean; // Add support for defaultOpen prop
}

const AccordionCard = ({
  title,
  description,
  items,
  defaultValue,
  className,
  icon,
  children,
  defaultOpen,
}: AccordionCardProps) => {
  if (children) {
    return (
      <Card className={cn("shadow-sm", className)}>
        <CardHeader className="bg-gradient-to-r from-medical-muted to-muted rounded-t-lg flex flex-row items-center gap-2">
          {icon && <span>{icon}</span>}
          <div>
            <CardTitle className="text-xl font-semibold text-medical">{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {children}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("shadow-sm", className)}>
      <CardHeader className="bg-gradient-to-r from-medical-muted to-muted rounded-t-lg flex flex-row items-center gap-2">
        {icon && <span>{icon}</span>}
        <div>
          <CardTitle className="text-xl font-semibold text-medical">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {items && (
          <Accordion type="single" defaultValue={defaultValue} collapsible className="w-full">
            {items.map((item) => (
              <AccordionItem key={item.id} value={item.id} className="border-b last:border-0">
                <AccordionTrigger className="px-6 py-4 text-md font-medium hover:bg-muted/50 transition-colors">
                  {item.title}
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 bg-card">
                  {item.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
};

export default AccordionCard;
