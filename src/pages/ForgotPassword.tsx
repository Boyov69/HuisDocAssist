
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const { forgotPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await forgotPassword(email);
      setIsSent(true);
    } catch (error) {
      console.error("Forgot password error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-medical">AI-Frontdesk</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Huisartsassistent</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Wachtwoord vergeten</CardTitle>
            <CardDescription>
              Voer uw e-mailadres in om een wachtwoord reset link te ontvangen
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isSent ? (
              <div className="text-center py-4">
                <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                  Reset-link is verstuurd naar uw e-mailadres. Controleer uw inbox.
                </div>
                <Link to="/login" className="text-medical hover:underline">
                  Terug naar inloggen
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mailadres</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="uw@email.nl" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-medical hover:bg-medical-accent" 
                  disabled={isLoading}
                >
                  {isLoading ? "Bezig met verzenden..." : "Reset link versturen"}
                </Button>
              </form>
            )}
          </CardContent>
          {!isSent && (
            <CardFooter className="flex justify-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Herinnert u zich uw wachtwoord?{" "}
                <Link to="/login" className="text-medical hover:underline">
                  Inloggen
                </Link>
              </p>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
