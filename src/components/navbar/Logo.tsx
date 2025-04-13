
import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="flex-shrink-0">
      <Link to="/" className="flex items-center">
        <span className="text-xl font-bold text-medical">AI-Frontdesk</span>
        <span className="ml-2 text-sm text-muted-foreground">Huisartsassistent</span>
      </Link>
    </div>
  );
};

export default Logo;
