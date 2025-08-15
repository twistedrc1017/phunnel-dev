-- Create industry enum
CREATE TYPE industry_type AS ENUM (
  'real_estate',
  'property_management', 
  'healthcare',
  'legal_services',
  'home_services',
  'consulting',
  'restaurants'
);

-- Add industry and custom_fields columns to leads table
ALTER TABLE public.leads 
ADD COLUMN industry industry_type,
ADD COLUMN custom_fields JSONB DEFAULT '{}';

-- Update the leads table to make industry required for new records
ALTER TABLE public.leads 
ALTER COLUMN industry SET DEFAULT 'real_estate';