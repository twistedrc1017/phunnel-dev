import React from 'react';
import { FormField } from '@/components/form/FormField';
import { useIndustry, IndustryKey } from '@/hooks/useIndustry';
import { getIndustryConfig } from '@/config/industry';

interface IndustryLeadFieldsProps {
  industry: IndustryKey;
  values: Record<string, any>;
  onChange: (key: string, value: any) => void;
  errors?: Record<string, string>;
}

export function IndustryLeadFields({ industry, values, onChange, errors }: IndustryLeadFieldsProps) {
  const industryConfig = getIndustryConfig(industry);
  const leadFields = industryConfig.leadFields;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {leadFields.map((field) => (
        <FormField
          key={field.key}
          def={field}
          value={values[field.key] || ''}
          onChange={(value) => onChange(field.key, value)}
          error={errors?.[field.key]}
        />
      ))}
    </div>
  );
}