
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
  items: {
    id: string;
    title: string;
    content: React.ReactNode;
  }[];
  defaultValue?: string;
  className?: string;
}

const AccordionCard = ({
  title,
  description,
  items,
  defaultValue,
  className,
}: AccordionCardProps) => {
  return (
    <Card className={cn("shadow-sm", className)}>
      <CardHeader className="bg-gradient-to-r from-medical-muted to-muted rounded-t-lg">
        <CardTitle className="text-xl font-semibold text-medical">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="p-0">
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
      </CardContent>
    </Card>
  );
};

export default AccordionCard;
