import React from 'react';
import { CalendarShell } from '@/components/Calendar/CalendarShell';
import { Navbar } from '@/components/Layout/Navbar';

export default function Calendar() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container-responsive py-6 max-w-full overflow-x-hidden">
        <CalendarShell className="w-full" />
      </div>
    </div>
  );
}