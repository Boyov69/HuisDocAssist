
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";

const Index = () => {
  useEffect(() => {
    // Titel van het document updaten
    document.title = "AI-Frontdesk Huisartsassistent";
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 pt-20 pb-8">
        <Outlet />
      </main>
      <footer className="py-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} AI-Frontdesk Huisartsassistent. Alle rechten voorbehouden.
        </div>
      </footer>
    </div>
  );
};

export default Index;
