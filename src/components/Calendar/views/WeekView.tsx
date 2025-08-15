import React from 'react';
import { format, startOfWeek, addDays, isSameDay, startOfDay, endOfDay } from 'date-fns';
import { CalendarEvent } from '../CalendarShell';
import { IndustryConfig } from '@/hooks/useIndustry';
import { EventCard } from '../EventCard';
import { useIsMobile } from '@/hooks/use-mobile';
import { DndContext, DragEndEvent, useDraggable, useDroppable } from '@dnd-kit/core';

interface WeekViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onEventUpdate: (eventId: string, updates: Partial<CalendarEvent>) => Promise<boolean>;
  onEventDelete: (eventId: string) => Promise<boolean>;
  industryConfig: IndustryConfig | null;
  loading: boolean;
}

interface TimeSlotProps {
  hour: number;
  date: Date;
  events: CalendarEvent[];
  onEventUpdate: (eventId: string, updates: Partial<CalendarEvent>) => Promise<boolean>;
  onEventDelete: (eventId: string) => Promise<boolean>;
}

function TimeSlot({ hour, date, events, onEventUpdate, onEventDelete }: TimeSlotProps) {
  const slotStart = new Date(date);
  slotStart.setHours(hour, 0, 0, 0);
  
  const slotEnd = new Date(date);
  slotEnd.setHours(hour + 1, 0, 0, 0);

  const slotEvents = events.filter(event => {
    const eventStart = new Date(event.start);
    const eventEnd = new Date(event.end);
    return (
      isSameDay(eventStart, date) &&
      ((eventStart >= slotStart && eventStart < slotEnd) ||
       (eventEnd > slotStart && eventEnd <= slotEnd) ||
       (eventStart <= slotStart && eventEnd >= slotEnd))
    );
  });

  const { setNodeRef, isOver } = useDroppable({
    id: `slot-${format(date, 'yyyy-MM-dd')}-${hour}`,
    data: { date, hour }
  });

  return (
    <div 
      ref={setNodeRef}
      className={`min-h-16 border-b border-border/20 p-1 relative ${
        isOver ? 'bg-primary/10' : ''
      }`}
    >
      {slotEvents.map(event => (
        <DraggableEvent 
          key={event.id} 
          event={event} 
          onUpdate={onEventUpdate} 
          onDelete={onEventDelete} 
        />
      ))}
    </div>
  );
}

function DraggableEvent({ 
  event, 
  onUpdate, 
  onDelete 
}: { 
  event: CalendarEvent; 
  onUpdate: (eventId: string, updates: Partial<CalendarEvent>) => Promise<boolean>;
  onDelete: (eventId: string) => Promise<boolean>;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: event.id,
    data: { event }
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`${isDragging ? 'opacity-50' : ''}`}
    >
      <EventCard 
        event={event} 
        onUpdate={onUpdate} 
        onDelete={onDelete}
        compact
      />
    </div>
  );
}

export function WeekView({ 
  currentDate, 
  events, 
  onEventUpdate, 
  onEventDelete, 
  loading 
}: WeekViewProps) {
  const isMobile = useIsMobile();
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over || !active.data.current?.event) return;

    const draggedEvent = active.data.current.event as CalendarEvent;
    const dropData = over.data.current as { date: Date; hour: number };

    if (!dropData) return;

    // Calculate new start and end times
    const newStart = new Date(dropData.date);
    newStart.setHours(dropData.hour, 0, 0, 0);
    
    const duration = draggedEvent.end.getTime() - draggedEvent.start.getTime();
    const newEnd = new Date(newStart.getTime() + duration);

    await onEventUpdate(draggedEvent.id, {
      start: newStart,
      end: newEnd
    });
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="grid grid-cols-7 gap-4">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-6 bg-muted rounded"></div>
                <div className="space-y-1">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <div key={j} className="h-16 bg-muted rounded"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="p-4 overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Week header */}
          <div className="grid grid-cols-8 gap-2 mb-4">
            <div className="text-sm font-medium text-muted-foreground p-2">
              Time
            </div>
            {days.map(day => (
              <div key={day.toISOString()} className="text-center p-2">
                <div className="text-sm font-medium">
                  {format(day, 'EEE')}
                </div>
                <div className={`text-lg font-semibold ${
                  isSameDay(day, new Date()) ? 'text-primary' : 'text-foreground'
                }`}>
                  {format(day, 'd')}
                </div>
              </div>
            ))}
          </div>

          {/* Time grid */}
          <div className="space-y-0">
            {hours.map(hour => (
              <div key={hour} className="grid grid-cols-8 gap-2">
                <div className="text-xs text-muted-foreground p-2 text-right">
                  {format(new Date().setHours(hour, 0, 0, 0), 'ha')}
                </div>
                {days.map(day => (
                  <TimeSlot
                    key={`${day.toISOString()}-${hour}`}
                    hour={hour}
                    date={day}
                    events={events}
                    onEventUpdate={onEventUpdate}
                    onEventDelete={onEventDelete}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </DndContext>
  );
}