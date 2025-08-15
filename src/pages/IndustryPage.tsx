import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, Sparkles, Settings, BarChart3, MessageSquare, Calendar, CreditCard, Users, FileText, PieChart, Zap } from "lucide-react";
import { Navbar } from "@/components/Layout/Navbar";

interface IndustryData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  color: string;
  features: string[];
  workflows: {
    title: string;
    description: string;
    steps: string[];
  }[];
  integrations: string[];
  templates: string[];
}

const industryData: Record<string, IndustryData> = {
  'real-estate': {
    id: 'real-estate',
    title: 'Real Estate',
    subtitle: 'Close more deals',
    description: 'Everything real estate professionals need to manage leads, track commissions, and close more deals.',
    badge: 'Real Estate CRM',
    color: '#3b82f6',
    features: [
      'Lead qualification and scoring',
      'Property listing management',
      'Commission tracking',
      'Client relationship management',
      'Showing scheduler',
      'Contract management'
    ],
    workflows: [
      {
        title: 'Lead Intake & Qualification',
        description: 'Automatically capture and qualify leads from multiple sources',
        steps: [
          'Lead captured from website, social media, or referrals',
          'AI assistant qualifies buyer/seller intent and budget',
          'Lead scored and assigned to appropriate agent',
          'Follow-up sequence triggered automatically'
        ]
      },
      {
        title: 'Property Showing Management',
        description: 'Streamline showing requests and scheduling',
        steps: [
          'Client requests showing through automated system',
          'AI checks agent availability and property access',
          'Confirmation sent with property details',
          'Feedback collection post-showing'
        ]
      }
    ],
    integrations: ['MLS Systems', 'DocuSign', 'Zillow', 'Realtor.com', 'Transaction Management'],
    templates: ['Buyer Consultation', 'Listing Presentation', 'Open House Follow-up', 'Commission Reports']
  },
  'healthcare': {
    id: 'healthcare',
    title: 'Healthcare',
    subtitle: 'Focus on patient care',
    description: 'HIPAA-compliant practice management that lets you focus on what matters most - your patients.',
    badge: 'Healthcare Platform',
    color: '#10b981',
    features: [
      'HIPAA-compliant patient records',
      'Appointment scheduling',
      'Insurance verification',
      'Billing automation',
      'Treatment plan tracking',
      'Prescription management'
    ],
    workflows: [
      {
        title: 'Patient Intake & Onboarding',
        description: 'Secure patient registration and medical history collection',
        steps: [
          'Patient completes secure intake forms online',
          'Insurance verification automated',
          'Medical history imported from previous providers',
          'Appointment scheduled based on urgency and availability'
        ]
      },
      {
        title: 'Treatment Planning & Follow-up',
        description: 'Comprehensive care coordination',
        steps: [
          'Provider creates treatment plan in system',
          'Patient receives care instructions and reminders',
          'Progress tracked through check-ins',
          'Automated follow-up appointments scheduled'
        ]
      }
    ],
    integrations: ['EMR Systems', 'Insurance Networks', 'Lab Partners', 'Pharmacy Networks', 'Telehealth Platforms'],
    templates: ['Patient Intake', 'Treatment Plans', 'Insurance Claims', 'Appointment Reminders']
  },
  'legal': {
    id: 'legal',
    title: 'Legal Practice',
    subtitle: 'Practice law, not paperwork',
    description: 'Complete practice management for law firms of all sizes, from solo practitioners to large firms.',
    badge: 'Legal Solutions',
    color: '#8b5cf6',
    features: [
      'Case management',
      'Client intake automation',
      'Time tracking & billing',
      'Document management',
      'Court calendar integration',
      'Trust accounting'
    ],
    workflows: [
      {
        title: 'Client Intake & Case Setup',
        description: 'Streamlined client onboarding and case initiation',
        steps: [
          'Potential client fills out conflict check form',
          'Attorney reviews and approves new matter',
          'Retainer agreement generated and signed digitally',
          'Case opened with initial timeline and tasks'
        ]
      },
      {
        title: 'Billing & Collections',
        description: 'Automated time tracking and invoice generation',
        steps: [
          'Time automatically tracked on all case activities',
          'Monthly invoices generated with detailed breakdowns',
          'Payment reminders sent to clients',
          'Trust account reconciliation performed'
        ]
      }
    ],
    integrations: ['Court Systems', 'Legal Research Platforms', 'Document Management', 'Accounting Software', 'E-Filing Systems'],
    templates: ['Retainer Agreements', 'Discovery Requests', 'Settlement Demands', 'Time Billing Reports']
  },
  'consulting': {
    id: 'consulting',
    title: 'Consulting',
    subtitle: 'Scale your expertise',
    description: 'Project management and client delivery tools designed specifically for consultants and agencies.',
    badge: 'Consulting Platform',
    color: '#f59e0b',
    features: [
      'Project tracking & milestones',
      'Proposal automation',
      'Time tracking & billing',
      'Client portal access',
      'Resource planning',
      'Performance analytics'
    ],
    workflows: [
      {
        title: 'Proposal to Project',
        description: 'Seamless transition from proposal to active project',
        steps: [
          'Lead requests consultation or proposal',
          'Proposal generated using templates and past projects',
          'Client approves scope and signs contract',
          'Project kicked off with timeline and deliverables'
        ]
      },
      {
        title: 'Project Delivery & Billing',
        description: 'Efficient project execution and client billing',
        steps: [
          'Tasks assigned to team members with deadlines',
          'Progress tracked against milestones',
          'Time automatically logged for billing',
          'Client receives regular updates and deliverables'
        ]
      }
    ],
    integrations: ['Project Management Tools', 'Time Tracking Apps', 'Accounting Software', 'Communication Platforms', 'File Storage'],
    templates: ['Consulting Proposals', 'Statement of Work', 'Project Reports', 'Invoice Templates']
  },
  'home-services': {
    id: 'home-services',
    title: 'Home Services',
    subtitle: 'Book more jobs',
    description: 'Complete business management for contractors, plumbers, electricians, and home service providers.',
    badge: 'Home Services',
    color: '#ef4444',
    features: [
      'Job scheduling & dispatch',
      'Estimate generation',
      'Equipment tracking',
      'Customer management',
      'Invoice automation',
      'Route optimization'
    ],
    workflows: [
      {
        title: 'Service Request to Completion',
        description: 'End-to-end job management workflow',
        steps: [
          'Customer requests service through multiple channels',
          'AI assistant schedules appointment based on location and urgency',
          'Technician dispatched with job details and customer history',
          'Work completed, invoice generated, and payment collected'
        ]
      },
      {
        title: 'Preventive Maintenance Programs',
        description: 'Recurring service management',
        steps: [
          'Customer enrolls in maintenance program',
          'System schedules regular service appointments',
          'Technician receives service history and recommendations',
          'Customer billed automatically for recurring services'
        ]
      }
    ],
    integrations: ['GPS & Mapping', 'Payment Processors', 'Inventory Management', 'Equipment Suppliers', 'Accounting Software'],
    templates: ['Service Estimates', 'Work Orders', 'Maintenance Contracts', 'Customer Invoices']
  },
  'fitness': {
    id: 'fitness',
    title: 'Fitness',
    subtitle: 'Energize your business',
    description: 'Complete gym and fitness studio management with member engagement and progress tracking.',
    badge: 'Fitness Solutions',
    color: '#06b6d4',
    features: [
      'Class scheduling',
      'Membership management',
      'Progress tracking',
      'Trainer scheduling',
      'Equipment maintenance',
      'Member app integration'
    ],
    workflows: [
      {
        title: 'Member Onboarding',
        description: 'Seamless new member registration and goal setting',
        steps: [
          'Prospect signs up for trial or membership',
          'Fitness assessment and goal setting session',
          'Personalized workout plan created',
          'Progress tracking and check-ins scheduled'
        ]
      },
      {
        title: 'Class & Training Management',
        description: 'Efficient class scheduling and trainer coordination',
        steps: [
          'Classes scheduled with instructor and capacity limits',
          'Members book classes through app or website',
          'Waitlists managed automatically',
          'Instructor compensation calculated based on attendance'
        ]
      }
    ],
    integrations: ['Fitness Apps', 'Wearable Devices', 'Payment Systems', 'Nutrition Platforms', 'Equipment Monitoring'],
    templates: ['Membership Agreements', 'Workout Plans', 'Progress Reports', 'Class Schedules']
  },
  'restaurants': {
    id: 'restaurants',
    title: 'Restaurants',
    subtitle: 'Serve excellence',
    description: 'Complete restaurant management from reservations to loyalty programs and everything in between.',
    badge: 'Restaurant Platform',
    color: '#ec4899',
    features: [
      'Table reservations',
      'Order management',
      'Menu optimization',
      'Staff scheduling',
      'Inventory tracking',
      'Customer loyalty programs'
    ],
    workflows: [
      {
        title: 'Reservation to Service',
        description: 'Seamless dining experience management',
        steps: [
          'Customer makes reservation online or by phone',
          'Table assignment optimized for party size and preferences',
          'Host receives guest information and special requests',
          'Service completed with feedback collection and loyalty points'
        ]
      },
      {
        title: 'Inventory & Menu Management',
        description: 'Smart inventory tracking and menu optimization',
        steps: [
          'Daily inventory counts recorded by staff',
          'System alerts when items run low',
          'Menu items automatically marked unavailable',
          'Purchasing recommendations generated based on demand'
        ]
      }
    ],
    integrations: ['POS Systems', 'Delivery Platforms', 'Supplier Networks', 'Review Platforms', 'Payment Processors'],
    templates: ['Reservation Confirmations', 'Menu Updates', 'Staff Schedules', 'Loyalty Programs']
  },
  'retail': {
    id: 'retail',
    title: 'Retail',
    subtitle: 'Convert browsers to buyers',
    description: 'Complete retail management with inventory control, customer insights, and sales optimization.',
    badge: 'Retail Solutions',
    color: '#84cc16',
    features: [
      'Inventory management',
      'Customer insights',
      'Sales analytics',
      'Product recommendations',
      'Multi-channel selling',
      'Loyalty programs'
    ],
    workflows: [
      {
        title: 'Customer Journey Optimization',
        description: 'Personalized shopping experience from browse to buy',
        steps: [
          'Customer browsing behavior tracked across channels',
          'AI recommends products based on preferences and history',
          'Personalized offers and promotions delivered',
          'Purchase completed with automated follow-up'
        ]
      },
      {
        title: 'Inventory & Fulfillment',
        description: 'Smart inventory management and order fulfillment',
        steps: [
          'Sales data analyzed for demand forecasting',
          'Inventory automatically reordered when low',
          'Orders processed and fulfillment optimized',
          'Shipping notifications and tracking provided'
        ]
      }
    ],
    integrations: ['E-commerce Platforms', 'Payment Gateways', 'Shipping Partners', 'Marketing Platforms', 'Analytics Tools'],
    templates: ['Product Catalogs', 'Customer Profiles', 'Sales Reports', 'Marketing Campaigns']
  },
  'education': {
    id: 'education',
    title: 'Education',
    subtitle: 'Empower learning',
    description: 'Complete educational institution management with student tracking and course administration.',
    badge: 'Education Platform',
    color: '#6366f1',
    features: [
      'Student management',
      'Course scheduling',
      'Progress tracking',
      'Parent communication',
      'Gradebook integration',
      'Resource planning'
    ],
    workflows: [
      {
        title: 'Student Enrollment & Onboarding',
        description: 'Streamlined student registration and class assignment',
        steps: [
          'Student applies and completes enrollment forms',
          'Academic records reviewed and validated',
          'Course schedule created based on requirements',
          'Parent/guardian access granted to student portal'
        ]
      },
      {
        title: 'Academic Progress Monitoring',
        description: 'Continuous student progress tracking and intervention',
        steps: [
          'Teachers record grades and attendance regularly',
          'System identifies students at risk of falling behind',
          'Automated alerts sent to parents and counselors',
          'Intervention plans created and tracked'
        ]
      }
    ],
    integrations: ['LMS Platforms', 'Gradebook Systems', 'Communication Tools', 'Assessment Platforms', 'Parent Portals'],
    templates: ['Student Records', 'Progress Reports', 'Parent Communications', 'Course Syllabi']
  },
  'finance': {
    id: 'finance',
    title: 'Finance',
    subtitle: 'Build trust through technology',
    description: 'Secure financial planning and portfolio management tools for advisors and wealth managers.',
    badge: 'Finance Solutions',
    color: '#059669',
    features: [
      'Client portfolio management',
      'Financial planning tools',
      'Risk assessment',
      'Performance tracking',
      'Compliance monitoring',
      'Client reporting'
    ],
    workflows: [
      {
        title: 'Client Onboarding & Planning',
        description: 'Comprehensive financial assessment and plan creation',
        steps: [
          'Client completes financial questionnaire and risk assessment',
          'Advisor reviews goals and creates initial financial plan',
          'Investment recommendations presented and approved',
          'Portfolio constructed and monitoring begins'
        ]
      },
      {
        title: 'Portfolio Management & Reporting',
        description: 'Ongoing portfolio oversight and client communication',
        steps: [
          'Portfolio performance monitored against benchmarks',
          'Quarterly reports generated automatically',
          'Client meetings scheduled for review and adjustments',
          'Compliance requirements tracked and documented'
        ]
      }
    ],
    integrations: ['Custodian Platforms', 'Market Data Feeds', 'Compliance Systems', 'CRM Platforms', 'Reporting Tools'],
    templates: ['Financial Plans', 'Investment Proposals', 'Performance Reports', 'Compliance Documents']
  },
  'technology': {
    id: 'technology',
    title: 'Technology',
    subtitle: 'Ship faster, grow smarter',
    description: 'Complete project management and client delivery platform for tech companies and development teams.',
    badge: 'Tech Platform',
    color: '#7c3aed',
    features: [
      'Agile project management',
      'Client communication',
      'Resource planning',
      'Code deployment tracking',
      'Performance monitoring',
      'Team collaboration'
    ],
    workflows: [
      {
        title: 'Project Planning & Execution',
        description: 'Agile project management from planning to delivery',
        steps: [
          'Project requirements gathered and user stories created',
          'Sprint planning with team capacity and velocity',
          'Daily standups and progress tracking',
          'Sprint reviews and retrospectives conducted'
        ]
      },
      {
        title: 'Client Delivery & Support',
        description: 'Seamless client communication and project delivery',
        steps: [
          'Client portal provides real-time project visibility',
          'Regular demos and feedback sessions scheduled',
          'Issues tracked and resolved with client communication',
          'Project handoff with documentation and training'
        ]
      }
    ],
    integrations: ['Development Tools', 'Version Control', 'CI/CD Platforms', 'Monitoring Tools', 'Communication Apps'],
    templates: ['Project Proposals', 'Sprint Plans', 'Status Reports', 'Technical Documentation']
  },
  'manufacturing': {
    id: 'manufacturing',
    title: 'Manufacturing',
    subtitle: 'Optimize operations',
    description: 'Complete manufacturing operations management with supply chain optimization and quality control.',
    badge: 'Manufacturing Solutions',
    color: '#dc2626',
    features: [
      'Supply chain management',
      'Quality control tracking',
      'Production scheduling',
      'Inventory optimization',
      'Equipment maintenance',
      'Performance analytics'
    ],
    workflows: [
      {
        title: 'Production Planning & Scheduling',
        description: 'Optimized production workflow management',
        steps: [
          'Demand forecast analyzed and production plan created',
          'Materials and capacity requirements calculated',
          'Production schedule optimized for efficiency',
          'Work orders generated and distributed to floor'
        ]
      },
      {
        title: 'Quality Control & Compliance',
        description: 'Comprehensive quality assurance and regulatory compliance',
        steps: [
          'Quality checkpoints defined for each production stage',
          'Automated testing and inspection results recorded',
          'Non-conforming products flagged and quarantined',
          'Compliance reports generated for regulatory bodies'
        ]
      }
    ],
    integrations: ['ERP Systems', 'MES Platforms', 'Quality Systems', 'Supplier Networks', 'IoT Sensors'],
    templates: ['Production Orders', 'Quality Reports', 'Inventory Reports', 'Compliance Documents']
  }
};

export const IndustryPage: React.FC = () => {
  const { industryId } = useParams<{ industryId: string }>();
  const navigate = useNavigate();
  
  const industry = industryId ? industryData[industryId] : null;

  if (!industry) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-2xl font-medium mb-4">Industry not found</h1>
          <Button onClick={() => navigate('/')} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background via-muted/10 to-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Button 
              variant="ghost" 
              className="mb-6" 
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to home
            </Button>
            
            <Badge 
              variant="secondary" 
              className="mb-6 bg-muted/80 backdrop-blur-sm text-muted-foreground border-border text-sm px-4 py-1 font-normal"
            >
              {industry.badge}
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-light mb-6 leading-tight">
              {industry.title}
              <br />
              <span className="font-medium" style={{ color: industry.color }}>
                {industry.subtitle}
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-3xl mx-auto">
              {industry.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-lg px-8 py-4"
                style={{ backgroundColor: industry.color }}
                onClick={() => navigate('/auth')}
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Start free trial
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-4"
                onClick={() => navigate('/pricing')}
              >
                See pricing
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-medium text-center mb-12">
              Everything you need for your {industry.title.toLowerCase()} business
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {industry.features.map((feature, index) => (
                <Card key={index} className="bg-card/50 border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="font-medium">{feature}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Workflows Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-medium text-center mb-4">
              Automated workflows that just work
            </h2>
            <p className="text-xl text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
              Pre-built automation templates designed specifically for {industry.title.toLowerCase()} professionals.
            </p>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {industry.workflows.map((workflow, index) => (
                <Card key={index} className="bg-card border-border">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <Zap className="h-6 w-6" style={{ color: industry.color }} />
                      <CardTitle className="text-xl">{workflow.title}</CardTitle>
                    </div>
                    <CardDescription className="text-base">
                      {workflow.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {workflow.steps.map((step, stepIndex) => (
                        <div key={stepIndex} className="flex items-start gap-3">
                          <div 
                            className="w-6 h-6 rounded-full text-white text-sm font-medium flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{ backgroundColor: industry.color }}
                          >
                            {stepIndex + 1}
                          </div>
                          <span className="text-sm text-muted-foreground leading-relaxed">
                            {step}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Templates & Integrations */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Templates */}
              <div>
                <h3 className="text-2xl font-medium mb-6 flex items-center gap-3">
                  <FileText className="h-6 w-6" style={{ color: industry.color }} />
                  Ready-to-use templates
                </h3>
                <p className="text-muted-foreground mb-6">
                  Start faster with industry-specific templates and forms.
                </p>
                <div className="space-y-3">
                  {industry.templates.map((template, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border/50">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="font-medium">{template}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Integrations */}
              <div>
                <h3 className="text-2xl font-medium mb-6 flex items-center gap-3">
                  <Settings className="h-6 w-6" style={{ color: industry.color }} />
                  Native integrations
                </h3>
                <p className="text-muted-foreground mb-6">
                  Connect with the tools you already use and love.
                </p>
                <div className="space-y-3">
                  {industry.integrations.map((integration, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border/50">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="font-medium">{integration}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-medium mb-6">
              Ready to transform your {industry.title.toLowerCase()} business?
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Join thousands of {industry.title.toLowerCase()} professionals who've streamlined their operations with our platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-lg px-8 py-4"
                style={{ backgroundColor: industry.color }}
                onClick={() => navigate('/auth')}
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Start your free trial
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-4"
                onClick={() => navigate('/pricing')}
              >
                <PieChart className="h-5 w-5 mr-2" />
                View pricing
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};