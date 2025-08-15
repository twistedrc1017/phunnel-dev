import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Layout/Navbar";
import { CheckCircle, Star, Users, Zap, Crown, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  enterprise?: boolean;
  icon: React.ReactNode;
}

const Pricing: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [additionalUsers, setAdditionalUsers] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState<string>('basic');

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

  const plans: PricingPlan[] = [
    {
      id: 'trial',
      name: 'Free Trial',
      price: 0,
      period: '14 days',
      description: 'Perfect for testing our platform with limited access to core features.',
      icon: <Zap className="h-6 w-6" />,
      features: [
        'AI Phone Assistant (50 calls)',
        'Basic website template',
        'Customer management (50 contacts)',
        'Simple calendar integration',
        '7-day call recording storage',
        'Email support',
        'Basic analytics dashboard'
      ]
    },
    {
      id: 'basic',
      name: 'Business Suite',
      price: 97,
      period: 'month',
      description: 'Complete business platform for entrepreneurs and growing companies.',
      icon: <Star className="h-6 w-6" />,
      popular: true,
      features: [
        'Unlimited AI phone handling',
        'Professional website builder',
        'Complete CRM system',
        'Smart scheduling automation',
        'Invoicing & payment processing',
        'Business analytics & reporting',
        '30-day call recording storage',
        'Priority support',
        'Custom AI script development',
        'Email marketing integration'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise/Agency',
      price: 0,
      period: 'custom',
      description: 'Custom solution for agencies and businesses with multiple brands.',
      icon: <Crown className="h-6 w-6" />,
      enterprise: true,
      features: [
        'White-label platform access',
        'Multiple website/brand management',
        'Custom integrations & APIs',
        'Dedicated account manager',
        'Advanced team collaboration',
        'Custom reporting & analytics',
        'Priority technical support',
        'Training & onboarding programs',
        'SLA guarantees',
        'Custom feature development'
      ]
    }
  ];

  const userPricePerMonth = 29; // Base price for additional users
  const maxAdditionalUsers = selectedPlan === 'basic' ? 10 : 0;

  const calculateTotal = () => {
    const basePlan = plans.find(p => p.id === selectedPlan);
    if (!basePlan || basePlan.enterprise) return null;
    
    const basePrice = basePlan.price;
    const additionalUserCost = additionalUsers * userPricePerMonth;
    return basePrice + additionalUserCost;
  };

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    if (planId !== 'basic') {
      setAdditionalUsers(0);
    }
  };

  const handleSubscribe = (planId: string) => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    // Here you would integrate with Stripe or your payment processor
    console.log('Subscribe to plan:', planId, 'Additional users:', additionalUsers);
    // For now, redirect to dashboard or show success message
    navigate('/dashboard');
  };

  const handleContactSales = () => {
    // Open contact form or scheduling link
    window.open('mailto:sales@phunnel.io?subject=Enterprise Inquiry', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <Navbar />
      
      {/* Header Section */}
      <section className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 bg-primary/10 text-primary border-primary/20">
              <Star className="h-3 w-3 mr-1" />
              Flexible Pricing Plans
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
              Choose Your
              <br />
              <span className="text-primary">Growth Plan</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed">
              Launch your business online with AI automation and professional tools. 
              No setup fees, cancel anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan) => (
              <Card 
                key={plan.id}
                className={`relative bg-gradient-to-br from-card to-card/80 border-border/50 shadow-luxury transition-all duration-300 hover:shadow-gold ${
                  plan.popular ? 'ring-2 ring-primary scale-105' : ''
                } ${
                  selectedPlan === plan.id ? 'ring-2 ring-accent' : ''
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-white">
                    Most Popular
                  </Badge>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    {plan.icon}
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  </div>
                  
                  <div className="mb-4">
                    {plan.enterprise ? (
                      <div className="text-4xl font-bold">Custom</div>
                    ) : (
                      <>
                        <div className="text-4xl font-bold">
                          ${plan.price}
                          <span className="text-lg font-normal text-muted-foreground">
                            /{plan.period}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <CardDescription className="text-base">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {plan.enterprise ? (
                    <Button 
                      onClick={handleContactSales}
                      className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                      size="lg"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Contact Sales
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => handleSubscribe(plan.id)}
                      variant={selectedPlan === plan.id ? "default" : "outline"}
                      className={`w-full ${selectedPlan === plan.id ? 'bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90' : ''}`}
                      size="lg"
                    >
                      {plan.id === 'trial' ? 'Start Free Trial' : 'Get Started'}
                    </Button>
                  )}
                  
                  {plan.id === 'basic' && (
                    <Button 
                      variant="ghost" 
                      onClick={() => handlePlanSelect(plan.id)}
                      className="w-full mt-2 text-primary hover:text-accent"
                      size="sm"
                    >
                      {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Users Section */}
      {selectedPlan === 'basic' && (
        <section className="py-12 bg-gradient-to-r from-primary/5 via-background to-accent/5">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto">
              <Card className="bg-gradient-to-br from-card to-card/80 border-border/50 shadow-luxury">
                <CardHeader className="text-center">
                  <Users className="h-8 w-8 text-primary mx-auto mb-4" />
                  <CardTitle className="text-2xl">Additional Team Members</CardTitle>
                  <CardDescription>
                    Add team members to collaborate on leads and access the dashboard
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-medium">Additional Users</span>
                      <div className="flex items-center gap-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setAdditionalUsers(Math.max(0, additionalUsers - 1))}
                          disabled={additionalUsers === 0}
                        >
                          -
                        </Button>
                        <span className="text-xl font-bold w-8 text-center">{additionalUsers}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setAdditionalUsers(Math.min(maxAdditionalUsers, additionalUsers + 1))}
                          disabled={additionalUsers >= maxAdditionalUsers}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span>Business Suite</span>
                        <span className="font-medium">$97/month</span>
                      </div>
                      {additionalUsers > 0 && (
                        <div className="flex justify-between items-center mb-2">
                          <span>{additionalUsers} Additional User{additionalUsers > 1 ? 's' : ''}</span>
                          <span className="font-medium">${additionalUsers * userPricePerMonth}/month</span>
                        </div>
                      )}
                      <hr className="my-2 border-border" />
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span>Total Monthly Cost</span>
                        <span className="text-primary">${calculateTotal()}/month</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground text-center">
                      Each additional user gets full access to the dashboard, lead management, and reporting features.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-gradient-to-br from-card to-card/80 border-border/50 shadow-luxury">
                <CardHeader>
                  <CardTitle>Is there a setup fee?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    No setup fees. We handle all the technical setup and integration as part of your subscription.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-card to-card/80 border-border/50 shadow-luxury">
                <CardHeader>
                  <CardTitle>Can I cancel anytime?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Yes, you can cancel your subscription at any time. No long-term contracts or cancellation fees.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-card to-card/80 border-border/50 shadow-luxury">
                <CardHeader>
                  <CardTitle>How quickly can I get started?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Most clients are up and running within 24-48 hours. We handle the technical setup for you.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-card to-card/80 border-border/50 shadow-luxury">
                <CardHeader>
                  <CardTitle>What support is included?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    All plans include email support. Basic Suite and Enterprise plans include priority support and training.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-background to-accent/10">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Launch Your Business Online?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of businesses using Phunnel to create their professional online presence and grow with AI automation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-lg px-8 py-6 shadow-green"
              onClick={() => handleSubscribe('trial')}
            >
              Start Free Trial
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;