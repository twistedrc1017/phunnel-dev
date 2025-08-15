import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Star, Calendar, Phone, Mail, MapPin, DollarSign, Home, Clock } from "lucide-react";

const LeadsSection = () => {
  const leads = [
    {
      id: 1,
      name: "Robert & Maria Chen",
      email: "robert.chen@email.com",
      phone: "(555) 234-5678",
      budget: "$2.8M",
      location: "Beverly Hills, CA",
      project: "Modern Estate",
      timeline: "6-8 months",
      priority: "high",
      source: "Google Ads",
      stage: "qualified",
      lastContact: "Today",
      notes: "Tech executives looking for smart home integration, pool, guest house."
    },
    {
      id: 2,
      name: "David Williams",
      email: "david.w@email.com",
      phone: "(555) 345-6789",
      budget: "$1.5M",
      location: "Manhattan Beach, CA",
      project: "Beach House",
      timeline: "4-6 months",
      priority: "high",
      source: "Referral",
      stage: "proposal",
      lastContact: "2 days ago",
      notes: "Oceanfront property, wants sustainable materials and open concept."
    },
    {
      id: 3,
      name: "Lisa Rodriguez",
      email: "lisa.r@email.com",
      phone: "(555) 456-7890",
      budget: "$950K",
      location: "Santa Monica, CA",
      project: "Family Home",
      timeline: "3-5 months",
      priority: "medium",
      source: "Website",
      stage: "consultation",
      lastContact: "1 week ago",
      notes: "Growing family, needs 4BR/3BA, home office, large backyard."
    },
    {
      id: 4,
      name: "Jonathan & Kate Miller",
      email: "jk.miller@email.com",
      phone: "(555) 567-8901",
      budget: "$1.8M",
      location: "Pasadena, CA",
      project: "Traditional Estate",
      timeline: "8-12 months",
      priority: "medium",
      source: "Facebook Ads",
      stage: "qualified",
      lastContact: "3 days ago",
      notes: "Classic architecture preferred, formal dining, library, wine cellar."
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "medium": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "low": return "bg-green-500/20 text-green-400 border-green-500/30";
      default: return "bg-muted/20 text-foreground/60 border-border";
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "qualified": return "bg-primary/20 text-primary border-primary/30";
      case "proposal": return "bg-secondary/20 text-secondary border-secondary/30";
      case "consultation": return "bg-accent/20 text-accent-foreground border-accent/30";
      case "contract": return "bg-green-500/20 text-green-400 border-green-500/30";
      default: return "bg-muted/20 text-foreground/60 border-border";
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Lead Management</h2>
          <p className="text-foreground/70 mt-2">
            Qualified prospects from your AI-powered lead generation system
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="glass" className="gap-2">
            <Star className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="luxury" className="gap-2">
            <Users className="h-4 w-4" />
            Add Lead
          </Button>
        </div>
      </div>

      {/* Pipeline Overview */}
      <Card className="p-6 bg-gradient-card border-border/20 backdrop-blur-sm shadow-card">
        <h3 className="text-xl font-semibold mb-6">Pipeline Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <p className="text-2xl font-bold text-primary">24</p>
            <p className="text-sm text-foreground/60">New Leads</p>
          </div>
          <div className="text-center">
            <div className="h-16 w-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-3">
              <Star className="h-8 w-8 text-secondary" />
            </div>
            <p className="text-2xl font-bold text-secondary">12</p>
            <p className="text-sm text-foreground/60">Qualified</p>
          </div>
          <div className="text-center">
            <div className="h-16 w-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-3">
              <Calendar className="h-8 w-8 text-accent-foreground" />
            </div>
            <p className="text-2xl font-bold text-accent-foreground">8</p>
            <p className="text-sm text-foreground/60">Proposals</p>
          </div>
          <div className="text-center">
            <div className="h-16 w-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-3">
              <Home className="h-8 w-8 text-green-400" />
            </div>
            <p className="text-2xl font-bold text-green-400">6</p>
            <p className="text-sm text-foreground/60">Contracts</p>
          </div>
        </div>
      </Card>

      {/* Leads List */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Active Leads</h3>
        {leads.map((lead) => (
          <Card key={lead.id} className="p-6 bg-gradient-card border-border/20 backdrop-blur-sm shadow-card hover:shadow-luxury transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">{lead.name}</h4>
                  <div className="flex items-center gap-4 text-sm text-foreground/60">
                    <span>{lead.email}</span>
                    <span>•</span>
                    <span>{lead.phone}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getPriorityColor(lead.priority)}>
                  {lead.priority} priority
                </Badge>
                <Badge className={getStageColor(lead.stage)}>
                  {lead.stage}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">{lead.budget}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-secondary" />
                <span className="text-sm">{lead.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Home className="h-4 w-4 text-accent-foreground" />
                <span className="text-sm">{lead.project}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-foreground/60" />
                <span className="text-sm">{lead.timeline}</span>
              </div>
            </div>

            <p className="text-sm text-foreground/70 mb-4">{lead.notes}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button variant="luxury" size="sm" className="gap-2">
                  <Calendar className="h-4 w-4" />
                  Schedule Meeting
                </Button>
                <Button variant="glass" size="sm" className="gap-2">
                  <Phone className="h-4 w-4" />
                  Call
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </Button>
              </div>
              <div className="text-sm text-foreground/60">
                Last contact: {lead.lastContact}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LeadsSection;