import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';

export default function AppearanceSettings() {
  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              <Sparkles className="h-4 w-4 mr-1" />
              Appearance
            </Badge>
          </div>
          <h1 className="text-3xl font-bold">Theme Customization</h1>
          <p className="text-muted-foreground mt-2">
            The app now uses a fixed green and white theme defined in the CSS variables.
          </p>
        </div>

        {/* Simple message since theme editor is removed */}
        <div className="bg-card border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Fixed Theme</h2>
          <p className="text-muted-foreground">
            The application is now using a consistent green (#7EB82E) and white theme throughout. 
            All styling is handled via Tailwind CSS with design tokens defined in the index.css file.
          </p>
        </div>
      </div>
    </div>
  );
}