-- INDUSTRY TEMPLATES (catalog)
CREATE TABLE IF NOT EXISTS industry_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,          -- "real_estate", "home_services", "legal", "medical", "luxury_builders", "roofing", "solar", "med_spa", "dental_implants"
  name TEXT NOT NULL,
  version INT NOT NULL DEFAULT 1,
  spec JSONB NOT NULL,               -- matches schema in section 2
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ORGANIZATION'S ACTIVE TEMPLATE + OVERRIDES
CREATE TABLE IF NOT EXISTS org_industry_template (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,             -- Using user_id instead of organization_id for simplicity
  template_key TEXT NOT NULL,
  template_version INT NOT NULL,
  overrides JSONB DEFAULT '{}'::jsonb,  -- partial overrides of spec
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id)
);

-- INDUSTRY APPS (catalog of optional features)
CREATE TABLE IF NOT EXISTS industry_apps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,         -- "roofing_estimator", "legal_intake", "permit_checker", "medspa_package_builder"
  name TEXT NOT NULL,
  industry_keys TEXT[] NOT NULL,    -- which industries this app targets
  version INT NOT NULL DEFAULT 1,
  spec JSONB NOT NULL,              -- app manifest
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- APPS INSTALLED PER USER
CREATE TABLE IF NOT EXISTS org_installed_apps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  app_key TEXT NOT NULL,
  config JSONB DEFAULT '{}'::jsonb, -- user-configurable app settings
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, app_key)
);

-- Enable RLS
ALTER TABLE industry_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE org_industry_template ENABLE ROW LEVEL SECURITY;
ALTER TABLE industry_apps ENABLE ROW LEVEL SECURITY;
ALTER TABLE org_installed_apps ENABLE ROW LEVEL SECURITY;

-- RLS Policies for industry_templates (read-only for users)
CREATE POLICY "Anyone can view active templates" 
ON industry_templates 
FOR SELECT 
USING (is_active = true);

-- RLS Policies for org_industry_template
CREATE POLICY "Users can view their own template" 
ON org_industry_template 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own template" 
ON org_industry_template 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own template" 
ON org_industry_template 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own template" 
ON org_industry_template 
FOR DELETE 
USING (auth.uid() = user_id);

-- RLS Policies for industry_apps (read-only for users)
CREATE POLICY "Anyone can view active apps" 
ON industry_apps 
FOR SELECT 
USING (is_active = true);

-- RLS Policies for org_installed_apps
CREATE POLICY "Users can view their own installed apps" 
ON org_installed_apps 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own installed apps" 
ON org_installed_apps 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own installed apps" 
ON org_installed_apps 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own installed apps" 
ON org_installed_apps 
FOR DELETE 
USING (auth.uid() = user_id);

-- Add foreign key reference to industry_templates
ALTER TABLE org_industry_template 
ADD CONSTRAINT fk_template_key 
FOREIGN KEY (template_key) REFERENCES industry_templates(key);

-- Add foreign key reference to industry_apps
ALTER TABLE org_installed_apps 
ADD CONSTRAINT fk_app_key 
FOREIGN KEY (app_key) REFERENCES industry_apps(key);

-- Create trigger for updated_at
CREATE TRIGGER update_industry_templates_updated_at
BEFORE UPDATE ON industry_templates
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_org_industry_template_updated_at
BEFORE UPDATE ON org_industry_template
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_industry_apps_updated_at
BEFORE UPDATE ON industry_apps
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_org_installed_apps_updated_at
BEFORE UPDATE ON org_installed_apps
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();