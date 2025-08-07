
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: Gebruiker heeft een niet-bestaande pagina bezocht:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-medical">404</h1>
        <p className="text-2xl text-gray-600 dark:text-gray-400 mb-6">
          Oeps! Pagina niet gevonden
        </p>
        <p className="text-gray-500 dark:text-gray-500 max-w-md mx-auto mb-8">
          De pagina die u zoekt bestaat niet of is verplaatst.
        </p>
        <Button asChild className="bg-medical hover:bg-medical-accent">
          <Link to="/">Terug naar Dashboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
