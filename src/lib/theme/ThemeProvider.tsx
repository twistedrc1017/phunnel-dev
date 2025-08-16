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
  "--background": "222.2 84% 4.9%",
  "--foreground": "210 40% 98%",
  "--card": "222.2 84% 4.9%",
  "--card-foreground": "210 40% 98%",
  "--primary": "47.9 95.8% 53.1%", // Gold
  "--primary-foreground": "26 83.3% 14.1%",
  "--secondary": "217.2 32.6% 17.5%",
  "--secondary-foreground": "210 40% 98%",
  "--muted": "217.2 32.6% 17.5%",
  "--muted-foreground": "215 20.2% 65.1%",
  "--accent": "217.2 32.6% 17.5%",
  "--accent-foreground": "210 40% 98%",
  "--destructive": "0 84.2% 60.2%",
  "--destructive-foreground": "210 40% 98%",
  "--border": "217.2 32.6% 17.5%",
  "--input": "217.2 32.6% 17.5%",
  "--ring": "47.9 95.8% 53.1%",
  "--radius": "0.75rem",
  "--shadow-sm": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  "--shadow": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  "--shadow-lg": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  "--font-sans": "ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji",
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