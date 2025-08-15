import { useState } from "react";
import Header from "@/components/Header";
import Dashboard from "@/components/Dashboard";
import AICallsSection from "@/components/AICallsSection";
import LeadsSection from "@/components/LeadsSection";
import AnalyticsSection from "@/components/AnalyticsSection";
import ShowcaseSection from "@/components/ShowcaseSection";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderActiveSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "ai-calls":
        return <AICallsSection />;
      case "leads":
        return <LeadsSection />;
      case "analytics":
        return <AnalyticsSection />;
      case "showcase":
        return <ShowcaseSection />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      <main className="container mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mb-8 p-2 bg-card/20 backdrop-blur-md rounded-xl border border-border/20">
          {[
            { id: "dashboard", label: "Dashboard", icon: "📊" },
            { id: "ai-calls", label: "AI Calls", icon: "📞" },
            { id: "leads", label: "Leads", icon: "👥" },
            { id: "analytics", label: "Analytics", icon: "📈" },
            { id: "showcase", label: "Showcase", icon: "🏠" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeSection === tab.id
                  ? "bg-primary text-primary-foreground shadow-gold"
                  : "text-foreground/70 hover:text-foreground hover:bg-card/40"
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Active Section Content */}
        {renderActiveSection()}
      </main>
    </div>
  );
};

export default Index;
