import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ThemeVars, ThemeSettings } from "@/lib/theme/types";
import { applyThemeVars } from "@/lib/theme/utils";

type ThemeContext = {
  vars: ThemeVars;
  setVars: (vars: ThemeVars) => void;
  save: () => Promise<void>;
  reset: () => void;
  loading: boolean;
  saving: boolean;
  canEdit: boolean;
};

const ThemeCtx = createContext<ThemeContext | null>(null);

const DEFAULT_VARS: ThemeVars = {
  /* Light theme — white background, green primary (#7eb82e ~= hsl(85 60% 45%)) */
  "--background": "0 0% 100%",
  "--foreground": "240 10% 3.9%",

  "--card": "0 0% 100%",
  "--card-foreground": "240 10% 3.9%",

  "--primary": "85 60% 45%",
  "--primary-foreground": "0 0% 100%",

  /* Subtle surfaces */
  "--secondary": "240 4.8% 96%",
  "--secondary-foreground": "240 6% 12%",

  "--muted": "240 5% 96%",
  "--muted-foreground": "240 4% 46%",

  /* Green-tinted accent for highlights/badges */
  "--accent": "85 50% 92%",
  "--accent-foreground": "85 40% 20%",

  /* Feedback */
  "--destructive": "0 84% 60%",
  "--destructive-foreground": "0 0% 98%",

  /* Controls */
  "--border": "240 6% 90%",
  "--input": "240 6% 90%",
  "--ring": "85 60% 45%",

  /* Layout & Typography */
  "--radius": "0.75rem",
  "--shadow-sm": "0 1px 2px 0 hsl(0 0% 0% / 0.05)",
  "--shadow": "0 1px 3px 0 hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10)",
  "--shadow-lg": "0 10px 15px -3px hsl(0 0% 0% / 0.10), 0 4px 6px -4px hsl(0 0% 0% / 0.10)",
  "--font-sans": 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  "--font-size-base": "16px",
  "--line-height": "1.6"
};

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [vars, setVars] = useState<ThemeVars>(DEFAULT_VARS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [canEdit, setCanEdit] = useState(false);

  const loadTheme = useCallback(async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // Check user permissions (simplified - assume all logged in users can edit for now)
        setCanEdit(true);

        // Try to load org theme, fallback to user theme
        const { data, error } = await supabase
          .from('theme_settings')
          .select('*')
          .eq('name', 'default')
          .or(`user_id.eq.${user.id},organization_id.eq.${user.id}`)
          .order('updated_at', { ascending: false })
          .limit(1)
          .single();

        if (data && !error) {
          const themeVars = (data.vars as ThemeVars) || {};
          const mergedVars = { ...DEFAULT_VARS, ...themeVars };
          setVars(mergedVars);
          applyThemeVars(mergedVars);
        } else {
          // Apply defaults
          applyThemeVars(DEFAULT_VARS);
        }
      } else {
        // Apply defaults for non-authenticated users
        applyThemeVars(DEFAULT_VARS);
        setCanEdit(false);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
      applyThemeVars(DEFAULT_VARS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTheme();
  }, [loadTheme]);

  // Apply theme vars when they change
  useEffect(() => {
    applyThemeVars(vars);
  }, [vars]);

  const save = useCallback(async () => {
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const payload = {
        user_id: user.id,
        organization_id: user.id, // Simplified - use user.id as org for now
        name: 'default',
        vars: vars as any // Cast to any for Supabase Json type
      };

      const { error } = await supabase
        .from('theme_settings')
        .upsert(payload, {
          onConflict: 'organization_id,name'
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error saving theme:', error);
      throw error;
    } finally {
      setSaving(false);
    }
  }, [vars]);

  const reset = useCallback(() => {
    setVars(DEFAULT_VARS);
    applyThemeVars(DEFAULT_VARS);
  }, []);

  return (
    <ThemeCtx.Provider value={{ vars, setVars, save, reset, loading, saving, canEdit }}>
      {children}
    </ThemeCtx.Provider>
  );
}

export const useThemeEditor = () => {
  const context = useContext(ThemeCtx);
  if (!context) {
    throw new Error('useThemeEditor must be used within a ThemeProvider');
  }
  return context;
};
