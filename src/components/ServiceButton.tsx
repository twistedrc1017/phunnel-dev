import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ServiceButtonProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
}

export const ServiceButton: React.FC<ServiceButtonProps> = ({ 
  id, 
  title, 
  description, 
  icon: Icon, 
  className = "" 
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/services/${id}`);
  };

  return (
    <Card 
      className={`group cursor-pointer bg-gradient-to-br from-card to-card/80 border-border/50 shadow-luxury hover:shadow-gold transition-all duration-300 hover:scale-105 ${className}`}
      onClick={handleClick}
    >
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <Icon className="h-12 w-12 text-primary group-hover:text-accent transition-colors duration-300" />
          <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
        </div>
        <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base leading-relaxed">
          {description}
        </CardDescription>
        <Button 
          variant="ghost" 
          size="sm" 
          className="mt-4 p-0 h-auto text-primary hover:text-accent group-hover:underline"
        >
          Learn More →
        </Button>
      </CardContent>
    </Card>
  );
};