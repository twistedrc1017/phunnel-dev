import React from 'react';
import { FieldDef } from '@/hooks/useIndustry';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface FormFieldProps {
  def: FieldDef;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function FormField({ def, value, onChange, error }: FormFieldProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const handleSelectChange = (newValue: string) => {
    onChange(newValue);
  };

  const renderField = () => {
    switch (def.type) {
      case 'select':
        return (
          <Select value={value} onValueChange={handleSelectChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={def.placeholder || `Select ${def.label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {def.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'textarea':
      case 'notes':
        return (
          <Textarea
            value={value}
            onChange={handleInputChange}
            placeholder={def.placeholder || `Enter ${def.label.toLowerCase()}`}
            rows={4}
            className="resize-none"
          />
        );

      case 'money':
        return (
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
            <Input
              type="text"
              value={value}
              onChange={handleInputChange}
              placeholder={def.placeholder || "0.00"}
              className="pl-8"
            />
          </div>
        );

      default:
        return (
          <Input
            type={def.type}
            value={value}
            onChange={handleInputChange}
            placeholder={def.placeholder || `Enter ${def.label.toLowerCase()}`}
          />
        );
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={def.key} className="text-sm font-medium">
        {def.label}
        {def.required && <span className="text-destructive ml-1">*</span>}
      </Label>
      {renderField()}
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}