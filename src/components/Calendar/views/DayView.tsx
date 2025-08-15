import React from 'react';
import { format, isSameDay } from 'date-fns';
import { CalendarEvent } from '../CalendarShell';
import { IndustryConfig } from '@/hooks/useIndustry';
import { EventCard } from '../EventCard';

interface DayViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onEventUpdate: (eventId: string, updates: Partial<CalendarEvent>) => Promise<boolean>;
  onEventDelete: (eventId: string) => Promise<boolean>;
  industryConfig: IndustryConfig | null;
  loading: boolean;
}

export function DayView({ 
  currentDate, 
  events, 
  onEventUpdate, 
  onEventDelete, 
  loading 
}: DayViewProps) {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  
  const dayEvents = events.filter(event => 
    isSameDay(new Date(event.start), currentDate)
  );

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="space-y-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-16 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Day header */}
      <div className="mb-6 text-center">
        <h2 className="text-xl font-semibold">
          {format(currentDate, 'EEEE, MMMM d, yyyy')}
        </h2>
      </div>

      {/* Time slots */}
      <div className="space-y-0">
        {hours.map(hour => {
          const slotStart = new Date(currentDate);
          slotStart.setHours(hour, 0, 0, 0);
          
          const slotEnd = new Date(currentDate);
          slotEnd.setHours(hour + 1, 0, 0, 0);

          const slotEvents = dayEvents.filter(event => {
            const eventStart = new Date(event.start);
            const eventEnd = new Date(event.end);
            return (
              (eventStart >= slotStart && eventStart < slotEnd) ||
              (eventEnd > slotStart && eventEnd <= slotEnd) ||
              (eventStart <= slotStart && eventEnd >= slotEnd)
            );
          });

          return (
            <div key={hour} className="flex border-b border-border/20 min-h-16">
              <div className="w-20 p-2 text-sm text-muted-foreground text-right">
                {format(slotStart, 'ha')}
              </div>
              <div className="flex-1 p-2 space-y-1">
                {slotEvents.map(event => (
                  <EventCard 
                    key={event.id}
                    event={event} 
                    onUpdate={onEventUpdate} 
                    onDelete={onEventDelete}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}