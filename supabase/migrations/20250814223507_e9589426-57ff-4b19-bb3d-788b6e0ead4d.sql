-- Insert test data for the current user with correct column names
-- First, let's get the current user's ID and insert a profile
INSERT INTO public.profiles (id, full_name)
VALUES (
  'f0e32b43-586a-4033-b1ae-4a5e75128208',
  'Stephen Prokopich'
) ON CONFLICT (id) DO UPDATE SET
  full_name = EXCLUDED.full_name;

-- Insert test leads with correct column names
INSERT INTO public.leads (user_id, name, email, phone, budget, status, project_location)
VALUES 
  ('f0e32b43-586a-4033-b1ae-4a5e75128208', 'John Smith', 'john@example.com', '+1-555-0101', 850000, 'new', 'Beverly Hills, CA'),
  ('f0e32b43-586a-4033-b1ae-4a5e75128208', 'Sarah Johnson', 'sarah@example.com', '+1-555-0102', 1200000, 'contacted', 'Malibu, CA'),
  ('f0e32b43-586a-4033-b1ae-4a5e75128208', 'Michael Chen', 'michael@example.com', '+1-555-0103', 2500000, 'qualified', 'Manhattan Beach, CA'),
  ('f0e32b43-586a-4033-b1ae-4a5e75128208', 'Emily Davis', 'emily@example.com', '+1-555-0104', 750000, 'converted', 'Santa Monica, CA');

-- Insert test AI conversations
INSERT INTO public.ai_conversations (lead_id, transcript, summary, created_at)
SELECT 
  l.id,
  CASE 
    WHEN l.name = 'John Smith' THEN 'Initial inquiry about custom home construction. Discussed budget, timeline, and design preferences. Very interested in smart home integration.'
    WHEN l.name = 'Sarah Johnson' THEN 'Follow-up call about beachfront renovation. Discussed permits, timeline, and coastal building requirements. Scheduled site visit.'
    WHEN l.name = 'Michael Chen' THEN 'Detailed discussion about ultra-modern design requirements. Reviewed portfolio examples. Very engaged, high conversion potential.'
    ELSE 'Contract signing call. Finalized details and project timeline. Client very satisfied with proposal.'
  END,
  CASE 
    WHEN l.name = 'John Smith' THEN 'Initial inquiry - high interest in smart home features'
    WHEN l.name = 'Sarah Johnson' THEN 'Follow-up call - site visit scheduled'
    WHEN l.name = 'Michael Chen' THEN 'Detailed consultation - high conversion potential'
    ELSE 'Contract signing - project confirmed'
  END,
  NOW() - INTERVAL '1 day' * (ROW_NUMBER() OVER ())
FROM public.leads l
WHERE l.user_id = 'f0e32b43-586a-4033-b1ae-4a5e75128208';

-- Insert test projects
INSERT INTO public.projects (user_id, name, description, status)
VALUES 
  ('f0e32b43-586a-4033-b1ae-4a5e75128208', 'Chen Modern Estate', 'Ultra-modern 8,000 sq ft custom home with smart automation', 'active'),
  ('f0e32b43-586a-4033-b1ae-4a5e75128208', 'Davis Interior Renovation', 'Complete interior renovation of 4,000 sq ft home', 'completed');

-- Insert test analytics data
INSERT INTO public.analytics (user_id, metric_name, metric_value)
VALUES 
  ('f0e32b43-586a-4033-b1ae-4a5e75128208', 'leads_generated', 12),
  ('f0e32b43-586a-4033-b1ae-4a5e75128208', 'ai_calls_handled', 45),
  ('f0e32b43-586a-4033-b1ae-4a5e75128208', 'conversion_rate', 0.18);