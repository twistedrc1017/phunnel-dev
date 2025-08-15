import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, PhoneCall, Clock, User, MapPin, DollarSign, CheckCircle, AlertCircle } from "lucide-react";

const AICallsSection = () => {
  const calls = [
    {
      id: 1,
      caller: "Sarah Mitchell",
      phone: "(555) 123-4567",
      time: "2 min ago",
      duration: "4:32",
      status: "qualified",
      budget: "$850,000",
      location: "Beverly Hills, CA",
      project: "Modern Luxury Villa",
      notes: "Looking for contemporary design, pool, 6 bedrooms. Timeline: 8-12 months."
    },
    {
      id: 2,
      caller: "Michael Thompson",
      phone: "(555) 987-6543",
      time: "8 min ago",
      duration: "6:15",
      status: "scheduled",
      budget: "$1.2M",
      location: "Malibu, CA",
      project: "Coastal Estate",
      notes: "Oceanfront property, sustainable materials preferred. Meeting scheduled for tomorrow."
    },
    {
      id: 3,
      caller: "Jennifer Patel",
      phone: "(555) 456-7890",
      time: "15 min ago",
      duration: "3:45",
      status: "follow-up",
      budget: "$650,000",
      location: "Manhattan Beach, CA",
      project: "Family Home Renovation",
      notes: "Existing property renovation, needs design consultation first."
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "qualified": return "text-green-400";
      case "scheduled": return "text-primary";
      case "follow-up": return "text-yellow-400";
      default: return "text-foreground/60";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "qualified": return <CheckCircle className="h-4 w-4" />;
      case "scheduled": return <Clock className="h-4 w-4" />;
      case "follow-up": return <AlertCircle className="h-4 w-4" />;
      default: return <Phone className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">AI Call Management</h2>
          <p className="text-foreground/70 mt-2">
            Every call handled automatically with intelligent lead qualification
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="glass" className="gap-2">
            <PhoneCall className="h-4 w-4" />
            Live Monitor
          </Button>
          <Button variant="luxury" className="gap-2">
            <Phone className="h-4 w-4" />
            Call Settings
          </Button>
        </div>
      </div>

      {/* Real-time Call Status */}
      <Card className="p-6 bg-gradient-card border-border/20 backdrop-blur-sm shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Live Call Status</h3>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-400">AI Active</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">24/7</p>
            <p className="text-sm text-foreground/60">AI Availability</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">98.9%</p>
            <p className="text-sm text-foreground/60">Call Answer Rate</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">3.2s</p>
            <p className="text-sm text-foreground/60">Avg Response Time</p>
          </div>
        </div>
      </Card>

      {/* Recent Calls */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Recent Calls</h3>
        {calls.map((call) => (
          <Card key={call.id} className="p-6 bg-gradient-card border-border/20 backdrop-blur-sm shadow-card hover:shadow-luxury transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">{call.caller}</h4>
                  <div className="flex items-center gap-4 text-sm text-foreground/60">
                    <span>{call.phone}</span>
                    <span>•</span>
                    <span>{call.time}</span>
                    <span>•</span>
                    <span>{call.duration}</span>
                  </div>
                </div>
              </div>
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full bg-muted/30 ${getStatusColor(call.status)}`}>
                {getStatusIcon(call.status)}
                <span className="text-sm font-medium capitalize">{call.status}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-primary" />
                <span className="text-sm">{call.budget}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-secondary" />
                <span className="text-sm">{call.location}</span>
              </div>
              <div className="flex items-center gap-2 md:col-span-2">
                <span className="text-sm font-medium">{call.project}</span>
              </div>
            </div>

            <p className="text-sm text-foreground/70 mb-4">{call.notes}</p>

            <div className="flex items-center gap-3">
              <Button variant="luxury" size="sm">
                Schedule Meeting
              </Button>
              <Button variant="glass" size="sm">
                View Details
              </Button>
              <Button variant="ghost" size="sm">
                Listen to Call
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AICallsSection;