import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Users, DollarSign, Phone, Mail } from 'lucide-react';
import { AddLeadDialog } from '@/components/Forms/AddLeadDialog';

interface Lead {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  project_location: string | null;
  budget: number | null;
  timeline: string | null;
  status: 'new' | 'contacted' | 'qualified' | 'converted';
  industry?: string | null;
  custom_fields?: any;
  created_at: string;
}

type LeadStatus = 'new' | 'contacted' | 'qualified' | 'converted';

const statusColors = {
  new: 'bg-blue-100 text-blue-800 border-blue-200',
  contacted: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  qualified: 'bg-green-100 text-green-800 border-green-200',
  converted: 'bg-purple-100 text-purple-800 border-purple-200'
};

export const LeadPipeline = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching leads",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateLeadStatus = async (leadId: string, newStatus: LeadStatus) => {
    try {
      const { error } = await supabase
        .from('leads')
        .update({ status: newStatus })
        .eq('id', leadId);

      if (error) throw error;

      setLeads(leads.map(lead => 
        lead.id === leadId ? { ...lead, status: newStatus } : lead
      ));

      toast({
        title: "Lead status updated",
        description: `Lead moved to ${newStatus} stage`,
      });
    } catch (error: any) {
      toast({
        title: "Error updating lead",
        description: error.message,
        variant: "destructive",
      });
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const groupedLeads = leads.reduce((acc, lead) => {
    if (!acc[lead.status]) {
      acc[lead.status] = [];
    }
    acc[lead.status].push(lead);
    return acc;
  }, {} as Record<string, Lead[]>);

  const statusColumns = [
    { key: 'new', title: 'New Leads', icon: Users },
    { key: 'contacted', title: 'Contacted', icon: Phone },
    { key: 'qualified', title: 'Qualified', icon: Mail },
    { key: 'converted', title: 'Converted', icon: DollarSign }
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="h-96 animate-pulse bg-muted/50" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Lead Pipeline</h2>
          <p className="text-muted-foreground">Track your leads through the sales process</p>
        </div>
        <Button 
          onClick={() => setIsAddLeadOpen(true)}
          className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Lead
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statusColumns.map(({ key, title, icon: Icon }) => (
          <Card key={key} className="bg-gradient-to-br from-card to-card/80 border-border/50 shadow-luxury">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <Icon className="h-5 w-5 mr-2 text-primary" />
                {title}
                <Badge variant="secondary" className="ml-auto">
                  {groupedLeads[key]?.length || 0}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 max-h-96 overflow-y-auto">
              {groupedLeads[key]?.map((lead) => (
                <div
                  key={lead.id}
                  className="p-4 rounded-lg border bg-background/50 hover:bg-background/80 transition-colors cursor-pointer"
                  onClick={() => {
                    setSelectedLead(lead);
                    setIsDialogOpen(true);
                  }}
                >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-foreground truncate">{lead.name}</h4>
                        <Badge className={statusColors[lead.status]}>
                          {lead.status}
                        </Badge>
                      </div>
                      {lead.industry && (
                        <p className="text-xs text-primary font-medium capitalize">
                          {lead.industry.replace('_', ' ')}
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground truncate">{lead.project_location}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-primary font-medium">
                          {lead.budget ? formatCurrency(lead.budget) : 'Budget TBD'}
                        </span>
                        <span className="text-muted-foreground">
                          {formatDate(lead.created_at)}
                        </span>
                      </div>
                    </div>
                </div>
              ))}
              {(!groupedLeads[key] || groupedLeads[key].length === 0) && (
                <div className="text-center py-8 text-muted-foreground">
                  <Icon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No leads in this stage</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Lead Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Lead Details</DialogTitle>
          </DialogHeader>
          {selectedLead && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{selectedLead.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedLead.email}</p>
                <p className="text-sm text-muted-foreground">{selectedLead.phone}</p>
              </div>
              
              <div className="space-y-2">
                {selectedLead.industry && (
                  <p><span className="font-medium">Industry:</span> {selectedLead.industry.replace('_', ' ')}</p>
                )}
                <p><span className="font-medium">Project Location:</span> {selectedLead.project_location}</p>
                <p><span className="font-medium">Budget:</span> {selectedLead.budget ? formatCurrency(selectedLead.budget) : 'TBD'}</p>
                <p><span className="font-medium">Timeline:</span> {selectedLead.timeline || 'Not specified'}</p>
                <p><span className="font-medium">Created:</span> {formatDate(selectedLead.created_at)}</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Update Status:</label>
                <Select
                  value={selectedLead.status}
                  onValueChange={(value) => updateLeadStatus(selectedLead.id, value as LeadStatus)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="qualified">Qualified</SelectItem>
                    <SelectItem value="converted">Converted</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Lead Dialog */}
      <AddLeadDialog
        open={isAddLeadOpen}
        onOpenChange={setIsAddLeadOpen}
        onLeadAdded={fetchLeads}
      />
    </div>
  );
};