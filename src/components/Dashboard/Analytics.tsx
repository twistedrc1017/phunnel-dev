import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Phone, 
  Calendar,
  DollarSign,
  Target,
  Clock,
  Activity
} from 'lucide-react';

interface AnalyticsData {
  totalLeads: number;
  newLeadsThisWeek: number;
  totalConversations: number;
  conversionsThisMonth: number;
  averageBudget: number;
  leadsByStatus: Record<string, number>;
  weeklyTrends: Array<{ week: string; leads: number; conversions: number }>;
}

export const Analytics = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      // Fetch leads data
      const { data: leads, error: leadsError } = await supabase
        .from('leads')
        .select('*');

      if (leadsError) throw leadsError;

      // Fetch conversations data
      const { data: conversations, error: conversationsError } = await supabase
        .from('ai_conversations')
        .select('*');

      if (conversationsError) throw conversationsError;

      // Process analytics data
      const now = new Date();
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

      const newLeadsThisWeek = leads?.filter(lead => 
        new Date(lead.created_at) >= oneWeekAgo
      ).length || 0;

      const conversionsThisMonth = leads?.filter(lead => 
        lead.status === 'converted' && new Date(lead.created_at) >= oneMonthAgo
      ).length || 0;

      const budgets = leads?.filter(lead => lead.budget).map(lead => lead.budget) || [];
      const averageBudget = budgets.length > 0 
        ? budgets.reduce((sum, budget) => sum + budget, 0) / budgets.length 
        : 0;

      const leadsByStatus = (leads || []).reduce((acc, lead) => {
        acc[lead.status] = (acc[lead.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      setAnalytics({
        totalLeads: leads?.length || 0,
        newLeadsThisWeek,
        totalConversations: conversations?.length || 0,
        conversionsThisMonth,
        averageBudget,
        leadsByStatus,
        weeklyTrends: [] // Could be implemented with more complex querying
      });

    } catch (error: any) {
      toast({
        title: "Error fetching analytics",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateConversionRate = () => {
    if (!analytics || analytics.totalLeads === 0) return 0;
    return ((analytics.leadsByStatus.converted || 0) / analytics.totalLeads * 100).toFixed(1);
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
            <Card key={i} className="h-64 animate-pulse bg-muted/50" />
          ))}
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <Card className="bg-gradient-to-br from-card to-card/80 border-border/50 shadow-luxury">
        <CardContent className="p-12 text-center">
          <BarChart3 className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-lg font-medium text-foreground mb-2">No analytics data</h3>
          <p className="text-muted-foreground">Analytics will appear as you generate leads and conversations</p>
        </CardContent>
      </Card>
    );
  }

  const stats = [
    {
      title: "Total Leads",
      value: analytics.totalLeads.toString(),
      change: `+${analytics.newLeadsThisWeek} this week`,
      icon: Users,
      color: "text-primary",
      trending: analytics.newLeadsThisWeek > 0 ? "up" : "neutral"
    },
    {
      title: "AI Conversations",
      value: analytics.totalConversations.toString(),
      change: "All time",
      icon: Phone,
      color: "text-accent",
      trending: "neutral"
    },
    {
      title: "Conversion Rate",
      value: `${calculateConversionRate()}%`,
      change: `${analytics.conversionsThisMonth} this month`,
      icon: Target,
      color: "text-green-600",
      trending: analytics.conversionsThisMonth > 0 ? "up" : "neutral"
    },
    {
      title: "Average Budget",
      value: formatCurrency(analytics.averageBudget),
      change: "Per qualified lead",
      icon: DollarSign,
      color: "text-purple-600",
      trending: "neutral"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Analytics & Reports</h2>
        <p className="text-muted-foreground">Detailed insights into your business performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-gradient-to-br from-card to-card/80 border-border/50 shadow-luxury">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  <div className="flex items-center space-x-1">
                    {stat.trending === "up" && <TrendingUp className="h-3 w-3 text-green-600" />}
                    {stat.trending === "down" && <TrendingDown className="h-3 w-3 text-red-600" />}
                    <p className="text-sm text-muted-foreground">{stat.change}</p>
                  </div>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lead Status Breakdown */}
        <Card className="bg-gradient-to-br from-card to-card/80 border-border/50 shadow-luxury">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2 text-primary" />
              Lead Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(analytics.leadsByStatus).map(([status, count]) => {
              const percentage = analytics.totalLeads > 0 ? (count / analytics.totalLeads * 100).toFixed(1) : '0';
              const statusColors = {
                new: 'bg-blue-500',
                contacted: 'bg-yellow-500',
                qualified: 'bg-green-500',
                converted: 'bg-purple-500'
              };
              
              return (
                <div key={status} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${statusColors[status as keyof typeof statusColors] || 'bg-gray-500'}`} />
                      <span className="text-sm font-medium capitalize">{status}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">{count}</span>
                      <Badge variant="secondary">{percentage}%</Badge>
                    </div>
                  </div>
                  <div className="w-full bg-muted/50 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${statusColors[status as keyof typeof statusColors] || 'bg-gray-500'}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-gradient-to-br from-card to-card/80 border-border/50 shadow-luxury">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-accent" />
              Performance Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-sm">New leads this week</span>
                </div>
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  {analytics.newLeadsThisWeek}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Target className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Conversions this month</span>
                </div>
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  {analytics.conversionsThisMonth}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-accent" />
                  <span className="text-sm">Total AI interactions</span>
                </div>
                <Badge className="bg-accent/10 text-accent border-accent/20">
                  {analytics.totalConversations}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};