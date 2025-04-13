
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Afspraken from "./pages/Afspraken";
import Telefoon from "./pages/Telefoon";
import Patienten from "./pages/Patienten";
import Triage from "./pages/Triage";
import Instellingen from "./pages/Instellingen";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Index />}>
                <Route index element={<Dashboard />} />
                <Route path="afspraken" element={<Afspraken />} />
                <Route path="telefoon" element={<Telefoon />} />
                <Route path="patienten" element={<Patienten />} />
                <Route path="triage" element={<Triage />} />
                
                <Route element={<AdminRoute />}>
                  <Route path="instellingen" element={<Instellingen />} />
                </Route>
              </Route>
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
