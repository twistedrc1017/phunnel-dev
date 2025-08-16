import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare, Clock, User, Phone, FileText, Eye } from 'lucide-react';

interface Conversation {
  id: string;
  transcript: string;
  summary: string;
  created_at: string;
  lead: {
    name: string;
    email: string;
    phone: string;
    project_location: string;
    status: string;
  };
}

export const AIConversations = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const { data, error } = await supabase
        .from('ai_conversations')
        .select(`
          id,
          transcript,
          summary,
          created_at,
          lead:leads (
            name,
            email,
            phone,
            project_location,
            status
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setConversations(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching conversations",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
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

  const openTranscript = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setIsDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Card key={i} className="h-32 animate-pulse bg-muted/50" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">AI Conversations</h2>
          <p className="text-muted-foreground">Review AI-handled calls and website inquiries</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
            <MessageSquare className="h-3 w-3 mr-1" />
            {conversations.length} conversations
          </Badge>
        </div>
      </div>

      <div className="space-y-4">
        {conversations.map((conversation) => (
          <Card 
            key={conversation.id} 
            className="bg-gradient-to-br from-card to-card/80 border-border/50 shadow-luxury hover:shadow-xl transition-all duration-200"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-primary" />
                      <h3 className="font-semibold text-foreground">{conversation.lead?.name || 'Unknown Lead'}</h3>
                    </div>
                    <Badge className={getStatusBadgeColor(conversation.lead?.status || 'new')}>
                      {conversation.lead?.status || 'new'}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-3 w-3" />
                      <span>{conversation.lead?.phone || 'No phone'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-3 w-3" />
                      <span>{formatDate(conversation.created_at)}</span>
                    </div>
                  </div>

                  {conversation.summary && (
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <h4 className="font-medium text-sm mb-1 flex items-center">
                        <FileText className="h-3 w-3 mr-1" />
                        AI Summary
                      </h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {conversation.summary}
                      </p>
                    </div>
                  )}
                </div>

                <div className="ml-4 space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openTranscript(conversation)}
                    className="w-full"
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View Transcript
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {conversations.length === 0 && (
          <Card className="bg-gradient-to-br from-card to-card/80 border-border/50 shadow-luxury">
            <CardContent className="p-12 text-center">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-medium text-foreground mb-2">No conversations yet</h3>
              <p className="text-muted-foreground">AI conversations will appear here as they're generated</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Transcript Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              Conversation Transcript
            </DialogTitle>
          </DialogHeader>
          {selectedConversation && (
            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-semibold">{selectedConversation.lead?.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedConversation.lead?.email}</p>
                <p className="text-sm text-muted-foreground">{selectedConversation.lead?.phone}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  {formatDate(selectedConversation.created_at)}
                </p>
              </div>

              {selectedConversation.summary && (
                <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                  <h4 className="font-medium text-sm mb-2 text-primary">AI Summary</h4>
                  <p className="text-sm">{selectedConversation.summary}</p>
                </div>
              )}

              <div className="space-y-2">
                <h4 className="font-medium text-sm">Full Transcript</h4>
                <div className="bg-muted/30 p-4 rounded-lg border max-h-96 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm font-mono">
                    {selectedConversation.transcript || 'No transcript available'}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};