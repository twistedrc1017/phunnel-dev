-- Insert test data for the current user
-- First, let's get the current user's ID and insert a profile
INSERT INTO public.profiles (id, full_name, email, phone, company)
VALUES (
  'f0e32b43-586a-4033-b1ae-4a5e75128208',
  'Stephen Prokopich',
  'stephen@dgtlgroup.io',
  '+1-555-0123',
  'DGTL Group'
) ON CONFLICT (id) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  email = EXCLUDED.email,
  phone = EXCLUDED.phone,
  company = EXCLUDED.company;

-- Insert test leads
INSERT INTO public.leads (user_id, name, email, phone, budget, status, location, project_type, notes)
VALUES 
  ('f0e32b43-586a-4033-b1ae-4a5e75128208', 'John Smith', 'john@example.com', '+1-555-0101', 850000, 'new', 'Beverly Hills, CA', 'custom_home', 'Interested in modern luxury home with smart features'),
  ('f0e32b43-586a-4033-b1ae-4a5e75128208', 'Sarah Johnson', 'sarah@example.com', '+1-555-0102', 1200000, 'contacted', 'Malibu, CA', 'renovation', 'Looking to renovate beachfront property'),
  ('f0e32b43-586a-4033-b1ae-4a5e75128208', 'Michael Chen', 'michael@example.com', '+1-555-0103', 2500000, 'qualified', 'Manhattan Beach, CA', 'custom_home', 'Tech executive wanting ultra-modern design'),
  ('f0e32b43-586a-4033-b1ae-4a5e75128208', 'Emily Davis', 'emily@example.com', '+1-555-0104', 750000, 'converted', 'Santa Monica, CA', 'renovation', 'Interior designer, signed contract last week');

-- Insert test AI conversations
INSERT INTO public.ai_conversations (lead_id, transcript, summary, sentiment_score, call_duration, created_at)
SELECT 
  l.id,
  CASE 
    WHEN l.name = 'John Smith' THEN '{"conversation": "Initial inquiry about custom home construction. Discussed budget, timeline, and design preferences. Very interested in smart home integration."}'
    WHEN l.name = 'Sarah Johnson' THEN '{"conversation": "Follow-up call about beachfront renovation. Discussed permits, timeline, and coastal building requirements. Scheduled site visit."}'
    WHEN l.name = 'Michael Chen' THEN '{"conversation": "Detailed discussion about ultra-modern design requirements. Reviewed portfolio examples. Very engaged, high conversion potential."}'
    ELSE '{"conversation": "Contract signing call. Finalized details and project timeline. Client very satisfied with proposal."}'
  END,
  CASE 
    WHEN l.name = 'John Smith' THEN 'Initial inquiry - high interest in smart home features'
    WHEN l.name = 'Sarah Johnson' THEN 'Follow-up call - site visit scheduled'
    WHEN l.name = 'Michael Chen' THEN 'Detailed consultation - high conversion potential'
    ELSE 'Contract signing - project confirmed'
  END,
  CASE 
    WHEN l.name = 'John Smith' THEN 0.8
    WHEN l.name = 'Sarah Johnson' THEN 0.75
    WHEN l.name = 'Michael Chen' THEN 0.95
    ELSE 0.9
  END,
  CASE 
    WHEN l.name = 'John Smith' THEN 1800
    WHEN l.name = 'Sarah Johnson' THEN 2100
    WHEN l.name = 'Michael Chen' THEN 2700
    ELSE 1500
  END,
  NOW() - INTERVAL '1 day' * (ROW_NUMBER() OVER ())
FROM public.leads l
WHERE l.user_id = 'f0e32b43-586a-4033-b1ae-4a5e75128208';

-- Insert test projects
INSERT INTO public.projects (user_id, name, description, budget, status, start_date, expected_end_date, location)
VALUES 
  ('f0e32b43-586a-4033-b1ae-4a5e75128208', 'Chen Modern Estate', 'Ultra-modern 8,000 sq ft custom home with smart automation', 2500000, 'in_progress', '2024-02-01', '2025-08-01', 'Manhattan Beach, CA'),
  ('f0e32b43-586a-4033-b1ae-4a5e75128208', 'Davis Interior Renovation', 'Complete interior renovation of 4,000 sq ft home', 750000, 'completed', '2024-01-15', '2024-06-30', 'Santa Monica, CA');

-- Insert test analytics data
INSERT INTO public.analytics (user_id, metric_name, metric_value, date_recorded)
VALUES 
  ('f0e32b43-586a-4033-b1ae-4a5e75128208', 'leads_generated', 12, CURRENT_DATE - INTERVAL '7 days'),
  ('f0e32b43-586a-4033-b1ae-4a5e75128208', 'leads_generated', 8, CURRENT_DATE - INTERVAL '6 days'),
  ('f0e32b43-586a-4033-b1ae-4a5e75128208', 'leads_generated', 15, CURRENT_DATE - INTERVAL '5 days'),
  ('f0e32b43-586a-4033-b1ae-4a5e75128208', 'leads_generated', 10, CURRENT_DATE - INTERVAL '4 days'),
  ('f0e32b43-586a-4033-b1ae-4a5e75128208', 'leads_generated', 18, CURRENT_DATE - INTERVAL '3 days'),
  ('f0e32b43-586a-4033-b1ae-4a5e75128208', 'leads_generated', 22, CURRENT_DATE - INTERVAL '2 days'),
  ('f0e32b43-586a-4033-b1ae-4a5e75128208', 'leads_generated', 14, CURRENT_DATE - INTERVAL '1 day'),
  ('f0e32b43-586a-4033-b1ae-4a5e75128208', 'ai_calls_handled', 45, CURRENT_DATE - INTERVAL '7 days'),
  ('f0e32b43-586a-4033-b1ae-4a5e75128208', 'ai_calls_handled', 38, CURRENT_DATE - INTERVAL '6 days'),
  ('f0e32b43-586a-4033-b1ae-4a5e75128208', 'ai_calls_handled', 52, CURRENT_DATE - INTERVAL '5 days'),
  ('f0e32b43-586a-4033-b1ae-4a5e75128208', 'conversion_rate', 0.15, CURRENT_DATE - INTERVAL '7 days'),
  ('f0e32b43-586a-4033-b1ae-4a5e75128208', 'conversion_rate', 0.18, CURRENT_DATE - INTERVAL '6 days'),
  ('f0e32b43-586a-4033-b1ae-4a5e75128208', 'conversion_rate', 0.22, CURRENT_DATE - INTERVAL '5 days');