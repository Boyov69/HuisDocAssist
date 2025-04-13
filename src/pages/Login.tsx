
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { loginWithEmail, loginWithGoogle } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await loginWithEmail(email, password);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      console.error("Google login error:", error);
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
            <CardTitle>Inloggen</CardTitle>
            <CardDescription>
              Log in om toegang te krijgen tot uw AI-Frontdesk dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
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
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Wachtwoord</Label>
                  <Link 
                    to="/forgot-password" 
                    className="text-sm text-medical hover:underline"
                  >
                    Wachtwoord vergeten?
                  </Link>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-medical hover:bg-medical-accent" 
                disabled={isLoading}
              >
                {isLoading ? "Bezig met inloggen..." : "Inloggen"}
              </Button>
            </form>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  of ga verder met
                </span>
              </div>
            </div>
            
            <Button 
              type="button" 
              variant="outline" 
              className="w-full" 
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.787-1.676-4.139-2.701-6.735-2.701-5.522 0-10.013 4.491-10.013 10.013s4.491 10.013 10.013 10.013c8.279 0 10.391-7.725 9.51-11.693h-9.51z"
                  fill="#4285F4"
                />
              </svg>
              Google
            </Button>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Nog geen account?{" "}
              <Link to="/register" className="text-medical hover:underline">
                Registreren
              </Link>
            </p>
          </CardFooter>
        </Card>
        
        <div className="text-center mt-8 text-xs text-gray-500 dark:text-gray-400">
          <p>Testgebruikers:</p>
          <p>huisarts@test.com / assistent@test.com / admin@test.com</p>
          <p>Wachtwoord: password</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
