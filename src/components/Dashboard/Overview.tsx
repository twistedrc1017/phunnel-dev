import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { 
  Phone, 
  Calendar, 
  TrendingUp, 
  Users, 
  MessageSquare,
  BarChart3,
  Settings,
  Plus,
  Home,
  Eye
} from 'lucide-react';

interface DashboardStats {
  totalLeads: number;
  newLeadsToday: number;
  totalConversations: number;
  qualifiedLeads: number;
  totalProjects: number;
  recentConversations: Array<{
    id: string;
    created_at: string;
    summary: string;
    lead: {
      name: string;
      status: string;
      budget: number;
    };
  }>;
}

export const Overview = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch leads
      const { data: leads, error: leadsError } = await supabase
        .from('leads')
        .select('*');

      if (leadsError) throw leadsError;

      // Fetch conversations with lead data
      const { data: conversations, error: conversationsError } = await supabase
        .from('ai_conversations')
        .select(`
          id,
          created_at,
          summary,
          lead:leads (
            name,
            status,
            budget
          )
        `)
        .order('created_at', { ascending: false })
        .limit(5);

      if (conversationsError) throw conversationsError;

      // Fetch projects
      const { data: projects, error: projectsError } = await supabase
        .from('projects')
        .select('*');

      if (projectsError) throw projectsError;

      // Calculate today's leads
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const newLeadsToday = leads?.filter(lead => 
        new Date(lead.created_at) >= today
      ).length || 0;

      const qualifiedLeads = leads?.filter(lead => 
        lead.status === 'qualified' || lead.status === 'converted'
      ).length || 0;

      setStats({
        totalLeads: leads?.length || 0,
        newLeadsToday,
        totalConversations: conversations?.length || 0,
        qualifiedLeads,
        totalProjects: projects?.length || 0,
        recentConversations: conversations || []
      });

    } catch (error: any) {
      toast({
        title: "Error fetching dashboard data",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    if (!amount) return 'Budget TBD';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'contacted': return 'bg-accent text-accent-foreground border-border';
      case 'qualified': return 'bg-primary/20 text-primary border-primary/30';
      case 'converted': return 'bg-secondary text-secondary-foreground border-border';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="h-32 animate-pulse bg-muted/50" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(2)].map((_, i) => (
            <Card key={i} className="h-96 animate-pulse bg-muted/50" />
          ))}
        </div>
      </div>
    );
  }

  const dashboardStats = [
    {
      title: "Today's Leads",
      value: stats?.newLeadsToday.toString() || "0",
      change: `${stats?.totalLeads || 0} total`,
      icon: Users,
      color: "text-primary"
    },
    {
      title: "AI Conversations",
      value: stats?.totalConversations.toString() || "0",
      change: "All interactions",
      icon: Phone,
      color: "text-accent"
    },
    {
      title: "Qualified Leads",
      value: stats?.qualifiedLeads.toString() || "0",
      change: "Ready to convert",
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      title: "Active Projects",
      value: stats?.totalProjects.toString() || "0",
      change: "In pipeline",
      icon: Home,
      color: "text-purple-600"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => (
          <Card key={index} className="bg-gradient-to-br from-card to-card/80 border-border/50 shadow-luxury hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-primary font-medium">{stat.change}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent AI Conversations */}
        <Card className="bg-gradient-to-br from-card to-card/80 border-border/50 shadow-luxury">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-primary" />
                Recent AI Conversations
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/dashboard?tab=calls')}
              >
                <Eye className="h-3 w-3 mr-1" />
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats?.recentConversations.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No conversations yet</p>
                </div>
              ) : (
                stats?.recentConversations.map((conversation) => (
                  <div key={conversation.id} className="flex items-start justify-between p-4 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-foreground">{conversation.lead?.name}</p>
                        <Badge className={getStatusBadgeColor(conversation.lead?.status || 'new')}>
                          {conversation.lead?.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {conversation.summary || 'No summary available'}
                      </p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-primary font-medium">
                          {formatCurrency(conversation.lead?.budget)}
                        </span>
                        <span className="text-muted-foreground">
                          {formatTime(conversation.created_at)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-gradient-to-br from-card to-card/80 border-border/50 shadow-luxury">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-accent" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              className="w-full justify-start bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
              onClick={() => navigate('/dashboard?tab=calls')}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Review AI Conversations
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start hover:bg-muted/50"
              onClick={() => navigate('/dashboard?tab=leads')}
            >
              <Users className="h-4 w-4 mr-2" />
              Manage Lead Pipeline
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start hover:bg-muted/50"
              onClick={() => navigate('/dashboard?tab=analytics')}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              View Analytics
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start hover:bg-muted/50"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Project
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start hover:bg-muted/50"
              onClick={() => navigate('/profile')}
            >
              <Settings className="h-4 w-4 mr-2" />
              Account Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};