import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Navbar } from '@/components/Layout/Navbar';
import { Building2, Home, Sparkles, Scale, Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { TemplateSpec } from '@/config/templates/schema';

interface IndustryTemplate {
  id: string;
  key: string;
  name: string;
  version: number;
  spec: TemplateSpec;
  is_active: boolean;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  Building2,
  Home,
  Sparkles,
  Scale
};

const Templates: React.FC = () => {
  const [templates, setTemplates] = useState<IndustryTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const navigate = useNavigate();

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('industry_templates')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (error) throw error;
      setTemplates((data || []) as unknown as IndustryTemplate[]);
    } catch (error) {
      console.error('Error fetching templates:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.spec.meta.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = selectedIndustry === 'all' || template.key.includes(selectedIndustry);
    return matchesSearch && matchesIndustry;
  });

  const industries = ['all', 'luxury', 'roofing', 'legal', 'medical', 'real_estate'];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-20 bg-muted rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Industry Templates
          </h1>
          <p className="text-muted-foreground text-lg">
            Choose a template tailored to your industry to get started quickly
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="px-3 py-2 border border-input bg-background rounded-md text-sm"
            >
              {industries.map(industry => (
                <option key={industry} value={industry}>
                  {industry === 'all' ? 'All Industries' : industry.replace('_', ' ').toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => {
            const IconComponent = iconMap[template.spec.meta.icon || 'Building2'] || Building2;
            
            return (
              <Card 
                key={template.id} 
                className="group hover:shadow-lg transition-all duration-300 border-muted hover:border-primary/50 cursor-pointer"
                onClick={() => navigate(`/dashboard/templates/${template.key}`)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {template.name}
                        </CardTitle>
                        <Badge variant="secondary" className="text-xs">
                          v{template.version}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-sm">
                    {template.spec.meta.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Pipeline Stages:</p>
                      <div className="flex flex-wrap gap-1">
                        {template.spec.pipeline.stages.slice(0, 3).map((stage, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {stage}
                          </Badge>
                        ))}
                        {template.spec.pipeline.stages.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{template.spec.pipeline.stages.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Features:</p>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline" className="text-xs">
                          {template.spec.leadForm.fields.length} Lead Fields
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {template.spec.analytics.kpis.length} KPIs
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          AI Scripts
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button 
                    className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/dashboard/templates/${template.key}`);
                    }}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Building2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg">No templates found matching your criteria</p>
              <p className="text-sm">Try adjusting your search or filter settings</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Templates;