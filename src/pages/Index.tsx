
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Update document title
    document.title = "AI-Frontdesk Huisartsassistent";
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      <Navbar />
      
      <motion.main 
        key={location.pathname}
        className="flex-1 container mx-auto px-4 pt-20 pb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        <Outlet />
      </motion.main>
      
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
