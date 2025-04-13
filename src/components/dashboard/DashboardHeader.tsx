
import React from "react";
import { useAuth } from "@/contexts/AuthContext";

const DashboardHeader = () => {
  const { user } = useAuth();
  
  return (
    <section className="mb-8">
      <h1 className="text-3xl font-bold mb-2">
        Welkom, {user?.name}
      </h1>
      <p className="text-muted-foreground mb-6">
        Dashboard overzicht van uw praktijk
      </p>
    </section>
  );
};

export default DashboardHeader;
