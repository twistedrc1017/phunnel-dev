export type ThemeVars = Partial<{
  "--background": string;
  "--foreground": string;
  "--card": string;
  "--card-foreground": string;
  "--primary": string;
  "--primary-foreground": string;
  "--secondary": string;
  "--secondary-foreground": string;
  "--muted": string;
  "--muted-foreground": string;
  "--accent": string;
  "--accent-foreground": string;
  "--destructive": string;
  "--destructive-foreground": string;
  "--border": string;
  "--input": string;
  "--ring": string;
  "--radius": string;
  "--shadow-sm": string;
  "--shadow": string;
  "--shadow-lg": string;
  "--font-sans": string;
  "--font-size-base": string;
  "--line-height": string;
}>;

export type ThemeSettings = {
  id?: string;
  organization_id?: string | null;
  user_id?: string | null;
  name: string;
  vars: ThemeVars;
  created_at?: string;
  updated_at?: string;
};