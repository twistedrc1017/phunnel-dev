interface MatchingCriteria {
  answers: Record<string, any>;
}

interface MatchResult {
  templateKey: string;
  confidence: number;
  widgets: string[];
  reasoning: string[];
}

const CURATED_INDUSTRIES = ['real_estate', 'property_management', 'home_services', 'consulting', 'restaurants'];

export function matchTemplateAndWidgets(criteria: MatchingCriteria): MatchResult {
  const { answers } = criteria;
  
  // Direct industry match (highest confidence)
  if (answers.industry && CURATED_INDUSTRIES.includes(answers.industry)) {
    return {
      templateKey: answers.industry,
      confidence: 0.95,
      widgets: getRecommendedWidgets(answers.industry, answers),
      reasoning: [`Direct industry match: ${answers.industry}`]
    };
  }
  
  // Infer from pain points and business type
  const inferredIndustry = inferIndustryFromPains(answers.pain_points || [], answers);
  
  if (inferredIndustry) {
    return {
      templateKey: inferredIndustry,
      confidence: 0.75,
      widgets: getRecommendedWidgets(inferredIndustry, answers),
      reasoning: [`Inferred from pain points and business context`]
    };
  }
  
  // Default to consulting for business-to-business, real estate for others
  const defaultIndustry = isB2B(answers) ? 'consulting' : 'real_estate';
  
  return {
    templateKey: defaultIndustry,
    confidence: 0.5,
    widgets: getRecommendedWidgets(defaultIndustry, answers),
    reasoning: [`Default recommendation based on business type`]
  };
}

function inferIndustryFromPains(pains: string[], answers: Record<string, any>): string | null {
  const painMap: Record<string, string[]> = {
    real_estate: ['lead_tracking', 'scheduling_chaos', 'customer_retention'],
    property_management: ['multi_unit_ops', 'payments', 'customer_retention'],
    home_services: ['service_dispatch', 'pricing_estimates', 'scheduling_chaos', 'no_shows'],
    consulting: ['proposal_bottlenecks', 'lead_tracking', 'payments'],
    restaurants: ['menu_engineering', 'scheduling_chaos', 'customer_retention']
  };
  
  const scores: Record<string, number> = {};
  
  for (const [industry, industryPains] of Object.entries(painMap)) {
    scores[industry] = pains.filter(pain => industryPains.includes(pain)).length;
  }
  
  const maxScore = Math.max(...Object.values(scores));
  if (maxScore === 0) return null;
  
  return Object.entries(scores).find(([_, score]) => score === maxScore)?.[0] || null;
}

function isB2B(answers: Record<string, any>): boolean {
  const b2bIndicators = [
    'proposal_bottlenecks',
    'consulting',
    'business_strategy',
    'technology'
  ];
  
  return Object.values(answers).some(value => 
    typeof value === 'string' && b2bIndicators.includes(value)
  );
}

function getRecommendedWidgets(industry: string, answers: Record<string, any>): string[] {
  const baseWidgets = ['pipeline_overview', 'lead_metrics', 'calendar_widget'];
  
  const industryWidgets: Record<string, string[]> = {
    real_estate: ['property_tracker', 'commission_calculator', 'market_insights'],
    property_management: ['unit_turnover_board', 'rent_collection', 'maintenance_tracker'],
    home_services: ['crew_scheduler', 'estimate_generator', 'job_tracker'],
    consulting: ['proposal_velocity', 'project_tracker', 'time_billing'],
    restaurants: ['reservation_manager', 'menu_analytics', 'event_planner']
  };
  
  const teamSize = answers.team_size || '1';
  const hasTeam = !teamSize.startsWith('1') && teamSize !== 'just_me';
  
  let widgets = [...baseWidgets];
  
  if (industryWidgets[industry]) {
    widgets.push(...industryWidgets[industry]);
  }
  
  if (hasTeam) {
    widgets.push('team_performance', 'task_manager');
  }
  
  const adSpend = answers.monthly_ad_spend;
  if (adSpend && !adSpend.startsWith('under')) {
    widgets.push('ad_performance', 'roi_tracker');
  }
  
  return widgets;
}