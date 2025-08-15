import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, TrendingUp, Users, Home, Zap, BarChart3, Clock } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-hero p-8 md:p-12">
        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Your AI-Powered
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Luxury Home Building Platform
            </span>
          </h2>
          <p className="text-xl text-foreground/80 mb-8 max-w-2xl">
            Let AI handle your calls, qualify leads, and book appointments while you focus on building extraordinary homes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="hero" size="xl" className="gap-2">
              <Zap className="h-5 w-5" />
              Start AI Assistant
            </Button>
            <Button variant="glass" size="xl" className="gap-2">
              <BarChart3 className="h-5 w-5" />
              View Analytics
            </Button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent"></div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-card border-border/20 backdrop-blur-sm shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground/60">Calls Today</p>
              <p className="text-3xl font-bold text-primary">47</p>
              <p className="text-sm text-green-400">+23% from yesterday</p>
            </div>
            <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
              <Phone className="h-6 w-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card border-border/20 backdrop-blur-sm shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground/60">Meetings Booked</p>
              <p className="text-3xl font-bold text-primary">12</p>
              <p className="text-sm text-green-400">+8 this week</p>
            </div>
            <div className="h-12 w-12 rounded-lg bg-secondary/20 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-secondary" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card border-border/20 backdrop-blur-sm shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground/60">Qualified Leads</p>
              <p className="text-3xl font-bold text-primary">89</p>
              <p className="text-sm text-green-400">+15% this month</p>
            </div>
            <div className="h-12 w-12 rounded-lg bg-accent/20 flex items-center justify-center">
              <Users className="h-6 w-6 text-accent-foreground" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card border-border/20 backdrop-blur-sm shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground/60">Projects Won</p>
              <p className="text-3xl font-bold text-primary">6</p>
              <p className="text-sm text-green-400">$2.4M value</p>
            </div>
            <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
              <Home className="h-6 w-6 text-primary" />
            </div>
          </div>
        </Card>
      </div>

      {/* Feature Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* AI Call Management */}
        <Card className="p-8 bg-gradient-card border-border/20 backdrop-blur-sm shadow-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Phone className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">AI Call Management</h3>
          </div>
          <p className="text-foreground/70 mb-6">
            AI handles every call 24/7, qualifies leads, and schedules appointments automatically.
          </p>
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
              <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-sm">Call from Sarah M. - $850K Budget</span>
              <span className="text-xs text-foreground/50 ml-auto">2 min ago</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
              <div className="h-2 w-2 rounded-full bg-blue-400"></div>
              <span className="text-sm">Meeting scheduled - John D.</span>
              <span className="text-xs text-foreground/50 ml-auto">5 min ago</span>
            </div>
          </div>
          <Button variant="luxury" className="w-full">
            View All Calls
          </Button>
        </Card>

        {/* Lead Pipeline */}
        <Card className="p-8 bg-gradient-card border-border/20 backdrop-blur-sm shadow-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-lg bg-secondary/20 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold">Lead Pipeline</h3>
          </div>
          <p className="text-foreground/70 mb-6">
            Track qualified leads through your sales process with detailed insights.
          </p>
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">New Leads</span>
              <div className="flex items-center gap-2">
                <div className="h-2 w-16 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full w-3/4"></div>
                </div>
                <span className="text-sm">24</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Qualified</span>
              <div className="flex items-center gap-2">
                <div className="h-2 w-16 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-secondary rounded-full w-1/2"></div>
                </div>
                <span className="text-sm">12</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Proposals</span>
              <div className="flex items-center gap-2">
                <div className="h-2 w-16 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-accent rounded-full w-1/3"></div>
                </div>
                <span className="text-sm">8</span>
              </div>
            </div>
          </div>
          <Button variant="premium" className="w-full">
            Manage Pipeline
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;