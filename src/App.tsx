import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import ServicePage from "./pages/ServicePage";
import Pricing from "./pages/Pricing";
import IndustryTemplates from "./pages/IndustryTemplates";
import { IndustryPage } from "./pages/IndustryPage";
import Calendar from "./pages/Calendar";
import Templates from "./app/(dashboard)/templates/page";
import TemplateDetail from "./app/(dashboard)/templates/[key]/page";
import { PrivateRoute } from "./components/Auth/PrivateRoute";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider delayDuration={0} skipDelayDuration={500}>
          <BrowserRouter>
          <div className="min-h-screen">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/services/:serviceId" element={<ServicePage />} />
              <Route path="/industry/:industryId" element={<IndustryPage />} />
              <Route path="/industries" element={<IndustryTemplates />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/dashboard/calendar" element={
                <PrivateRoute>
                  <Calendar />
                </PrivateRoute>
              } />
              <Route path="/dashboard/templates" element={
                <PrivateRoute>
                  <Templates />
                </PrivateRoute>
              } />
              <Route path="/dashboard/templates/:key" element={
                <PrivateRoute>
                  <TemplateDetail />
                </PrivateRoute>
              } />
              <Route 
                path="/dashboard" 
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                } 
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Toaster />
          <Sonner />
        </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;