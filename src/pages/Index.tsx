import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Phone, Calendar, Home, Sparkles, Users, TrendingUp, LogOut, User as UserIcon, BarChart3, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { ServiceButton } from "@/components/ServiceButton";
import { HeroSlider } from "@/components/Hero/HeroSlider";

const Index = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <title>Phunnel - AI-Powered Business Platform with CRM, Website Builder & Invoicing</title>
      <meta name="description" content="Create your branded business website with integrated AI phone assistant, CRM, and invoicing. Turn visitors into customers automatically." />
      
      {/* Navigation */}
      <nav className="absolute top-0 w-full z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              PHUNNEL
            </h1>
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center gap-2 hover:bg-primary/10"
                  >
                    <BarChart3 className="h-4 w-4" />
                    Dashboard
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/profile')}
                    className="flex items-center gap-2 hover:bg-primary/10"
                  >
                    <UserIcon className="h-4 w-4" />
                    Profile
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSignOut}
                    className="flex items-center gap-2 hover:bg-destructive/10"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/auth')}
                  className="border-primary/30 hover:border-primary hover:bg-primary/10"
                >
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Slider Section */}
      <HeroSlider user={user} />

      {/* Interactive Services Section with Enhanced Gradients */}
      <section className="py-20 container mx-auto px-6 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-primary/5 rounded-3xl"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(134,239,172,0.1),transparent_50%)]"></div>
        
        <div className="text-center mb-16 relative z-10">
          <Badge variant="secondary" className="mb-6 bg-muted/80 text-muted-foreground border-border">
            Everything you need
          </Badge>
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            <span className="text-foreground">
              Business tools that
            </span>
            <br />
            <span className="font-medium text-primary">
              actually work together
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            No more juggling five different apps. Get your website, CRM, AI assistant, and payments 
            working as one seamless system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          <div className="transform hover:scale-102 transition-all duration-200">
            <ServiceButton
              id="ai-call-assistant"
              title="Never miss a call"
              description="Your AI assistant answers every call, qualifies customers, and books meetings. Even when you're busy."
              icon={Phone}
              className="bg-card border-border hover:shadow-lg"
            />
          </div>

          <div className="transform hover:scale-102 transition-all duration-200">
            <ServiceButton
              id="website-builder"
              title="Professional website"
              description="A beautiful website that works on every device. Your customers will love how easy it is to use."
              icon={Home}
              className="bg-card border-border hover:shadow-lg"
            />
          </div>

          <div className="transform hover:scale-102 transition-all duration-200">
            <ServiceButton
              id="crm-system"
              title="Know your customers"
              description="Keep track of every customer conversation and never let a lead slip through the cracks."
              icon={Users}
              className="bg-card border-border hover:shadow-lg"
            />
          </div>

          <div className="transform hover:scale-102 transition-all duration-200">
            <ServiceButton
              id="smart-scheduling"
              title="Easy scheduling"
              description="Let customers book themselves. No more phone tag or back-and-forth emails."
              icon={Calendar}
              className="bg-card border-border hover:shadow-lg"
            />
          </div>

          <div className="transform hover:scale-102 transition-all duration-200">
            <ServiceButton
              id="invoicing-payments"
              title="Get paid faster"
              description="Professional invoices and instant payments. No more chasing down late payments."
              icon={TrendingUp}
              className="bg-card border-border hover:shadow-lg"
            />
          </div>

          <div className="transform hover:scale-102 transition-all duration-200">
            <ServiceButton
              id="business-analytics"
              title="See what's working"
              description="Simple reports that show you what's driving results. Make decisions with confidence."
              icon={Sparkles}
              className="bg-card border-border hover:shadow-lg"
            />
          </div>
        </div>

        {/* Industry Showcase with Floating Cards */}
        <div className="mt-20 text-center relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/10 to-transparent rounded-3xl"></div>
          <Badge variant="secondary" className="mb-6 bg-muted/80 text-muted-foreground border-border">
            Works for everyone
          </Badge>
          <h3 className="text-3xl md:text-4xl font-light mb-6">
            <span className="text-foreground">
              Built for
            </span>
            <br />
            <span className="font-medium text-primary">
              your industry
            </span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 max-w-4xl mx-auto relative z-10">
            {[
              { name: 'Real Estate', color: 'bg-blue-50 hover:bg-blue-100' },
              { name: 'Healthcare', color: 'bg-emerald-50 hover:bg-emerald-100' },
              { name: 'Legal', color: 'bg-purple-50 hover:bg-purple-100' },
              { name: 'Consulting', color: 'bg-amber-50 hover:bg-amber-100' },
              { name: 'Home Services', color: 'bg-red-50 hover:bg-red-100' },
              { name: 'Fitness', color: 'bg-cyan-50 hover:bg-cyan-100' },
              { name: 'Restaurants', color: 'bg-pink-50 hover:bg-pink-100' },
              { name: 'Retail', color: 'bg-lime-50 hover:bg-lime-100' },
              { name: 'Education', color: 'bg-indigo-50 hover:bg-indigo-100' },
              { name: 'Finance', color: 'bg-emerald-50 hover:bg-emerald-100' },
              { name: 'Technology', color: 'bg-violet-50 hover:bg-violet-100' },
              { name: 'Manufacturing', color: 'bg-red-50 hover:bg-red-100' }
            ].map((industry, index) => (
              <div 
                key={industry.name} 
                className={`${industry.color} rounded-xl p-3 border border-border transition-all duration-200 hover:scale-105`}
              >
                <span className="text-sm font-medium text-foreground">{industry.name}</span>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
            Each template includes the workflows, data fields, and automations 
            that make sense for your specific business.
          </p>
        </div>
      </section>

      {/* Detailed Industry Features Section with Stunning Gradients */}
      <section className="py-24 relative overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(134,239,172,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(16,185,129,0.1),transparent_50%)]"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <Badge variant="secondary" className="mb-8 bg-gradient-to-r from-primary/30 to-accent/30 text-primary border-primary/40 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 mr-2" />
              Industry Expertise
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              <span className="bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
                Industry-Specific
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Workflows & Templates
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Pre-configured CRM workflows, AI conversation scripts, and automation sequences designed for your industry's unique requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                industry: 'Real Estate',
                description: 'Property-focused CRM with buyer/seller tracking',
                features: ['Property management', 'Lead qualification scripts', 'Showing scheduler', 'Commission tracking'],
                gradient: 'from-blue-500/20 via-card to-blue-600/10',
                border: 'border-blue-200/50',
                shadow: 'hover:shadow-[0_25px_50px_-12px_rgba(59,130,246,0.25)]'
              },
              {
                industry: 'Healthcare',
                description: 'Patient management with HIPAA compliance',
                features: ['Appointment booking', 'Insurance verification', 'Patient follow-ups', 'Treatment reminders'],
                gradient: 'from-emerald-500/20 via-card to-emerald-600/10',
                border: 'border-emerald-200/50',
                shadow: 'hover:shadow-[0_25px_50px_-12px_rgba(16,185,129,0.25)]'
              },
              {
                industry: 'Legal Services',
                description: 'Case management and client communication',
                features: ['Case tracking', 'Billing automation', 'Document workflows', 'Client intake forms'],
                gradient: 'from-purple-500/20 via-card to-purple-600/10',
                border: 'border-purple-200/50',
                shadow: 'hover:shadow-[0_25px_50px_-12px_rgba(139,92,246,0.25)]'
              },
              {
                industry: 'Home Services',
                description: 'Job scheduling and estimate management',
                features: ['Service scheduling', 'Estimate generation', 'Follow-up sequences', 'Equipment tracking'],
                gradient: 'from-red-500/20 via-card to-red-600/10',
                border: 'border-red-200/50',
                shadow: 'hover:shadow-[0_25px_50px_-12px_rgba(239,68,68,0.25)]'
              },
              {
                industry: 'Consulting',
                description: 'Project-based client management',
                features: ['Project tracking', 'Proposal automation', 'Time billing', 'Retainer management'],
                gradient: 'from-amber-500/20 via-card to-amber-600/10',
                border: 'border-amber-200/50',
                shadow: 'hover:shadow-[0_25px_50px_-12px_rgba(245,158,11,0.25)]'
              },
              {
                industry: 'Restaurants',
                description: 'Reservation and customer management',
                features: ['Table booking', 'Order management', 'Loyalty programs', 'Event planning'],
                gradient: 'from-pink-500/20 via-card to-pink-600/10',
                border: 'border-pink-200/50',
                shadow: 'hover:shadow-[0_25px_50px_-12px_rgba(236,72,153,0.25)]'
              }
            ].map((template, index) => (
              <Card 
                key={index} 
                className={`bg-gradient-to-br ${template.gradient} backdrop-blur-sm border ${template.border} ${template.shadow} transition-all duration-500 transform hover:scale-105 group`}
              >
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl text-primary mb-3 group-hover:scale-105 transition-transform duration-300">
                    {template.industry}
                  </CardTitle>
                  <CardDescription className="text-base text-muted-foreground">
                    {template.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {template.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3 group-hover:translate-x-1 transition-transform duration-300" style={{ transitionDelay: `${featureIndex * 50}ms` }}>
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-16">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl"></div>
              <div className="relative bg-card/80 backdrop-blur-sm border border-primary/30 rounded-2xl p-8">
                <p className="text-xl text-muted-foreground mb-6 font-medium">
                  Don't see your industry? We support custom workflows for any business type.
                </p>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-primary/40 hover:border-primary hover:bg-primary/10 bg-gradient-to-r hover:from-primary/5 hover:to-accent/5 transition-all duration-300 transform hover:scale-105"
                >
                  <Sparkles className="h-5 w-5 mr-2" />
                  Request Custom Industry Template
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section with Stunning Gradient */}
      <section className="py-24 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-background to-accent/15"></div>
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,rgba(134,239,172,0.1),transparent_50%,rgba(16,185,129,0.1))]"></div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-8 bg-gradient-to-r from-primary/30 to-accent/30 text-primary border-primary/40 backdrop-blur-sm text-lg px-6 py-2">
              <Sparkles className="h-5 w-5 mr-2" />
              Ready to Launch?
            </Badge>
            
            <h2 className="text-4xl md:text-5xl font-light mb-6">
              <span className="text-foreground">
                Ready to 
              </span>
              <br />
              <span className="font-medium text-primary">
                get started?
              </span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Join thousands of businesses who've simplified their operations with Phunnel. 
              No setup fees, no long-term contracts.
            </p>
            
            <div className="relative inline-block">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-lg px-10 py-4 font-normal"
                onClick={() => navigate(user ? '/dashboard' : '/auth')}
              >
                <Home className="h-5 w-5 mr-2" />
                {user ? 'Go to dashboard' : 'Get started'}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
