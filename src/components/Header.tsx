import { Button } from "@/components/ui/button";
import { Bell, Settings, User } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-card/20 backdrop-blur-md supports-[backdrop-filter]:bg-card/20">
      <div className="container flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary"></div>
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              LuxuryBuilder AI
            </h1>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#dashboard" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
            Dashboard
          </a>
          <a href="#leads" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
            Leads
          </a>
          <a href="#ai-calls" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
            AI Calls
          </a>
          <a href="#analytics" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
            Analytics
          </a>
          <a href="#showcase" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
            Showcase
          </a>
        </nav>

        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full animate-pulse-gold"></span>
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="glass" size="sm" className="space-x-2">
            <User className="h-4 w-4" />
            <span>Account</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;