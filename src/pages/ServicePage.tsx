import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, Star, PlayCircle } from "lucide-react";
import { Navbar } from "@/components/Layout/Navbar";

// Updated service data for universal business platform
const serviceData = {
  'ai-call-assistant': {
    title: 'AI Phone Assistant',
    description: 'Never miss a customer call with our 24/7 AI phone assistant that answers every call, qualifies prospects, and books appointments automatically.',
    longDescription: 'Our sophisticated AI assistant handles all incoming calls with human-like conversation skills, ensuring every potential customer receives immediate attention. The system integrates seamlessly with your existing phone number, calendar, and CRM.',
    features: [
      '24/7 availability - never miss a call',
      'Human-like conversation and responses',
      'Automatic lead qualification and scoring',
      'Direct calendar integration for booking',
      'CRM auto-population from conversations',
      'Call recordings and transcripts',
      'Custom scripts tailored to your business',
      'Real-time sentiment analysis',
      'Multi-language support',
      'Visual conversation flow builder'
    ],
    benefits: [
      'Capture 100% of incoming opportunities',
      'Reduce response time to seconds',
      'Qualify prospects before they reach you',
      'Auto-populate CRM with conversation data',
      'Free up your time for core business activities'
    ],
    process: [
      'Customer calls your number',
      'AI assistant answers immediately',
      'Conversation flows naturally',
      'Data auto-populates in CRM',
      'Qualified meeting gets booked',
      'You receive detailed customer summary'
    ]
  },
  'website-builder': {
    title: 'Professional Website',
    description: 'Beautiful, mobile-responsive website that showcases your business and converts visitors into customers automatically.',
    longDescription: 'Create a stunning professional website with industry-specific templates and integrated CRM. Our visual builder connects directly to your customer data, making every visitor interaction seamless and trackable.',
    features: [
      'Industry-specific template library',
      'Drag-and-drop visual builder',
      'Mobile-responsive design templates',
      'SEO optimization built-in',
      'CRM-integrated contact forms',
      'Real-time visitor tracking',
      'A/B testing capabilities',
      'Custom domain support',
      'E-commerce ready',
      'Lead magnets and pop-ups'
    ],
    benefits: [
      'Professional online presence instantly',
      'Industry-optimized conversion flows',
      'Seamless CRM integration',
      'Attract customers while you sleep',
      'Build trust with potential clients',
      'Rank higher in search results'
    ],
    process: [
      'Choose industry template',
      'Customize with visual builder',
      'Connect CRM integrations',
      'Launch your website',
      'Track visitor conversions'
    ]
  },
  'crm-system': {
    title: 'Customer CRM',
    description: 'Manage all your customer relationships in one place. Track interactions, follow up automatically, and never lose a prospect.',
    longDescription: 'Complete customer relationship management system with industry-specific workflows and AI-powered automation. Pre-configured for your business type with smart data fields and automated follow-up sequences.',
    features: [
      'Industry-specific CRM templates',
      'Contact management and organization',
      'AI-powered data enrichment',
      'Automated workflow triggers',
      'Custom pipeline stages',
      'Email and SMS integration',
      'Customer segmentation and tagging',
      'Visual workflow builder',
      'Integration with phone assistant',
      'Advanced reporting and analytics'
    ],
    benefits: [
      'Never lose track of customers',
      'Industry-optimized workflows',
      'AI auto-populates customer data',
      'Improve conversion rates',
      'Automate repetitive tasks',
      'Build stronger customer relationships'
    ],
    process: [
      'Choose industry workflow',
      'Contacts automatically added',
      'AI enriches customer data',
      'Automated follow-ups triggered',
      'Pipeline stages updated',
      'Convert prospects to customers'
    ]
  },
  'smart-scheduling': {
    title: 'Smart Scheduling',
    description: 'Automated appointment booking that syncs with your calendar. Customers can book themselves without any back-and-forth.',
    longDescription: 'Streamline your appointment process with intelligent scheduling that considers your availability, customer preferences, and optimal meeting times to maximize your conversion rates.',
    features: [
      'Real-time calendar synchronization',
      'Automatic conflict resolution',
      'Customer self-booking portal',
      'Customizable time slots and buffers',
      'Automated confirmation and reminders',
      'Rescheduling and cancellation handling'
    ],
    benefits: [
      'Eliminate scheduling back-and-forth',
      'Reduce no-shows with reminders',
      'Optimize meeting times for conversion',
      'Professional scheduling experience'
    ],
    process: [
      'Customer requests appointment',
      'System checks your availability',
      'Best time slot automatically selected',
      'Meeting booked and confirmed',
      'Both parties receive confirmations'
    ]
  },
  'invoicing-payments': {
    title: 'Invoicing & Payments',
    description: 'Professional invoices and payment processing. Get paid faster with automated follow-ups and multiple payment options.',
    longDescription: 'Complete invoicing and payment solution that helps you get paid faster. Professional invoices, automated reminders, and seamless payment processing all in one place.',
    features: [
      'Professional invoice templates',
      'Multiple payment method support',
      'Automated payment reminders',
      'Recurring billing automation',
      'Payment tracking and reporting',
      'Tax calculation and reporting'
    ],
    benefits: [
      'Get paid faster and more reliably',
      'Reduce late payments',
      'Professional invoice appearance',
      'Simplified tax preparation'
    ],
    process: [
      'Create invoice from template',
      'Send to customer automatically',
      'Customer pays via preferred method',
      'Payment recorded in system',
      'Receipt sent automatically'
    ]
  },
  'business-analytics': {
    title: 'Business Analytics',
    description: 'Track your performance with detailed analytics. See what\'s working and optimize your business for better results.',
    longDescription: 'Comprehensive analytics dashboard that gives you complete visibility into your business performance with real-time insights, trend analysis, and optimization recommendations.',
    features: [
      'Real-time performance tracking',
      'Customer acquisition analytics',
      'Revenue and growth metrics',
      'Conversion rate optimization',
      'Custom reports and dashboards',
      'Trend analysis and forecasting'
    ],
    benefits: [
      'Make data-driven decisions',
      'Identify growth opportunities',
      'Track ROI on marketing efforts',
      'Optimize business performance'
    ],
    process: [
      'Data collected automatically',
      'Real-time updates and alerts',
      'Analyze performance metrics',
      'Identify trends and patterns',
      'Optimize based on insights'
    ]
  }
};

const ServicePage: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  
  const service = serviceId ? serviceData[serviceId as keyof typeof serviceData] : null;

  if (!service) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
        <Navbar />
        <div className="container mx-auto px-6 pt-24 text-center">
          <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
          <p className="text-muted-foreground mb-8">The requested service could not be found.</p>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <Navbar />
      
      {/* Header Section */}
      <section className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-6 text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Services
          </Button>
          
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 bg-primary/10 text-primary border-primary/20">
              <Star className="h-3 w-3 mr-1" />
              Business Feature
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
              {service.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              {service.longDescription}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-lg px-8 py-6 shadow-green"
                onClick={() => navigate('/pricing')}
              >
                Get Started
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                <PlayCircle className="h-5 w-5 mr-2" />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Key Features & Capabilities
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              {service.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-lg">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gradient-to-r from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              How It Works
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {service.process.map((step, index) => (
                <Card key={index} className="text-center border-border/50 shadow-luxury">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg mx-auto mb-4">
                      {index + 1}
                    </div>
                    <CardDescription className="text-base font-medium">
                      {step}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Benefits for Your Business
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {service.benefits.map((benefit, index) => (
                <Card key={index} className="bg-gradient-to-br from-card to-card/80 border-border/50 shadow-luxury">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-primary-foreground" />
                      </div>
                      {benefit}
                    </CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI Assistant Visual Builder Section - Only show for website-builder */}
      {serviceId === 'website-builder' && (
        <section className="py-16 bg-gradient-to-r from-accent/5 via-background to-primary/5">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  AI Assistant <span className="text-primary">Visual Builder</span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Revolutionary visual builder that creates AI conversation flows connected to your CRM. 
                  Design how your AI assistant interacts with customers and automatically populate data fields.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">Drag & Drop Conversation Design</h3>
                    <p className="text-muted-foreground">
                      Visually design your AI assistant's conversation flows with an intuitive drag-and-drop interface. 
                      Create branching conversations based on customer responses and business logic.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">CRM Integration Magic</h3>
                    <p className="text-muted-foreground">
                      Every conversation automatically populates your CRM with the exact data fields you need. 
                      Map conversation responses to customer properties, deal stages, and follow-up actions.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">Industry-Specific Templates</h3>
                    <p className="text-muted-foreground">
                      Start with pre-built conversation templates designed for your industry. 
                      Each template includes optimized questions and CRM mappings for maximum conversion.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <Card className="bg-gradient-to-br from-card to-card/80 border-border/50 shadow-luxury">
                    <CardHeader>
                      <CardTitle className="text-xl">Visual Builder Features</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {[
                        'Drag-and-drop conversation nodes',
                        'Real-time conversation preview',
                        'CRM field mapping interface',
                        'Conditional logic builder',
                        'A/B testing for conversations',
                        'Multi-language support',
                        'Integration with calendar booking',
                        'Sentiment analysis triggers',
                        'Custom webhook integrations',
                        'Performance analytics dashboard'
                      ].map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Industry Templates Section - Only show for crm-system */}
      {serviceId === 'crm-system' && (
        <section className="py-16 bg-gradient-to-r from-primary/5 via-background to-accent/5">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Industry-Specific <span className="text-primary">CRM Templates</span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Pre-configured CRM workflows, data fields, and automation sequences tailored to your industry's unique needs.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    industry: 'Real Estate',
                    features: ['Property tracking', 'Buyer/seller pipelines', 'Commission calculations', 'Showing scheduler']
                  },
                  {
                    industry: 'Healthcare',
                    features: ['Patient management', 'Appointment scheduling', 'Insurance tracking', 'HIPAA compliance']
                  },
                  {
                    industry: 'Legal Services',
                    features: ['Case management', 'Billing & time tracking', 'Document automation', 'Client communication']
                  },
                  {
                    industry: 'Home Services',
                    features: ['Job scheduling', 'Estimate management', 'Equipment tracking', 'Follow-up sequences']
                  },
                  {
                    industry: 'Consulting',
                    features: ['Project tracking', 'Proposal management', 'Time & billing', 'Retainer tracking']
                  },
                  {
                    industry: 'Retail',
                    features: ['Inventory management', 'Customer preferences', 'Purchase history', 'Loyalty programs']
                  }
                ].map((template, index) => (
                  <Card key={index} className="bg-gradient-to-br from-card to-card/80 border-border/50 shadow-luxury">
                    <CardHeader>
                      <CardTitle className="text-xl text-primary">{template.industry}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {template.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-background to-accent/10">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started with {service.title}?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of businesses already transforming their operations with Phunnel's AI-powered platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-lg px-8 py-6 shadow-green"
              onClick={() => navigate('/pricing')}
            >
              View Pricing Plans
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicePage;