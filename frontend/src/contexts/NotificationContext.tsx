
import React, { createContext, useContext, useState, useCallback } from "react";
import FloatingNotification from "@/components/FloatingNotification";

type NotificationType = "info" | "success" | "warning" | "error";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  duration?: number;
}

interface NotificationContextType {
  showNotification: (
    title: string,
    message: string,
    type?: NotificationType,
    duration?: number
  ) => void;
  hideNotification: (id: string) => void;
  clearAllNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider: React.FC<React.PropsWithChildren<{}>> = ({ 
  children 
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = useCallback(
    (
      title: string,
      message: string,
      type: NotificationType = "info",
      duration = 5000
    ) => {
      const id = Date.now().toString();
      setNotifications((prev) => [
        ...prev,
        { id, title, message, type, duration },
      ]);
    },
    []
  );

  const hideNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  return (
    <NotificationContext.Provider
      value={{ showNotification, hideNotification, clearAllNotifications }}
    >
      {children}
      {notifications.map((notification) => (
        <FloatingNotification
          key={notification.id}
          title={notification.title}
          message={notification.message}
          type={notification.type}
          duration={notification.duration}
          onClose={() => hideNotification(notification.id)}
        />
      ))}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};
