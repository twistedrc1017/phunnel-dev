import React from 'react';
import { ThemeEditor } from '@/components/theme/ThemeEditor';
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
            Customize your workspace appearance. Changes apply instantly and are saved automatically.
          </p>
        </div>

        {/* Theme Editor */}
        <ThemeEditor />
      </div>
    </div>
  );
}