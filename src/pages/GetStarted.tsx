import React, { useState, useEffect } from 'react';
import { SurveyContainer } from '@/components/onboarding/SurveyContainer';
import { supabase } from '@/integrations/supabase/client';
import type { OnboardingSurvey } from '@/config/onboarding/schema';
import surveyV1 from '@/config/onboarding/v1.json';

export default function GetStarted() {
  const [survey, setSurvey] = useState<OnboardingSurvey | null>(null);

  useEffect(() => {
    // Load survey from database or use default
    loadSurvey();
  }, []);

  const loadSurvey = async () => {
    try {
      const { data, error } = await supabase
        .from('onboarding_surveys')
        .select('*')
        .eq('is_active', true)
        .order('version', { ascending: false })
        .limit(1)
        .single();

      if (data) {
        setSurvey(data.spec as OnboardingSurvey);
      } else {
        // Use default survey
        setSurvey(surveyV1 as OnboardingSurvey);
      }
    } catch (error) {
      // Fallback to default
      setSurvey(surveyV1 as OnboardingSurvey);
    }
  };

  const handleComplete = (result: any) => {
    console.log('Onboarding completed:', result);
    // Redirect or show success message
  };

  if (!survey) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto">
        <SurveyContainer survey={survey} onComplete={handleComplete} />
      </div>
    </div>
  );
}