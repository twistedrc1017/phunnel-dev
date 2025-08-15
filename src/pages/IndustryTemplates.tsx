import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Building2, 
  Home, 
  Heart, 
  Scale, 
  Wrench, 
  Users, 
  UtensilsCrossed,
  ShoppingBag,
  GraduationCap,
  DollarSign,
  Code,
  Factory
} from 'lucide-react';

const industries = [
  {
    id: 'real-estate',
    name: 'Real Estate',
    icon: Building2,
    description: 'Property-focused CRM with buyer/seller tracking and automated lead qualification',
    features: [
      'Property listings management',
      'Buyer/seller pipeline tracking', 
      'Automated showing scheduler',
      'Commission calculation tools'
    ],
    gradient: 'from-blue-500/20 to-cyan-500/20',
    accent: 'border-blue-500/50 hover:border-blue-500'
  },
  {
    id: 'property-management',
    name: 'Property Management',
    icon: Home,
    description: 'Comprehensive property management with tenant communication and maintenance tracking',
    features: [
      'Tenant communication portal',
      'Maintenance request system',
      'Rent collection automation',
      'Property inspection scheduling'
    ],
    gradient: 'from-emerald-500/20 to-green-500/20',
    accent: 'border-emerald-500/50 hover:border-emerald-500'
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    icon: Heart,
    description: 'HIPAA-compliant patient management with appointment booking and insurance verification',
    features: [
      'Patient appointment scheduling',
      'Insurance verification system',
      'Treatment plan tracking',
      'Automated follow-up reminders'
    ],
    gradient: 'from-red-500/20 to-pink-500/20',
    accent: 'border-red-500/50 hover:border-red-500'
  },
  {
    id: 'legal-services',
    name: 'Legal Services',
    icon: Scale,
    description: 'Case management system with billing automation and document workflows',
    features: [
      'Case tracking & management',
      'Automated billing & invoicing',
      'Document workflow system',
      'Client intake forms'
    ],
    gradient: 'from-purple-500/20 to-indigo-500/20',
    accent: 'border-purple-500/50 hover:border-purple-500'
  },
  {
    id: 'home-services',
    name: 'Home Services',
    icon: Wrench,
    description: 'Service scheduling with estimate generation and equipment tracking',
    features: [
      'Job scheduling & dispatch',
      'Estimate generation tools',
      'Equipment tracking system',
      'Follow-up automation'
    ],
    gradient: 'from-orange-500/20 to-yellow-500/20',
    accent: 'border-orange-500/50 hover:border-orange-500'
  },
  {
    id: 'consulting',
    name: 'Consulting',
    icon: Users,
    description: 'Project tracking with proposal automation and time billing management',
    features: [
      'Project tracking dashboard',
      'Proposal automation tools',
      'Time billing & tracking',
      'Retainer management'
    ],
    gradient: 'from-teal-500/20 to-cyan-500/20',
    accent: 'border-teal-500/50 hover:border-teal-500'
  },
  {
    id: 'restaurants',
    name: 'Restaurants',
    icon: UtensilsCrossed,
    description: 'Restaurant management with table booking and order management systems',
    features: [
      'Table booking system',
      'Order management tools',
      'Customer loyalty programs',
      'Event planning features'
    ],
    gradient: 'from-amber-500/20 to-orange-500/20',
    accent: 'border-amber-500/50 hover:border-amber-500'
  },
  {
    id: 'retail',
    name: 'Retail',
    icon: ShoppingBag,
    description: 'Inventory management with customer tracking and sales automation',
    features: [
      'Inventory management system',
      'Customer purchase tracking',
      'Sales automation tools',
      'Loyalty program integration'
    ],
    gradient: 'from-pink-500/20 to-rose-500/20',
    accent: 'border-pink-500/50 hover:border-pink-500'
  },
  {
    id: 'education',
    name: 'Education',
    icon: GraduationCap,
    description: 'Student management with enrollment tracking and communication tools',
    features: [
      'Student enrollment system',
      'Progress tracking tools',
      'Parent communication portal',
      'Automated scheduling'
    ],
    gradient: 'from-violet-500/20 to-purple-500/20',
    accent: 'border-violet-500/50 hover:border-violet-500'
  },
  {
    id: 'finance',
    name: 'Finance',
    icon: DollarSign,
    description: 'Client portfolio management with automated reporting and compliance tracking',
    features: [
      'Client portfolio tracking',
      'Automated reporting tools',
      'Compliance management',
      'Investment tracking'
    ],
    gradient: 'from-green-500/20 to-emerald-500/20',
    accent: 'border-green-500/50 hover:border-green-500'
  },
  {
    id: 'technology',
    name: 'Technology',
    icon: Code,
    description: 'Project management with client onboarding and development tracking',
    features: [
      'Project milestone tracking',
      'Client onboarding automation',
      'Development progress tools',
      'Technical support system'
    ],
    gradient: 'from-blue-500/20 to-indigo-500/20',
    accent: 'border-blue-500/50 hover:border-blue-500'
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    icon: Factory,
    description: 'Production tracking with quality control and supply chain management',
    features: [
      'Production tracking system',
      'Quality control workflows',
      'Supply chain management',
      'Inventory optimization'
    ],
    gradient: 'from-slate-500/20 to-gray-500/20',
    accent: 'border-slate-500/50 hover:border-slate-500'
  }
];

export default function IndustryTemplates() {
  const navigate = useNavigate();

  const handleIndustryClick = (industryId: string) => {
    navigate(`/industry/${industryId}`);
  };

  // Handle deep linking to sections
  React.useEffect(() => {
    if (window.location.hash) {
      const element = document.getElementById(window.location.hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge variant="outline" className="mb-6 text-sm font-medium">
            Industry Templates
          </Badge>
          <h1 className="text-4xl md:text-6xl font-light text-foreground mb-6">
            Industry-Specific Workflows & Templates
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Pre-configured CRM workflows, AI conversation scripts, and automation sequences 
            designed for your industry's unique requirements.
          </p>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, index) => {
              const IconComponent = industry.icon;
              return (
                <Card 
                  key={industry.id}
                  id={industry.id}
                  className={`group cursor-pointer transition-all duration-300 hover:scale-102 border-2 ${industry.accent} bg-gradient-to-br ${industry.gradient} backdrop-blur-sm animate-fade-in scroll-mt-24`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => handleIndustryClick(industry.id)}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl font-medium">
                        {industry.name}
                      </CardTitle>
                    </div>
                    <CardDescription className="text-base leading-relaxed">
                      {industry.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {industry.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button 
                      variant="outline" 
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    >
                      View Template
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light text-foreground mb-6">
            Ready to get started?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Choose your industry template and launch your AI-powered business platform in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90"
              onClick={() => navigate('/auth')}
            >
              Start Free Trial
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/pricing')}
            >
              View Pricing
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}