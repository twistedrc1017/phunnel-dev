import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Sparkles, Zap, Target } from 'lucide-react';

interface PlanSummaryProps {
  templateKey: string;
  widgets: string[];
  answers: Record<string, any>;
}

const TEMPLATE_DISPLAY_NAMES: Record<string, string> = {
  real_estate: 'Real Estate',
  property_management: 'Property Management', 
  home_services: 'Home Services',
  consulting: 'Consulting',
  restaurants: 'Restaurants'
};

const WIDGET_DISPLAY_NAMES: Record<string, string> = {
  pipeline_overview: 'Pipeline Overview',
  lead_metrics: 'Lead Metrics',
  calendar_widget: 'Calendar & Scheduling',
  property_tracker: 'Property Tracker',
  commission_calculator: 'Commission Calculator',
  market_insights: 'Market Insights',
  unit_turnover_board: 'Unit Turnover Board',
  rent_collection: 'Rent Collection',
  maintenance_tracker: 'Maintenance Tracker',
  crew_scheduler: 'Crew Scheduler',
  estimate_generator: 'Estimate Generator',
  job_tracker: 'Job Tracker',
  proposal_velocity: 'Proposal Velocity',
  project_tracker: 'Project Tracker',
  time_billing: 'Time Billing',
  reservation_manager: 'Reservation Manager',
  menu_analytics: 'Menu Analytics',
  event_planner: 'Event Planner',
  team_performance: 'Team Performance',
  task_manager: 'Task Manager',
  ad_performance: 'Ad Performance',
  roi_tracker: 'ROI Tracker'
};

export function PlanSummary({ templateKey, widgets, answers }: PlanSummaryProps) {
  const templateName = TEMPLATE_DISPLAY_NAMES[templateKey] || templateKey;
  const businessName = answers.business_name || 'Your Business';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="h-6 w-6 text-primary" />
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            Personalized for {businessName}
          </Badge>
        </div>
        <h3 className="text-2xl font-bold">Your Business Setup Plan</h3>
        <p className="text-muted-foreground">
          Based on your answers, we've created a customized setup for your {templateName.toLowerCase()} business.
        </p>
      </div>

      {/* Template Section */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Industry Template: {templateName}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold">Includes:</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Industry-specific lead form
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Customized sales pipeline
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  AI conversation scripts
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Analytics & KPIs
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Perfect for:</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {getTemplateFeatures(templateKey).map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Widgets Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Recommended Dashboard Widgets ({widgets.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {widgets.map((widget) => (
              <div key={widget} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                <span className="text-sm font-medium">
                  {WIDGET_DISPLAY_NAMES[widget] || widget}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Personalization Summary */}
      <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
        <CardContent className="p-6">
          <h4 className="font-semibold mb-3">Why this setup is perfect for you:</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            {getPersonalizationReasons(answers, templateKey).map((reason, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>{reason}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function getTemplateFeatures(templateKey: string): string[] {
  const features: Record<string, string[]> = {
    real_estate: [
      'Buyer & seller management',
      'Property tracking',
      'Showing coordination',
      'Commission tracking'
    ],
    property_management: [
      'Multi-unit tracking',
      'Tenant management', 
      'Maintenance coordination',
      'Rent collection'
    ],
    home_services: [
      'Service scheduling',
      'Estimate generation',
      'Job tracking',
      'Emergency dispatch'
    ],
    consulting: [
      'Project management',
      'Proposal automation',
      'Time billing',
      'Client communication'
    ],
    restaurants: [
      'Event planning',
      'Reservation management',
      'Menu tracking',
      'Customer loyalty'
    ]
  };
  
  return features[templateKey] || ['Custom workflows', 'Lead management', 'Analytics', 'Automation'];
}

function getPersonalizationReasons(answers: Record<string, any>, templateKey: string): string[] {
  const reasons: string[] = [];
  
  if (answers.industry) {
    reasons.push(`You selected ${TEMPLATE_DISPLAY_NAMES[answers.industry]} as your industry`);
  }
  
  if (answers.team_size) {
    const teamSizeText = answers.team_size === '1' || answers.team_size === 'just_me' 
      ? 'solo operation' 
      : 'team-based business';
    reasons.push(`Optimized for your ${teamSizeText}`);
  }
  
  if (answers.pain_points && answers.pain_points.length > 0) {
    reasons.push(`Addresses your key challenges: ${answers.pain_points.slice(0, 2).join(', ')}`);
  }
  
  if (answers.monthly_ad_spend && !answers.monthly_ad_spend.startsWith('under')) {
    reasons.push('Includes marketing ROI tracking for your ad spend');
  }
  
  if (answers.timeline === 'now') {
    reasons.push('Quick setup process to get you started immediately');
  }
  
  return reasons.length > 0 ? reasons : ['Customized for your specific business needs'];
}