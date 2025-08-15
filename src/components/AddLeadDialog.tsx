import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useIndustry, FieldDef } from '@/hooks/useIndustry';
import { getIndustryConfig } from '@/config/industry';
import { Plus } from 'lucide-react';

interface AddLeadDialogProps {
  onLeadAdded?: () => void;
}

export function AddLeadDialog({ onLeadAdded }: AddLeadDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const { industry } = useIndustry();
  const { toast } = useToast();

  const industryConfig = industry ? getIndustryConfig(industry) : null;
  const leadFields = industryConfig?.leadFields || [];

  const handleFieldChange = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!industry) return;

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Only include supported industry types for the database
      const validIndustry = industry === 'other' ? 'home_services' : industry;
      
      const payload = {
        name: formData.name || formData.client_name || formData.customer_name || 'New Lead',
        email: formData.email || formData.contact_email || '',
        phone: formData.phone || formData.contact_tel || '',
        budget: formData.budget ? parseFloat(formData.budget) : null,
        industry: validIndustry,
        user_id: user.id,
        status: 'new' as const,
        custom_fields: formData,
        created_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('leads')
        .insert(payload);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Lead added successfully",
      });

      setFormData({});
      setOpen(false);
      onLeadAdded?.();
    } catch (error: any) {
      console.error('Error adding lead:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to add lead",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderField = (field: FieldDef) => {
    const value = formData[field.key] || '';

    switch (field.type) {
      case 'select':
        return (
          <div key={field.key} className="space-y-2">
            <Label htmlFor={field.key}>
              {field.label} {field.required && <span className="text-destructive">*</span>}
            </Label>
            <Select value={value} onValueChange={(v) => handleFieldChange(field.key, v)}>
              <SelectTrigger>
                <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case 'textarea':
      case 'notes':
        return (
          <div key={field.key} className="space-y-2">
            <Label htmlFor={field.key}>
              {field.label} {field.required && <span className="text-destructive">*</span>}
            </Label>
            <Textarea
              id={field.key}
              value={value}
              onChange={(e) => handleFieldChange(field.key, e.target.value)}
              placeholder={`Enter ${field.label.toLowerCase()}`}
              required={field.required}
              rows={3}
            />
          </div>
        );

      case 'money':
        return (
          <div key={field.key} className="space-y-2">
            <Label htmlFor={field.key}>
              {field.label} {field.required && <span className="text-destructive">*</span>}
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                id={field.key}
                type="text"
                value={value}
                onChange={(e) => handleFieldChange(field.key, e.target.value)}
                placeholder="0.00"
                className="pl-8"
                required={field.required}
              />
            </div>
          </div>
        );

      default:
        return (
          <div key={field.key} className="space-y-2">
            <Label htmlFor={field.key}>
              {field.label} {field.required && <span className="text-destructive">*</span>}
            </Label>
            <Input
              id={field.key}
              type={field.type}
              value={value}
              onChange={(e) => handleFieldChange(field.key, e.target.value)}
              placeholder={`Enter ${field.label.toLowerCase()}`}
              required={field.required}
            />
          </div>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Lead
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Lead</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {leadFields.map(renderField)}
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Lead'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}