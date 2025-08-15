import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Home, Eye, Star, MapPin, DollarSign, Calendar, Image, Video, Globe } from "lucide-react";

const ShowcaseSection = () => {
  const projects = [
    {
      id: 1,
      title: "Modern Beverly Hills Estate",
      location: "Beverly Hills, CA",
      value: "$3.2M",
      year: "2024",
      status: "completed",
      image: "/api/placeholder/400/300",
      features: ["6 Bedrooms", "8 Bathrooms", "Smart Home", "Pool", "Wine Cellar"],
      description: "Contemporary luxury estate featuring cutting-edge smart home technology and stunning infinity pool."
    },
    {
      id: 2,
      title: "Malibu Oceanfront Villa",
      location: "Malibu, CA",
      value: "$4.8M",
      year: "2024",
      status: "in-progress",
      image: "/api/placeholder/400/300",
      features: ["5 Bedrooms", "6 Bathrooms", "Ocean Views", "Private Beach", "Spa"],
      description: "Stunning oceanfront property with panoramic Pacific views and private beach access."
    },
    {
      id: 3,
      title: "Manhattan Beach Family Home",
      location: "Manhattan Beach, CA",
      value: "$2.1M",
      year: "2023",
      status: "completed",
      image: "/api/placeholder/400/300",
      features: ["4 Bedrooms", "5 Bathrooms", "Home Office", "Gym", "Rooftop Deck"],
      description: "Modern family residence with flexible living spaces and spectacular rooftop entertaining area."
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "in-progress": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "planning": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default: return "bg-muted/20 text-foreground/60 border-border";
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Digital Showcase</h2>
          <p className="text-foreground/70 mt-2">
            Premium portfolio that converts prospects into high-value clients
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="glass" className="gap-2">
            <Globe className="h-4 w-4" />
            View Live Site
          </Button>
          <Button variant="luxury" className="gap-2">
            <Image className="h-4 w-4" />
            Add Project
          </Button>
        </div>
      </div>

      {/* Website Performance */}
      <Card className="p-8 bg-gradient-card border-border/20 backdrop-blur-sm shadow-card">
        <h3 className="text-xl font-semibold mb-6">Website Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
              <Eye className="h-8 w-8 text-primary" />
            </div>
            <p className="text-2xl font-bold text-primary">12,847</p>
            <p className="text-sm text-foreground/60">Monthly Visitors</p>
            <p className="text-xs text-green-400 mt-1">+28% vs last month</p>
          </div>
          <div className="text-center">
            <div className="h-16 w-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-3">
              <Star className="h-8 w-8 text-secondary" />
            </div>
            <p className="text-2xl font-bold text-secondary">4.9</p>
            <p className="text-sm text-foreground/60">Avg Rating</p>
            <p className="text-xs text-green-400 mt-1">247 reviews</p>
          </div>
          <div className="text-center">
            <div className="h-16 w-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-3">
              <Video className="h-8 w-8 text-accent-foreground" />
            </div>
            <p className="text-2xl font-bold text-accent-foreground">89</p>
            <p className="text-sm text-foreground/60">Project Videos</p>
            <p className="text-xs text-green-400 mt-1">156k total views</p>
          </div>
          <div className="text-center">
            <div className="h-16 w-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-3">
              <Globe className="h-8 w-8 text-green-400" />
            </div>
            <p className="text-2xl font-bold text-green-400">2.4s</p>
            <p className="text-sm text-foreground/60">Load Time</p>
            <p className="text-xs text-green-400 mt-1">Optimized</p>
          </div>
        </div>
      </Card>

      {/* Featured Projects */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Featured Projects</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden bg-gradient-card border-border/20 backdrop-blur-sm shadow-card hover:shadow-luxury transition-all duration-300 group">
              <div className="relative overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <Home className="h-16 w-16 text-primary/40" />
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <Button variant="glass" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </div>
              
              <div className="p-6">
                <h4 className="text-lg font-semibold mb-2">{project.title}</h4>
                <p className="text-sm text-foreground/70 mb-4">{project.description}</p>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-secondary" />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-primary" />
                      <span>{project.value}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Calendar className="h-4 w-4 text-accent-foreground" />
                    <span>Completed {project.year}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.features.slice(0, 3).map((feature, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                  {project.features.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.features.length - 3} more
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="luxury" size="sm" className="flex-1">
                    View Gallery
                  </Button>
                  <Button variant="glass" size="sm">
                    <Star className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Website Features */}
      <Card className="p-8 bg-gradient-card border-border/20 backdrop-blur-sm shadow-card">
        <h3 className="text-xl font-semibold mb-6">Website Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Image className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold mb-2">High-Resolution Galleries</h4>
              <p className="text-sm text-foreground/70">Stunning project photography that showcases craftsmanship and attention to detail.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0">
              <Video className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <h4 className="font-semibold mb-2">Virtual Tours</h4>
              <p className="text-sm text-foreground/70">Immersive 3D walkthroughs that let clients experience your work remotely.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
              <Star className="h-5 w-5 text-accent-foreground" />
            </div>
            <div>
              <h4 className="font-semibold mb-2">Client Testimonials</h4>
              <p className="text-sm text-foreground/70">Authentic reviews and success stories that build trust with prospects.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
              <Globe className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <h4 className="font-semibold mb-2">SEO Optimized</h4>
              <p className="text-sm text-foreground/70">Rank higher on Google searches for luxury home builders in your area.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-lg bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
              <Eye className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <h4 className="font-semibold mb-2">Lead Capture Forms</h4>
              <p className="text-sm text-foreground/70">Strategic forms that capture qualified leads without being intrusive.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
              <Calendar className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <h4 className="font-semibold mb-2">Instant Scheduling</h4>
              <p className="text-sm text-foreground/70">Integrated calendar booking for seamless consultation scheduling.</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ShowcaseSection;