
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  useEffect(() => {
    // Titel van het document updaten
    document.title = "AI-Frontdesk Huisartsassistent";
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 pt-20 pb-8 animate-fade-in">
        <Outlet />
      </main>
      <footer className="py-4 bg-card border-t border-border">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} AI-Frontdesk Huisartsassistent. Alle rechten voorbehouden.
        </div>
      </footer>
      <Toaster />
    </div>
  );
};

export default Index;
