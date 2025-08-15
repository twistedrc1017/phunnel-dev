import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Layout/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Overview } from "@/components/Dashboard/Overview";
import { AIConversations } from "@/components/Dashboard/AIConversations";
import { LeadPipeline } from "@/components/Dashboard/LeadPipeline";
import { Analytics } from "@/components/Dashboard/Analytics";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Home, 
  Settings 
} from "lucide-react";

const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(searchParams.get('tab') || "overview");

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setSelectedTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
    setSearchParams({ tab: value });
  };

  return (
    <div className="min-h-screen bg-background">
      <title>Dashboard - Phunnel</title>
      <meta name="description" content="Your business dashboard with AI assistant analytics, customer pipeline, and performance tracking." />
      
      <Navbar />
      
      <div className="pt-4">
        {/* Header */}
        <header className="border-b bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Home className="h-8 w-8 text-primary" />
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Phunnel Dashboard
                  </h1>
                </div>
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  Live
                </Badge>
              </div>
              <div className="flex items-center space-x-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/profile')}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
                <Button 
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                  onClick={() => handleTabChange('customers')}
                >
                  View All Customers
                </Button>
              </div>
            </div>
          </div>
        </header>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Main Dashboard */}
        <Tabs value={selectedTab} onValueChange={handleTabChange} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-muted/50">
            <TabsTrigger 
              value="overview" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="calls" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              AI Calls
            </TabsTrigger>
            <TabsTrigger 
              value="customers"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Lead Pipeline
            </TabsTrigger>
            <TabsTrigger 
              value="analytics" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Overview />
          </TabsContent>

          <TabsContent value="calls" className="space-y-6">
            <AIConversations />
          </TabsContent>

          <TabsContent value="customers" className="space-y-6">
            <LeadPipeline />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Analytics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;