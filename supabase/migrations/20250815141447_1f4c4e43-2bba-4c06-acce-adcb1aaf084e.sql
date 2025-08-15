-- Add industry field to profiles table
ALTER TABLE public.profiles 
ADD COLUMN industry industry_type DEFAULT 'real_estate';