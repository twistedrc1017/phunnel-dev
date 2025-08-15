import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { TemplateSpec } from '@/config/templates/schema';

export function useActiveTemplate() {
  const [template, setTemplate] = useState<TemplateSpec | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchActiveTemplate();
  }, []);

  const fetchActiveTemplate = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setError('User not authenticated');
        return;
      }

      // First, get the user's active template
      const { data: orgTemplate, error: orgError } = await supabase
        .from('org_industry_template')
        .select('template_key, template_version, overrides')
        .eq('user_id', user.id)
        .maybeSingle();

      if (orgError) {
        console.error('Error fetching org template:', orgError);
        setError('Failed to fetch user template');
        return;
      }

      if (!orgTemplate) {
        // No template set yet, return null
        setTemplate(null);
        return;
      }

      // Get the base template
      const { data: baseTemplate, error: baseError } = await supabase
        .from('industry_templates')
        .select('spec')
        .eq('key', orgTemplate.template_key)
        .eq('version', orgTemplate.template_version)
        .single();

      if (baseError) {
        console.error('Error fetching base template:', baseError);
        setError('Failed to fetch template');
        return;
      }

      // Merge base template with overrides
      const baseSpec = baseTemplate.spec as TemplateSpec;
      const overrides = orgTemplate.overrides as Partial<TemplateSpec>;
      const mergedSpec = {
        ...baseSpec,
        ...overrides
      } as TemplateSpec;

      setTemplate(mergedSpec);
    } catch (err) {
      console.error('Error in fetchActiveTemplate:', err);
      setError('Failed to fetch template');
    } finally {
      setLoading(false);
    }
  };

  const activateTemplate = async (templateKey: string, overrides: Partial<TemplateSpec> = {}) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Get the latest version of the template
      const { data: templateData, error: templateError } = await supabase
        .from('industry_templates')
        .select('version')
        .eq('key', templateKey)
        .eq('is_active', true)
        .single();

      if (templateError) throw templateError;

      // Upsert the user's template selection
      const { error: upsertError } = await supabase
        .from('org_industry_template')
        .upsert({
          user_id: user.id,
          template_key: templateKey,
          template_version: templateData.version,
          overrides: overrides
        }, {
          onConflict: 'user_id'
        });

      if (upsertError) throw upsertError;

      // Refresh the template
      await fetchActiveTemplate();
    } catch (err) {
      console.error('Error activating template:', err);
      throw err;
    }
  };

  return {
    template,
    loading,
    error,
    activateTemplate,
    refetch: fetchActiveTemplate
  };
}