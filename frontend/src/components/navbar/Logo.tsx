
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Logo = () => {
  return (
    <motion.div 
      className="flex-shrink-0"
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Link to="/" className="flex items-center">
        <motion.span 
          className="text-xl font-bold text-medical"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          AI-Frontdesk
        </motion.span>
        <motion.span 
          className="ml-2 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Huisartsassistent
        </motion.span>
      </Link>
    </motion.div>
  );
};

export default Logo;
