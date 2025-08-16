import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { matchTemplateAndWidgets } from '@/lib/onboarding/match';

export function ApplySetupButton({ answers, templateKey, widgets }: {
  answers: Record<string, any>;
  templateKey: string;
  widgets: string[];
}) {
  const [applying, setApplying] = useState(false);
  const { toast } = useToast();

  const handleApplySetup = async () => {
    setApplying(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to apply your setup.",
          variant: "destructive"
        });
        return;
      }

      // Create or update user's industry template selection
      const { error: templateError } = await supabase
        .from('org_industry_template')
        .upsert({
          user_id: user.id,
          template_key: templateKey,
          template_version: 1,
          overrides: {}
        }, {
          onConflict: 'user_id'
        });

      if (templateError) throw templateError;

      // Set up default dashboard layout with recommended widgets
      const layoutConfig = widgets.map((widget, index) => ({
        key: widget,
        x: (index % 3) * 4,
        y: Math.floor(index / 3) * 4,
        w: 4,
        h: 4,
        config: {}
      }));

      const { error: layoutError } = await supabase
        .from('org_dashboard_layout')
        .upsert({
          organization_id: user.id,
          layout: layoutConfig
        }, {
          onConflict: 'organization_id'
        });

      if (layoutError) throw layoutError;

      toast({
        title: "Setup applied successfully!",
        description: "Your personalized business setup is now active. Redirecting to dashboard...",
      });

      // Redirect to dashboard after a brief delay
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 2000);

    } catch (error) {
      console.error('Error applying setup:', error);
      toast({
        title: "Error applying setup",
        description: "Please try again or contact support.",
        variant: "destructive"
      });
    } finally {
      setApplying(false);
    }
  };

  return (
    <Button 
      onClick={handleApplySetup}
      disabled={applying}
      size="lg"
      className="w-full md:w-auto"
    >
      {applying ? 'Applying Setup...' : 'Apply Setup & Get Started'}
    </Button>
  );
}