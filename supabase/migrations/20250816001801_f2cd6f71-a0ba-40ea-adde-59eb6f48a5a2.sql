-- Theme settings stored per organization (fallback: user_id)
CREATE TABLE IF NOT EXISTS theme_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid,
  user_id uuid,
  name text DEFAULT 'default',
  vars jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE (organization_id, name)
);

-- Enable RLS
ALTER TABLE theme_settings ENABLE ROW LEVEL SECURITY;

-- RLS policies for theme settings
CREATE POLICY "Users can read their org theme" ON theme_settings
FOR SELECT USING (
  organization_id = auth.uid() OR 
  user_id = auth.uid() OR
  organization_id IS NULL
);

CREATE POLICY "Users can write their org theme" ON theme_settings
FOR INSERT WITH CHECK (
  organization_id = auth.uid() OR 
  user_id = auth.uid()
);

CREATE POLICY "Users can update their org theme" ON theme_settings
FOR UPDATE USING (
  organization_id = auth.uid() OR 
  user_id = auth.uid()
);