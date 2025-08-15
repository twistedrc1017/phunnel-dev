import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type IndustryKey = 'real_estate' | 'property_management' | 'healthcare' | 'legal_services' | 'home_services' | 'consulting' | 'restaurants' | 'other';

export type FieldDef = { 
  key: string; 
  label: string; 
  type: 'text' | 'email' | 'tel' | 'select' | 'date' | 'money' | 'notes' | 'textarea'; 
  required?: boolean; 
  options?: { label: string; value: string }[];
  placeholder?: string;
};

export type IndustryConfig = {
  displayName: string;
  leadFields: FieldDef[];
  pipelineStages: string[];
  calendarEventTypes: string[];
  aiScriptContext: string;
};

export function useIndustry() {
  const [industry, setIndustry] = useState<IndustryKey | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUserIndustry();
  }, []);

  const fetchUserIndustry = async (): Promise<IndustryKey | null> => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setError('User not authenticated');
        return null;
      }

      const { data, error: profileError } = await supabase
        .from('profiles')
        .select('industry')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error('Error fetching user industry:', profileError);
        setError('Failed to fetch user industry');
        return null;
      }

      const userIndustry = data?.industry as IndustryKey || 'other';
      setIndustry(userIndustry);
      return userIndustry;
    } catch (err) {
      console.error('Error in fetchUserIndustry:', err);
      setError('Failed to fetch user industry');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { industry, loading, error, refetch: fetchUserIndustry };
}