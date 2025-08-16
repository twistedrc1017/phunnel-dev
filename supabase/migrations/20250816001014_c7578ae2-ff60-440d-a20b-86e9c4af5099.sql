-- Add marketing flag to industry_templates if missing
ALTER TABLE industry_templates 
ADD COLUMN IF NOT EXISTS hide_from_marketing boolean DEFAULT false;

-- Deactivate everything not in the curated list
UPDATE industry_templates
SET is_active = false, hide_from_marketing = true
WHERE key NOT IN ('real_estate','property_management','home_services','consulting','restaurants');

-- Create onboarding survey tables
CREATE TABLE IF NOT EXISTS onboarding_surveys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  version int NOT NULL,
  spec jsonb NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS onboarding_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  email text,
  version int NOT NULL,
  cursor text,
  answers jsonb DEFAULT '{}'::jsonb,
  recommended_template text,
  recommended_widgets text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS onboarding_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid REFERENCES onboarding_sessions(id) ON DELETE CASCADE,
  business_name text,
  website text,
  industry text,
  team_size int,
  monthly_ad_spend int,
  primary_goals text[],
  pains text[],
  timeline text,
  created_at timestamptz DEFAULT now()
);

-- Create dashboard widgets tables
CREATE TABLE IF NOT EXISTS dashboard_widgets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  name text NOT NULL,
  industries text[] NOT NULL,
  component_path text NOT NULL,
  config_schema jsonb NOT NULL,
  default_config jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS org_dashboard_layout (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL,
  layout jsonb NOT NULL,
  updated_at timestamptz DEFAULT now(),
  UNIQUE(organization_id)
);

-- Create feature requests table
CREATE TABLE IF NOT EXISTS feature_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid,
  category text NOT NULL,
  industries text[],
  description text NOT NULL,
  file_url text,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on new tables
ALTER TABLE onboarding_surveys ENABLE ROW LEVEL SECURITY;
ALTER TABLE onboarding_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE onboarding_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE dashboard_widgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE org_dashboard_layout ENABLE ROW LEVEL SECURITY;
ALTER TABLE feature_requests ENABLE ROW LEVEL SECURITY;

-- RLS policies for onboarding surveys (public read for active surveys)
CREATE POLICY "Anyone can view active surveys" ON onboarding_surveys
FOR SELECT USING (is_active = true);

-- RLS policies for onboarding sessions (users can manage their own)
CREATE POLICY "Users can create sessions" ON onboarding_sessions
FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view their sessions" ON onboarding_sessions
FOR SELECT USING (user_id = auth.uid() OR user_id IS NULL);

CREATE POLICY "Users can update their sessions" ON onboarding_sessions
FOR UPDATE USING (user_id = auth.uid() OR user_id IS NULL);

-- RLS policies for onboarding responses
CREATE POLICY "Users can create responses" ON onboarding_responses
FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view responses from their sessions" ON onboarding_responses
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM onboarding_sessions 
    WHERE onboarding_sessions.id = onboarding_responses.session_id 
    AND (onboarding_sessions.user_id = auth.uid() OR onboarding_sessions.user_id IS NULL)
  )
);

-- RLS policies for dashboard widgets (public read)
CREATE POLICY "Anyone can view widgets" ON dashboard_widgets
FOR SELECT USING (true);

-- RLS policies for org dashboard layout (users manage their own)
CREATE POLICY "Users can manage their dashboard layout" ON org_dashboard_layout
FOR ALL USING (organization_id = auth.uid());

-- RLS policies for feature requests (users manage their own)
CREATE POLICY "Users can create feature requests" ON feature_requests
FOR INSERT WITH CHECK (organization_id = auth.uid() OR organization_id IS NULL);

CREATE POLICY "Users can view their feature requests" ON feature_requests
FOR SELECT USING (organization_id = auth.uid() OR organization_id IS NULL);