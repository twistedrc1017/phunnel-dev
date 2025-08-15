import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Building2, 
  Home, 
  Heart, 
  Scale, 
  Wrench, 
  Users
} from 'lucide-react';

const industries = [
  {
    id: 'real-estate',
    name: 'Real Estate',
    icon: Building2,
    description: 'Property-focused CRM with buyer/seller tracking',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    accent: 'border-blue-500/50 hover:border-blue-500'
  },
  {
    id: 'home-services',
    name: 'Home Services',
    icon: Wrench,
    description: 'Service scheduling with estimate generation',
    gradient: 'from-orange-500/20 to-yellow-500/20',
    accent: 'border-orange-500/50 hover:border-orange-500'
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    icon: Heart,
    description: 'HIPAA-compliant patient management',
    gradient: 'from-red-500/20 to-pink-500/20',
    accent: 'border-red-500/50 hover:border-red-500'
  },
  {
    id: 'legal-services',
    name: 'Legal Services',
    icon: Scale,
    description: 'Case management with billing automation',
    gradient: 'from-purple-500/20 to-indigo-500/20',
    accent: 'border-purple-500/50 hover:border-purple-500'
  }
];

export function HomeIndustryTiles() {
  const navigate = useNavigate();

  const handleTileClick = (industryId: string) => {
    navigate(`/industries#${industryId}`);
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {industries.map((industry) => {
        const IconComponent = industry.icon;
        return (
          <Card 
            key={industry.id}
            className={`group cursor-pointer transition-all duration-300 hover:scale-105 border-2 ${industry.accent} bg-gradient-to-br ${industry.gradient} backdrop-blur-sm`}
            onClick={() => handleTileClick(industry.id)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 mb-1">
                <div className="p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <IconComponent className="h-4 w-4 text-primary" />
                </div>
                <CardTitle className="text-sm font-medium">
                  {industry.name}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="text-xs leading-relaxed">
                {industry.description}
              </CardDescription>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}