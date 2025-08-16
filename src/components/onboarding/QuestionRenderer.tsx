import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import type { OnboardingNode } from '@/config/onboarding/schema';

interface QuestionRendererProps {
  node: OnboardingNode;
  value: any;
  onChange: (value: any) => void;
}

export function QuestionRenderer({ node, value, onChange }: QuestionRendererProps) {
  if (node.type === 'intro') {
    return (
      <div className="text-center space-y-4">
        <p className="text-lg text-muted-foreground">
          {node.body}
        </p>
      </div>
    );
  }

  if (node.type !== 'question') {
    return null;
  }

  switch (node.questionType) {
    case 'text':
    case 'email':
    case 'number':
      return (
        <div className="space-y-3">
          <Input
            type={node.questionType === 'email' ? 'email' : 
                  node.questionType === 'number' ? 'number' : 'text'}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={`Enter your ${node.questionType === 'email' ? 'email address' : 
                                    node.questionType === 'number' ? 'number' : 'answer'}`}
            className="text-lg py-3"
          />
        </div>
      );

    case 'single':
      return (
        <RadioGroup
          value={value || ''}
          onValueChange={onChange}
          className="space-y-3"
        >
          {node.options?.map((option) => (
            <div key={option.value} className="flex items-center space-x-3">
              <RadioGroupItem value={option.value} id={option.value} />
              <Label 
                htmlFor={option.value}
                className="text-base font-normal cursor-pointer flex-1 py-2"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      );

    case 'multi':
      const currentValues = Array.isArray(value) ? value : [];
      
      return (
        <div className="space-y-3">
          {node.options?.map((option) => (
            <div key={option.value} className="flex items-center space-x-3">
              <Checkbox
                id={option.value}
                checked={currentValues.includes(option.value)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    onChange([...currentValues, option.value]);
                  } else {
                    onChange(currentValues.filter((v: string) => v !== option.value));
                  }
                }}
              />
              <Label 
                htmlFor={option.value}
                className="text-base font-normal cursor-pointer flex-1 py-2"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      );

    case 'scale':
      const min = node.min || 1;
      const max = node.max || 10;
      
      return (
        <div className="space-y-4">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{min}</span>
            <span>{max}</span>
          </div>
          <input
            type="range"
            min={min}
            max={max}
            value={value || min}
            onChange={(e) => onChange(parseInt(e.target.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
          />
          <div className="text-center">
            <span className="text-lg font-semibold">{value || min}</span>
          </div>
        </div>
      );

    default:
      return (
        <Textarea
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter your answer..."
          className="min-h-[100px]"
        />
      );
  }
}