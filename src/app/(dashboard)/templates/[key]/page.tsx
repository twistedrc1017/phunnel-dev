import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Navbar } from '@/components/Layout/Navbar';
import { ArrowLeft, Building2, Home, Sparkles, Scale, CheckCircle, Settings } from 'lucide-react';
import { TemplateSpec } from '@/config/templates/schema';
import { useActiveTemplate } from '@/hooks/useActiveTemplate';
import { toast } from '@/components/ui/use-toast';

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

const TemplateDetail: React.FC = () => {
  const { key } = useParams<{ key: string }>();
  const navigate = useNavigate();
  const [template, setTemplate] = useState<IndustryTemplate | null>(null);
  const [loading, setLoading] = useState(true);
  const [activating, setActivating] = useState(false);
  const { template: activeTemplate, activateTemplate } = useActiveTemplate();

  useEffect(() => {
    if (key) {
      fetchTemplate();
    }
  }, [key]);

  const fetchTemplate = async () => {
    try {
      const { data, error } = await supabase
        .from('industry_templates')
        .select('*')
        .eq('key', key)
        .eq('is_active', true)
        .single();

      if (error) throw error;
      setTemplate(data as unknown as IndustryTemplate);
    } catch (error) {
      console.error('Error fetching template:', error);
      toast({
        title: "Error",
        description: "Failed to load template details",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleActivateTemplate = async () => {
    if (!template) return;
    
    setActivating(true);
    try {
      await activateTemplate(template.key);
      toast({
        title: "Template Activated",
        description: `${template.name} template has been activated for your account`,
      });
    } catch (error) {
      console.error('Error activating template:', error);
      toast({
        title: "Error",
        description: "Failed to activate template",
        variant: "destructive"
      });
    } finally {
      setActivating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto p-6">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-48 bg-muted rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-32 bg-muted rounded"></div>
              <div className="h-32 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto p-6">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Template Not Found</h1>
            <Button onClick={() => navigate('/dashboard/templates')}>
              Back to Templates
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const IconComponent = iconMap[template.spec.meta.icon || 'Building2'] || Building2;
  const isActive = activeTemplate?.meta.industryKey === template.key;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/dashboard/templates')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Templates
          </Button>
        </div>

        {/* Template Overview */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <IconComponent className="h-8 w-8" />
                </div>
                <div>
                  <CardTitle className="text-2xl">{template.name}</CardTitle>
                  <CardDescription className="text-lg">
                    {template.spec.meta.description}
                  </CardDescription>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary">v{template.version}</Badge>
                    {isActive && (
                      <Badge variant="default" className="bg-green-500">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Active
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                {!isActive && (
                  <Button
                    onClick={handleActivateTemplate}
                    disabled={activating}
                    className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                  >
                    {activating ? 'Activating...' : 'Activate Template'}
                  </Button>
                )}
                {isActive && (
                  <Button variant="outline" className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Configure
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Template Details */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
            <TabsTrigger value="fields">Lead Fields</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Pipeline Stages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {template.spec.pipeline.stages.map((stage, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <span className="text-sm">{stage}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Lead Form Fields</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {template.spec.leadForm.fields.slice(0, 5).map((field, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">{field.label}</span>
                        <Badge variant="outline" className="text-xs">
                          {field.type}
                        </Badge>
                      </div>
                    ))}
                    {template.spec.leadForm.fields.length > 5 && (
                      <p className="text-xs text-muted-foreground">
                        +{template.spec.leadForm.fields.length - 5} more fields
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Analytics KPIs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {template.spec.analytics.kpis.map((kpi, index) => (
                      <div key={index} className="text-sm">
                        <div className="font-medium">{kpi.label}</div>
                        <div className="text-xs text-muted-foreground">{kpi.key}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="pipeline">
            <Card>
              <CardHeader>
                <CardTitle>Sales Pipeline</CardTitle>
                <CardDescription>
                  The stages leads progress through in your sales process
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  {template.spec.pipeline.stages.map((stage, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                        {index + 1}
                      </div>
                      <span className="font-medium">{stage}</span>
                      {index < template.spec.pipeline.stages.length - 1 && (
                        <div className="w-8 h-px bg-border ml-2"></div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fields">
            <Card>
              <CardHeader>
                <CardTitle>Lead Form Fields</CardTitle>
                <CardDescription>
                  Information collected from potential clients
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {template.spec.leadForm.fields.map((field, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{field.label}</h4>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{field.type}</Badge>
                          {field.required && (
                            <Badge variant="destructive" className="text-xs">Required</Badge>
                          )}
                        </div>
                      </div>
                      {field.placeholder && (
                        <p className="text-sm text-muted-foreground mb-2">
                          Placeholder: {field.placeholder}
                        </p>
                      )}
                      {field.options && (
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Options:</p>
                          <div className="flex flex-wrap gap-1">
                            {field.options.slice(0, 3).map((option, optIndex) => (
                              <Badge key={optIndex} variant="secondary" className="text-xs">
                                {option.label}
                              </Badge>
                            ))}
                            {field.options.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{field.options.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Key Performance Indicators</CardTitle>
                <CardDescription>
                  Metrics to track your business performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {template.spec.analytics.kpis.map((kpi, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">{kpi.label}</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Key: <code className="text-xs bg-muted px-1 rounded">{kpi.key}</code>
                      </p>
                      <p className="text-sm">
                        Formula: <code className="text-xs bg-muted px-1 rounded">{kpi.formula}</code>
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>AI Scripts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Introduction</h4>
                    <p className="text-sm text-muted-foreground">
                      {template.spec.aiScripts.intro}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Closing</h4>
                    <p className="text-sm text-muted-foreground">
                      {template.spec.aiScripts.closing}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Qualifier Questions</h4>
                    <ul className="space-y-1">
                      {template.spec.aiScripts.qualifiers.map((question, index) => (
                        <li key={index} className="text-sm text-muted-foreground">
                          • {question}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Calendar & Events</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">View Modes</h4>
                    <div className="flex gap-2">
                      {template.spec.calendar.viewModes.map((mode, index) => (
                        <Badge key={index} variant="outline">{mode}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Event Fields</h4>
                    <div className="space-y-2">
                      {template.spec.calendar.eventFields.map((field, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm">{field.label}</span>
                          <Badge variant="outline" className="text-xs">{field.type}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TemplateDetail;