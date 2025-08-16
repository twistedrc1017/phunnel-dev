import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Calendar, Home, Sparkles, Users, TrendingUp, LogOut, User as UserIcon, BarChart3, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { ServiceButton } from "@/components/ServiceButton";
import { HeroSlider } from "@/components/Hero/HeroSlider";

const Index = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen bg-background">
      <title>Phunnel - AI-Powered Business Platform with CRM, Website Builder & Invoicing</title>
      <meta name="description" content="Create your branded business website with integrated AI phone assistant, CRM, and invoicing. Turn visitors into customers automatically." />

      {/* Navigation */}
      <nav className="absolute top-0 w-full z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-primary">PHUNNEL</h1>
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center gap-2 hover:bg-secondary hover:text-foreground"
                  >
                    <BarChart3 className="h-4 w-4" />
                    Dashboard
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/profile')}
                    className="flex items-center gap-2 hover:bg-secondary hover:text-foreground"
                  >
                    <UserIcon className="h-4 w-4" />
                    Profile
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSignOut}
                    className="flex items-center gap-2 hover:bg-destructive/15 hover:text-destructive"
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
                  className="border-primary/50 text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary"
                >
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Slider (unchanged) */}
      <HeroSlider user={user} />

      {/* Interactive Services Section — solids only */}
      <section className="py-20 container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-6 bg-secondary text-secondary-foreground border border-border">
            Everything you need
          </Badge>
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            <span className="text-foreground">Business tools that</span>
            <br />
            <span className="font-medium text-primary">actually work together</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            No more juggling five different apps. Get your website, CRM, AI assistant, and payments
            working as one seamless system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ServiceButton
            id="ai-call-assistant"
            title="Never miss a call"
            description="Your AI assistant answers every call, qualifies customers, and books meetings. Even when you're busy."
            icon={Phone}
            className="bg-card border border-border hover:bg-secondary hover:border-primary transition-colors"
          />
          <ServiceButton
            id="website-builder"
            title="Professional website"
            description="A beautiful website that works on every device. Your customers will love how easy it is to use."
            icon={Home}
            className="bg-card border border-border hover:bg-secondary hover:border-primary transition-colors"
          />
          <ServiceButton
            id="crm-system"
            title="Know your customers"
            description="Keep track of every customer conversation and never let a lead slip through the cracks."
            icon={Users}
            className="bg-card border border-border hover:bg-secondary hover:border-primary transition-colors"
          />
          <ServiceButton
            id="smart-scheduling"
            title="Easy scheduling"
            description="Let customers book themselves. No more phone tag or back-and-forth emails."
            icon={Calendar}
            className="bg-card border border-border hover:bg-secondary hover:border-primary transition-colors"
          />
          <ServiceButton
            id="invoicing-payments"
            title="Get paid faster"
            description="Professional invoices and instant payments. No more chasing down late payments."
            icon={TrendingUp}
            className="bg-card border border-border hover:bg-secondary hover:border-primary transition-colors"
          />
          <ServiceButton
            id="business-analytics"
            title="See what's working"
            description="Simple reports that show you what's driving results. Make decisions with confidence."
            icon={Sparkles}
            className="bg-card border border-border hover:bg-secondary hover:border-primary transition-colors"
          />
        </div>

        {/* Industry Showcase — keep per-industry color variants (solids), strong hover */}
        <div className="mt-20 text-center">
          <Badge variant="secondary" className="mb-6 bg-secondary text-secondary-foreground border border-border">
            Works for everyone
          </Badge>
          <h3 className="text-3xl md:text-4xl font-light mb-6">
            <span className="text-foreground">Built for</span>
            <br />
            <span className="font-medium text-primary">your industry</span>
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 max-w-4xl mx-auto">
            {[
              { name: 'Real Estate', bg: 'bg-blue-50', hover: 'hover:bg-blue-100', border: 'border-blue-200' },
              { name: 'Healthcare', bg: 'bg-emerald-50', hover: 'hover:bg-emerald-100', border: 'border-emerald-200' },
              { name: 'Legal', bg: 'bg-purple-50', hover: 'hover:bg-purple-100', border: 'border-purple-200' },
              { name: 'Consulting', bg: 'bg-amber-50', hover: 'hover:bg-amber-100', border: 'border-amber-200' },
              { name: 'Home Services', bg: 'bg-red-50', hover: 'hover:bg-red-100', border: 'border-red-200' },
              { name: 'Fitness', bg: 'bg-cyan-50', hover: 'hover:bg-cyan-100', border: 'border-cyan-200' },
              { name: 'Restaurants', bg: 'bg-pink-50', hover: 'hover:bg-pink-100', border: 'border-pink-200' },
              { name: 'Retail', bg: 'bg-lime-50', hover: 'hover:bg-lime-100', border: 'border-lime-200' },
              { name: 'Education', bg: 'bg-indigo-50', hover: 'hover:bg-indigo-100', border: 'border-indigo-200' },
              { name: 'Finance', bg: 'bg-emerald-50', hover: 'hover:bg-emerald-100', border: 'border-emerald-200' },
              { name: 'Technology', bg: 'bg-violet-50', hover: 'hover:bg-violet-100', border: 'border-violet-200' },
              { name: 'Manufacturing', bg: 'bg-red-50', hover: 'hover:bg-red-100', border: 'border-red-200' }
            ].map((industry) => (
              <div
                key={industry.name}
                className={`${industry.bg} ${industry.border} rounded-xl p-3 border transition-colors ${industry.hover}`}
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

      {/* Detailed Industry Features — solid per-industry variants (no gradients) */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <Badge variant="secondary" className="mb-8 bg-secondary text-secondary-foreground border border-border">
              <Sparkles className="h-4 w-4 mr-2" />
              Industry Expertise
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-foreground">
              <span>Industry-Specific</span>
              <br />
              <span className="text-primary">Workflows & Templates</span>
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
                bg: 'bg-blue-50', hoverBg: 'hover:bg-blue-100', border: 'border-blue-200', hoverBorder: 'hover:border-blue-300'
              },
              {
                industry: 'Healthcare',
                description: 'Patient management with privacy compliance',
                features: ['Appointment booking', 'Insurance verification', 'Patient follow-ups', 'Treatment reminders'],
                bg: 'bg-emerald-50', hoverBg: 'hover:bg-emerald-100', border: 'border-emerald-200', hoverBorder: 'hover:border-emerald-300'
              },
              {
                industry: 'Legal Services',
                description: 'Case management and client communication',
                features: ['Case tracking', 'Billing automation', 'Document workflows', 'Client intake forms'],
                bg: 'bg-purple-50', hoverBg: 'hover:bg-purple-100', border: 'border-purple-200', hoverBorder: 'hover:border-purple-300'
              },
              {
                industry: 'Home Services',
                description: 'Job scheduling and estimate management',
                features: ['Service scheduling', 'Estimate generation', 'Follow-up sequences', 'Equipment tracking'],
                bg: 'bg-red-50', hoverBg: 'hover:bg-red-100', border: 'border-red-200', hoverBorder: 'hover:border-red-300'
              },
              {
                industry: 'Consulting',
                description: 'Project-based client management',
                features: ['Project tracking', 'Proposal automation', 'Time billing', 'Retainer management'],
                bg: 'bg-amber-50', hoverBg: 'hover:bg-amber-100', border: 'border-amber-200', hoverBorder: 'hover:border-amber-300'
              },
              {
                industry: 'Restaurants',
                description: 'Reservation and customer management',
                features: ['Table booking', 'Order management', 'Loyalty programs', 'Event planning'],
                bg: 'bg-pink-50', hoverBg: 'hover:bg-pink-100', border: 'border-pink-200', hoverBorder: 'hover:border-pink-300'
              }
            ].map((t, i) => (
              <Card
                key={i}
                className={`${t.bg} border ${t.border} transition-colors duration-200 ${t.hoverBg} ${t.hoverBorder} group`}
              >
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl text-foreground mb-3">{t.industry}</CardTitle>
                  <CardDescription className="text-base text-muted-foreground">
                    {t.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {t.features.map((feature, fi) => (
                    <div key={fi} className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-foreground">{feature}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-16">
            <div className="inline-block">
              <div className="bg-card border border-primary/40 rounded-2xl p-8">
                <p className="text-xl text-muted-foreground mb-6 font-medium">
                  Don't see your industry? We support custom workflows for any business type.
                </p>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Sparkles className="h-5 w-5 mr-2" />
                  Request Custom Industry Template
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA — solid, no gradients */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-8 bg-secondary text-secondary-foreground border border-border text-lg px-6 py-2">
              <Sparkles className="h-5 w-5 mr-2" />
              Ready to Launch?
            </Badge>

            <h2 className="text-4xl md:text-5xl font-light mb-6">
              <span className="text-foreground">Ready to</span>
              <br />
              <span className="font-medium text-primary">get started?</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Join thousands of businesses who've simplified their operations with Phunnel.
              No setup fees, no long-term contracts.
            </p>

            <div className="inline-block">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-10 py-4 font-normal"
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
