import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { IndustryLeadForm } from './IndustryLeadForm';

interface AddLeadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLeadAdded: () => void;
}

export type IndustryType = 'real_estate' | 'property_management' | 'healthcare' | 'legal_services' | 'home_services' | 'consulting' | 'restaurants';

interface LeadFormData {
  name: string;
  email: string;
  phone: string;
  project_location: string;
  budget: string;
  timeline: string;
  custom_fields: Record<string, any>;
}

const initialFormData: LeadFormData = {
  name: '',
  email: '',
  phone: '',
  project_location: '',
  budget: '',
  timeline: '',
  custom_fields: {}
};

export const AddLeadDialog: React.FC<AddLeadDialogProps> = ({ open, onOpenChange, onLeadAdded }) => {
  const [formData, setFormData] = useState<LeadFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userIndustry, setUserIndustry] = useState<IndustryType | null>(null);
  const [isLoadingIndustry, setIsLoadingIndustry] = useState(false);
  const { toast } = useToast();

  // Fetch user's industry on component mount
  useEffect(() => {
    const fetchUserIndustry = async () => {
      if (!open) return;
      
      setIsLoadingIndustry(true);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('User not authenticated');

        const { data: profile, error } = await supabase
          .from('profiles')
          .select('industry')
          .eq('id', user.id)
          .maybeSingle();

        if (error) throw error;
        
        setUserIndustry(profile?.industry || 'real_estate');
      } catch (error: any) {
        toast({
          title: "Error",
          description: "Failed to load user profile",
          variant: "destructive",
        });
      } finally {
        setIsLoadingIndustry(false);
      }
    };

    fetchUserIndustry();
  }, [open, toast]);

  const handleInputChange = (field: keyof LeadFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCustomFieldChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      custom_fields: { ...prev.custom_fields, [field]: value }
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast({ title: "Validation Error", description: "Name is required", variant: "destructive" });
      return false;
    }
    if (!userIndustry) {
      toast({ title: "Validation Error", description: "User industry not loaded", variant: "destructive" });
      return false;
    }
    if (!formData.email.trim() && !formData.phone.trim()) {
      toast({ title: "Validation Error", description: "Either email or phone is required", variant: "destructive" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      const leadData = {
        user_id: user.id,
        name: formData.name.trim(),
        email: formData.email.trim() || null,
        phone: formData.phone.trim() || null,
        industry: userIndustry,
        project_location: formData.project_location.trim() || null,
        budget: formData.budget ? parseFloat(formData.budget) : null,
        timeline: formData.timeline.trim() || null,
        custom_fields: formData.custom_fields,
        status: 'new' as const
      };

      const { error } = await supabase
        .from('leads')
        .insert([leadData]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Lead added successfully",
      });

      setFormData(initialFormData);
      onLeadAdded();
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingIndustry) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Lead</DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="animate-pulse">Loading user profile...</div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card/95 backdrop-blur-sm border border-border/50">
        <DialogHeader>
          <DialogTitle className="text-2xl font-light bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Add New Lead - {userIndustry?.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-foreground">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Lead name"
                className="bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="lead@example.com"
                className="bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium text-foreground">Phone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="+1 (555) 000-0000"
              className="bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="project_location" className="text-sm font-medium text-foreground">Project Location</Label>
              <Input
                id="project_location"
                value={formData.project_location}
                onChange={(e) => handleInputChange('project_location', e.target.value)}
                placeholder="City, State"
                className="bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="budget" className="text-sm font-medium text-foreground">Budget ($)</Label>
              <Input
                id="budget"
                type="number"
                value={formData.budget}
                onChange={(e) => handleInputChange('budget', e.target.value)}
                placeholder="50000"
                className="bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="timeline" className="text-sm font-medium text-foreground">Timeline</Label>
            <Input
              id="timeline"
              value={formData.timeline}
              onChange={(e) => handleInputChange('timeline', e.target.value)}
              placeholder="e.g., 3-6 months"
              className="bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20"
            />
          </div>

          {/* Industry-Specific Fields */}
          {userIndustry && (
            <div className="border-t border-border/50 pt-6">
              <h3 className="text-lg font-medium text-foreground mb-4">
                {userIndustry.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())} Specific Information
              </h3>
              <IndustryLeadForm
                industry={userIndustry}
                customFields={formData.custom_fields}
                onFieldChange={handleCustomFieldChange}
              />
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-border/50">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
              className="border-border/50 hover:bg-muted/50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !userIndustry}
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg hover:shadow-primary/20 transition-all duration-200"
            >
              {isSubmitting ? 'Adding Lead...' : 'Add Lead'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};