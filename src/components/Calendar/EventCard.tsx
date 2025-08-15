import React, { useState } from 'react';
import { format } from 'date-fns';
import { Clock, MapPin, Users, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { CalendarEvent } from './CalendarShell';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { EditEventDialog } from './EditEventDialog';

interface EventCardProps {
  event: CalendarEvent;
  onUpdate: (eventId: string, updates: Partial<CalendarEvent>) => Promise<boolean>;
  onDelete: (eventId: string) => Promise<boolean>;
  compact?: boolean;
}

export function EventCard({ event, onUpdate, onDelete, compact = false }: EventCardProps) {
  const [showEditDialog, setShowEditDialog] = useState(false);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      await onDelete(event.id);
    }
  };

  const duration = Math.ceil((event.end.getTime() - event.start.getTime()) / (1000 * 60 * 60)); // in hours

  if (compact) {
    return (
      <>
        <Card className="p-2 border-l-4 border-l-primary bg-card/80 hover:bg-card transition-colors cursor-pointer">
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{event.title}</div>
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {format(event.start, 'h:mm a')}
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <MoreVertical className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </Card>

        <EditEventDialog 
          event={event}
          open={showEditDialog}
          onOpenChange={setShowEditDialog}
          onEventUpdated={onUpdate}
        />
      </>
    );
  }

  return (
    <>
      <Card className="p-4 border-l-4 border-l-primary bg-card/80 hover:bg-card transition-colors">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex items-start gap-2">
              <h4 className="font-semibold text-foreground">{event.title}</h4>
              <Badge variant="outline" className="text-xs">
                {event.type}
              </Badge>
            </div>
            
            <div className="space-y-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>
                  {format(event.start, 'h:mm a')} - {format(event.end, 'h:mm a')}
                  <span className="ml-2 text-xs">({duration}h)</span>
                </span>
              </div>
              
              {event.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
              )}
              
              {event.attendees && event.attendees.length > 0 && (
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{event.attendees.length} attendee{event.attendees.length > 1 ? 's' : ''}</span>
                </div>
              )}
            </div>
            
            {event.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {event.description}
              </p>
            )}
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Card>

      <EditEventDialog 
        event={event}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        onEventUpdated={onUpdate}
      />
    </>
  );
}