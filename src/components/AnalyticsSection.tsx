import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp, Phone, Calendar, DollarSign, Users, Eye, Target, Download } from "lucide-react";

const AnalyticsSection = () => {
  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Analytics & Insights</h2>
          <p className="text-foreground/70 mt-2">
            Track performance and ROI across all your AI-powered lead generation
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="glass" className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
          <Button variant="luxury" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Custom Dashboard
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-card border-border/20 backdrop-blur-sm shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <span className="text-green-400 text-sm font-medium">+23%</span>
          </div>
          <p className="text-2xl font-bold text-primary">1,247</p>
          <p className="text-sm text-foreground/60">Total Calls This Month</p>
          <div className="mt-2 h-1 w-full bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full w-3/4"></div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card border-border/20 backdrop-blur-sm shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 rounded-lg bg-secondary/20 flex items-center justify-center">
              <Users className="h-6 w-6 text-secondary" />
            </div>
            <span className="text-green-400 text-sm font-medium">+18%</span>
          </div>
          <p className="text-2xl font-bold text-secondary">89</p>
          <p className="text-sm text-foreground/60">Qualified Leads</p>
          <div className="mt-2 h-1 w-full bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-secondary rounded-full w-2/3"></div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card border-border/20 backdrop-blur-sm shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 rounded-lg bg-accent/20 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-accent-foreground" />
            </div>
            <span className="text-green-400 text-sm font-medium">+31%</span>
          </div>
          <p className="text-2xl font-bold text-accent-foreground">47</p>
          <p className="text-sm text-foreground/60">Meetings Booked</p>
          <div className="mt-2 h-1 w-full bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-accent rounded-full w-1/2"></div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card border-border/20 backdrop-blur-sm shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 rounded-lg bg-green-500/20 flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-green-400" />
            </div>
            <span className="text-green-400 text-sm font-medium">+42%</span>
          </div>
          <p className="text-2xl font-bold text-green-400">$8.4M</p>
          <p className="text-sm text-foreground/60">Pipeline Value</p>
          <div className="mt-2 h-1 w-full bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-green-400 rounded-full w-4/5"></div>
          </div>
        </Card>
      </div>

      {/* Conversion Funnel */}
      <Card className="p-8 bg-gradient-card border-border/20 backdrop-blur-sm shadow-card">
        <h3 className="text-xl font-semibold mb-6">Conversion Funnel</h3>
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/20">
            <div className="flex items-center gap-3">
              <Eye className="h-5 w-5 text-primary" />
              <span className="font-medium">Website Visitors</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-2 w-32 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full w-full"></div>
              </div>
              <span className="text-lg font-bold">2,847</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/20">
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-secondary" />
              <span className="font-medium">Phone Calls</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-2 w-32 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-secondary rounded-full w-3/4"></div>
              </div>
              <span className="text-lg font-bold">1,247</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/20">
            <div className="flex items-center gap-3">
              <Target className="h-5 w-5 text-accent-foreground" />
              <span className="font-medium">Qualified Leads</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-2 w-32 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-accent rounded-full w-1/2"></div>
              </div>
              <span className="text-lg font-bold">89</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/20">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-yellow-400" />
              <span className="font-medium">Meetings Scheduled</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-2 w-32 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-yellow-400 rounded-full w-1/3"></div>
              </div>
              <span className="text-lg font-bold">47</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/20">
            <div className="flex items-center gap-3">
              <DollarSign className="h-5 w-5 text-green-400" />
              <span className="font-medium">Closed Deals</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-2 w-32 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-green-400 rounded-full w-1/4"></div>
              </div>
              <span className="text-lg font-bold">12</span>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* AI Performance */}
        <Card className="p-8 bg-gradient-card border-border/20 backdrop-blur-sm shadow-card">
          <h3 className="text-xl font-semibold mb-6">AI Performance Metrics</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Call Answer Rate</span>
              <div className="flex items-center gap-2">
                <div className="h-2 w-20 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-green-400 rounded-full w-full"></div>
                </div>
                <span className="text-sm font-bold">98.9%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Lead Qualification Rate</span>
              <div className="flex items-center gap-2">
                <div className="h-2 w-20 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full w-4/5"></div>
                </div>
                <span className="text-sm font-bold">82.3%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Avg Response Time</span>
              <div className="flex items-center gap-2">
                <div className="h-2 w-20 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-secondary rounded-full w-full"></div>
                </div>
                <span className="text-sm font-bold">3.2s</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Meeting Booking Rate</span>
              <div className="flex items-center gap-2">
                <div className="h-2 w-20 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-accent rounded-full w-3/4"></div>
                </div>
                <span className="text-sm font-bold">67.4%</span>
              </div>
            </div>
          </div>
        </Card>

        {/* ROI Analysis */}
        <Card className="p-8 bg-gradient-card border-border/20 backdrop-blur-sm shadow-card">
          <h3 className="text-xl font-semibold mb-6">ROI Analysis</h3>
          <div className="space-y-6">
            <div className="text-center p-4 rounded-lg bg-muted/20">
              <p className="text-sm text-foreground/60 mb-1">Monthly Platform Cost</p>
              <p className="text-2xl font-bold text-primary">$2,497</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/20">
              <p className="text-sm text-foreground/60 mb-1">Revenue Generated</p>
              <p className="text-2xl font-bold text-green-400">$847,500</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-gradient-primary">
              <p className="text-sm text-primary-foreground/80 mb-1">ROI This Month</p>
              <p className="text-3xl font-bold text-primary-foreground">33,842%</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsSection;