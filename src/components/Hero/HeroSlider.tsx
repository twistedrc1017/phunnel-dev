import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowLeft, Home, Sparkles, Phone } from "lucide-react";
import { ParticleField } from './ParticleField';
import { useNavigate } from "react-router-dom";
import { User } from '@supabase/supabase-js';

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  color: string;
  industryType: string;
}

interface HeroSliderProps {
  user: User | null;
}

const heroSlides: HeroSlide[] = [
  {
    id: 'main',
    title: 'Your business,',
    subtitle: 'simplified',
    description: 'Everything you need to run your business online. Website, CRM, AI assistant, and payments—all working together seamlessly.',
    badge: 'All-in-one platform',
    color: '#6be895',
    industryType: 'main'
  },
  {
    id: 'real-estate',
    title: 'Real estate,',
    subtitle: 'reimagined',
    description: 'Close more deals with AI that qualifies buyers, schedules showings, and tracks every lead. Your commission tracker and client CRM, built for agents.',
    badge: 'For real estate professionals',
    color: '#3b82f6',
    industryType: 'real-estate'
  },
  {
    id: 'healthcare',
    title: 'Healthcare,',
    subtitle: 'made simple',
    description: 'HIPAA-compliant patient management with smart scheduling and insurance verification. Focus on care, not paperwork.',
    badge: 'Healthcare platform',
    color: '#10b981',
    industryType: 'healthcare'
  },
  {
    id: 'legal',
    title: 'Legal practice,',
    subtitle: 'streamlined',
    description: 'Case management, client intake, and billing automation. Spend more time practicing law, less time on admin.',
    badge: 'Legal solutions',
    color: '#8b5cf6',
    industryType: 'legal'
  },
  {
    id: 'consulting',
    title: 'Consulting,',
    subtitle: 'perfected',
    description: 'Project tracking, proposal automation, and time billing. Everything consultants need to scale their expertise.',
    badge: 'Consulting platform',
    color: '#f59e0b',
    industryType: 'consulting'
  },
  {
    id: 'home-services',
    title: 'Home services,',
    subtitle: 'organized',
    description: 'Job scheduling, estimates, and equipment tracking. Book more jobs and keep customers happy with smart automation.',
    badge: 'Home services',
    color: '#ef4444',
    industryType: 'home-services'
  },
  {
    id: 'fitness',
    title: 'Fitness,',
    subtitle: 'energized',
    description: 'Class scheduling, membership management, and progress tracking. Help your members reach their goals while growing your business.',
    badge: 'Fitness solutions',
    color: '#06b6d4',
    industryType: 'fitness'
  },
  {
    id: 'restaurants',
    title: 'Restaurants,',
    subtitle: 'perfected',
    description: 'Table reservations, order management, and loyalty programs. Create amazing dining experiences that keep customers coming back.',
    badge: 'Restaurant platform',
    color: '#ec4899',
    industryType: 'restaurants'
  },
  {
    id: 'retail',
    title: 'Retail,',
    subtitle: 'optimized',
    description: 'Inventory management, customer insights, and personalized shopping experiences. Turn browsers into buyers.',
    badge: 'Retail solutions',
    color: '#84cc16',
    industryType: 'retail'
  },
  {
    id: 'education',
    title: 'Education,',
    subtitle: 'enhanced',
    description: 'Student management, course scheduling, and progress tracking. Empower learning with smart administrative tools.',
    badge: 'Education platform',
    color: '#6366f1',
    industryType: 'education'
  },
  {
    id: 'finance',
    title: 'Finance,',
    subtitle: 'trusted',
    description: 'Client portfolio management and financial planning tools. Build lasting relationships with smart, secure technology.',
    badge: 'Finance solutions',
    color: '#059669',
    industryType: 'finance'
  },
  {
    id: 'technology',
    title: 'Technology,',
    subtitle: 'accelerated',
    description: 'Project management and client communication that scales. Ship faster, communicate better, grow smarter.',
    badge: 'Tech platform',
    color: '#7c3aed',
    industryType: 'technology'
  },
  {
    id: 'manufacturing',
    title: 'Manufacturing,',
    subtitle: 'optimized',
    description: 'Supply chain management and quality control. Smart forecasting and inventory optimization that just works.',
    badge: 'Manufacturing solutions',
    color: '#dc2626',
    industryType: 'manufacturing'
  }
];

export const HeroSlider: React.FC<HeroSliderProps> = ({ user }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const navigate = useNavigate();

  const currentSlideData = heroSlides[currentSlide];

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <ParticleField 
          particleCount={600} 
          color={currentSlideData.color} 
          mousePosition={mousePosition}
          industryType={currentSlideData.industryType}
        />
      </div>
      
      {/* Subtle Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60"></div>
      
      {/* Content */}
      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge with clean, minimal styling */}
          <Badge 
            variant="secondary" 
            className="mb-6 bg-muted/80 backdrop-blur-sm text-muted-foreground border-border text-sm px-4 py-1 font-normal"
          >
            {currentSlideData.badge}
          </Badge>
          
          {/* Clean, Wealthsimple-style headlines */}
          <h1 className="text-5xl md:text-7xl font-light mb-6 leading-tight text-foreground">
            {currentSlideData.title}
            <br />
            <span className="font-medium" style={{ color: currentSlideData.color }}>
              {currentSlideData.subtitle}
            </span>
          </h1>
          
          {/* Simple, clear description */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-3xl mx-auto font-normal">
            {currentSlideData.description}
          </p>
          
          {/* Clean CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="text-lg px-8 py-4 font-normal"
              style={{ backgroundColor: currentSlideData.color }}
              onClick={() => navigate(user ? '/dashboard' : '/auth')}
            >
              <Home className="h-5 w-5 mr-2" />
              {user ? 'Go to dashboard' : 'Get started'}
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-4 border-border hover:bg-muted/50 font-normal"
              onClick={() => navigate(`/industry/${currentSlideData.industryType}`)}
            >
              <Phone className="h-5 w-5 mr-2" />
              See how it works
            </Button>
          </div>
        </div>
      </div>

      {/* Simple Navigation Controls */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center gap-3">
          {/* Previous Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={prevSlide}
            className="bg-background/80 backdrop-blur-sm hover:bg-muted border border-border rounded-full w-10 h-10 p-0"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          
          {/* Clean Slide Indicators */}
          <div className="flex gap-1.5">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'w-6' 
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                style={{ 
                  backgroundColor: index === currentSlide ? currentSlideData.color : undefined
                }}
              />
            ))}
          </div>
          
          {/* Next Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={nextSlide}
            className="bg-background/80 backdrop-blur-sm hover:bg-muted border border-border rounded-full w-10 h-10 p-0"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Minimal Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-border/20 z-10">
        <div 
          className="h-full transition-all duration-500 ease-out"
          style={{ 
            width: `${((currentSlide + 1) / heroSlides.length) * 100}%`,
            backgroundColor: currentSlideData.color
          }}
        />
      </div>
    </section>
  );
};