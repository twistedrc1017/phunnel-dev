import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://xblryvbtsbpxcatuazxt.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhibHJ5dmJ0c2JweGNhdHVhenh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0OTIwMjQsImV4cCI6MjA3MDA2ODAyNH0.-WbCUF7P04L5lUUvOh44VKvOjIPzO7CFWmcaHNS8LgE";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
