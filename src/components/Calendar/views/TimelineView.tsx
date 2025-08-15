import React from 'react';
import { format, addDays, isSameDay } from 'date-fns';
import { CalendarEvent } from '../CalendarShell';
import { IndustryConfig } from '@/hooks/useIndustry';
import { EventCard } from '../EventCard';

interface TimelineViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onEventUpdate: (eventId: string, updates: Partial<CalendarEvent>) => Promise<boolean>;
  onEventDelete: (eventId: string) => Promise<boolean>;
  industryConfig: IndustryConfig | null;
  loading: boolean;
}

export function TimelineView({ 
  currentDate, 
  events, 
  onEventUpdate, 
  onEventDelete, 
  loading 
}: TimelineViewProps) {
  // Show 14 days: 7 before and 7 after current date
  const days = Array.from({ length: 14 }, (_, i) => addDays(currentDate, i - 7));

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="space-y-4">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-6 bg-muted rounded w-1/4"></div>
                <div className="space-y-1">
                  {Array.from({ length: 2 }).map((_, j) => (
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
    <div className="p-4 overflow-x-auto">
      <div className="min-w-[600px] space-y-6">
        {days.map(day => {
          const dayEvents = events
            .filter(event => isSameDay(new Date(event.start), day))
            .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());

          const isToday = isSameDay(day, new Date());

          return (
            <div key={day.toISOString()} className="space-y-3">
              <div className={`flex items-center gap-3 ${
                isToday ? 'text-primary' : 'text-foreground'
              }`}>
                <div className={`w-3 h-3 rounded-full ${
                  isToday ? 'bg-primary' : 'bg-muted'
                }`}></div>
                <h3 className="text-lg font-semibold">
                  {format(day, 'EEEE, MMMM d')}
                  {isToday && <span className="ml-2 text-sm text-primary">(Today)</span>}
                </h3>
              </div>
              
              <div className="ml-6 space-y-2">
                {dayEvents.length > 0 ? (
                  dayEvents.map(event => (
                    <EventCard 
                      key={event.id}
                      event={event} 
                      onUpdate={onEventUpdate} 
                      onDelete={onEventDelete}
                    />
                  ))
                ) : (
                  <div className="text-muted-foreground text-sm italic">
                    No events scheduled
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}