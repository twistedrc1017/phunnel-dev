import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Grid, List, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DayView } from './views/DayView';
import { WeekView } from './views/WeekView';
import { MonthView } from './views/MonthView';
import { TimelineView } from './views/TimelineView';
import { AddEventDialog } from './AddEventDialog';
import { supabase } from '@/integrations/supabase/client';
import { useIndustry } from '@/hooks/useIndustry';
import { getIndustryConfig } from '@/config/industry';
import { useToast } from '@/hooks/use-toast';

export type CalendarEvent = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type: string;
  description?: string;
  location?: string;
  attendees?: string[];
  industry_fields?: Record<string, any>;
};

type ViewMode = 'day' | 'week' | 'month' | 'timeline';

interface CalendarShellProps {
  className?: string;
}

export function CalendarShell({ className }: CalendarShellProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('week');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const { industry } = useIndustry();
  const { toast } = useToast();

  const industryConfig = industry ? getIndustryConfig(industry) : null;

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return;

      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching events:', error);
        toast({
          title: "Error",
          description: "Failed to load calendar events",
          variant: "destructive",
        });
        return;
      }

      const formattedEvents: CalendarEvent[] = data.map(event => ({
        id: event.id,
        title: event.name,
        start: new Date(event.created_at),
        end: new Date(new Date(event.created_at).getTime() + 60 * 60 * 1000), // 1 hour duration
        type: event.status,
        description: event.description,
        location: '',
        attendees: [],
        industry_fields: {}
      }));

      setEvents(formattedEvents);
    } catch (error) {
      console.error('Error in fetchEvents:', error);
      toast({
        title: "Error",
        description: "Failed to load calendar events",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEventUpdate = async (eventId: string, updates: Partial<CalendarEvent>) => {
    try {
      // Map event type to valid project status
      const validStatus = updates.type === 'completed' ? 'completed' : 'active';
      
      const { error } = await supabase
        .from('projects')
        .update({
          name: updates.title,
          description: updates.description,
          status: validStatus as "active" | "paused" | "completed"
        })
        .eq('id', eventId);

      if (error) {
        console.error('Error updating event:', error);
        toast({
          title: "Error",
          description: "Failed to update event",
          variant: "destructive",
        });
        return false;
      }

      // Update local state optimistically
      setEvents(prev => prev.map(event => 
        event.id === eventId ? { ...event, ...updates } : event
      ));

      toast({
        title: "Success",
        description: "Event updated successfully",
      });

      return true;
    } catch (error) {
      console.error('Error in handleEventUpdate:', error);
      toast({
        title: "Error",
        description: "Failed to update event",
        variant: "destructive",
      });
      return false;
    }
  };

  const handleEventDelete = async (eventId: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', eventId);

      if (error) {
        console.error('Error deleting event:', error);
        toast({
          title: "Error",
          description: "Failed to delete event",
          variant: "destructive",
        });
        return false;
      }

      setEvents(prev => prev.filter(event => event.id !== eventId));
      
      toast({
        title: "Success",
        description: "Event deleted successfully",
      });

      return true;
    } catch (error) {
      console.error('Error in handleEventDelete:', error);
      toast({
        title: "Error",
        description: "Failed to delete event",
        variant: "destructive",
      });
      return false;
    }
  };

  const renderView = () => {
    const commonProps = {
      currentDate,
      events,
      onEventUpdate: handleEventUpdate,
      onEventDelete: handleEventDelete,
      industryConfig,
      loading
    };

    switch (viewMode) {
      case 'day':
        return <DayView {...commonProps} />;
      case 'week':
        return <WeekView {...commonProps} />;
      case 'month':
        return <MonthView {...commonProps} />;
      case 'timeline':
        return <TimelineView {...commonProps} />;
      default:
        return <WeekView {...commonProps} />;
    }
  };

  return (
    <div className={`space-y-6 w-full overflow-x-hidden ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Calendar</h1>
          <p className="text-muted-foreground">
            Manage your {industryConfig?.displayName.toLowerCase() || 'business'} appointments and events
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Select value={viewMode} onValueChange={(value: ViewMode) => setViewMode(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Day
                </div>
              </SelectItem>
              <SelectItem value="week">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Week
                </div>
              </SelectItem>
              <SelectItem value="month">
                <div className="flex items-center gap-2">
                  <Grid className="w-4 h-4" />
                  Month
                </div>
              </SelectItem>
              <SelectItem value="timeline">
                <div className="flex items-center gap-2">
                  <List className="w-4 h-4" />
                  Timeline
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          
          <Button onClick={() => setShowAddDialog(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Event
          </Button>
        </div>
      </div>

      {/* Calendar View */}
      <Card className="border-border/40 bg-card/50 backdrop-blur-sm w-full overflow-hidden">
        {renderView()}
      </Card>

      {/* Add Event Dialog */}
      <AddEventDialog 
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onEventAdded={fetchEvents}
        industryConfig={industryConfig}
      />
    </div>
  );
}