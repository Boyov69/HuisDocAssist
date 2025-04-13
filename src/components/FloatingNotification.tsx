
import React, { useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useAnimation } from "@/hooks/use-animations";

interface FloatingNotificationProps {
  title: string;
  message: string;
  type?: "info" | "success" | "warning" | "error";
  duration?: number;
  onClose?: () => void;
  className?: string;
}

const FloatingNotification = ({
  title,
  message,
  type = "info",
  duration = 5000,
  onClose,
  className,
}: FloatingNotificationProps) => {
  const { animationState, hide, isVisible } = useAnimation(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      hide();
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration, hide]);

  useEffect(() => {
    if (animationState === "exited" && onClose) {
      onClose();
    }
  }, [animationState, onClose]);

  if (!isVisible) return null;

  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return "border-green-500 bg-green-50 dark:bg-green-950/30";
      case "warning":
        return "border-amber-500 bg-amber-50 dark:bg-amber-950/30";
      case "error":
        return "border-red-500 bg-red-50 dark:bg-red-950/30";
      default:
        return "border-medical bg-medical-muted";
    }
  };

  return (
    <Card
      className={cn(
        "fixed bottom-4 right-4 z-50 w-80 border-l-4 shadow-lg",
        getTypeStyles(),
        {
          "animate-fade-in": animationState === "entering",
          "animate-fade-out": animationState === "exiting",
        },
        className
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0"
          onClick={hide}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </CardHeader>
      <CardContent className="p-4 pt-0 text-sm">{message}</CardContent>
    </Card>
  );
};

export default FloatingNotification;
