import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { useThemeEditor } from '@/lib/theme/ThemeProvider';
import { safeToHex, hexToHsl } from '@/lib/theme/utils';
import { Palette, RotateCcw, Save, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ColorRowProps {
  label: string;
  description?: string;
  varName: keyof import('@/lib/theme/types').ThemeVars;
}

function ColorRow({ label, description, varName }: ColorRowProps) {
  const { vars, setVars } = useThemeEditor();
  const value = (vars[varName] as string) || "";
  
  const handleColorChange = (newHex: string) => {
    const hslValue = hexToHsl(newHex);
    setVars({ ...vars, [varName]: hslValue });
  };

  const handleTextChange = (newValue: string) => {
    setVars({ ...vars, [varName]: newValue });
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <Label className="text-sm font-medium">{label}</Label>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={safeToHex(value)}
            onChange={(e) => handleColorChange(e.target.value)}
            className="h-8 w-12 rounded border border-input bg-transparent cursor-pointer"
            aria-label={label}
          />
          <Input
            type="text"
            value={value}
            onChange={(e) => handleTextChange(e.target.value)}
            className="w-32 text-xs"
            placeholder="HSL values"
          />
        </div>
      </div>
    </div>
  );
}

export function ThemeEditor() {
  const { vars, setVars, save, reset, loading, saving, canEdit } = useThemeEditor();
  const { toast } = useToast();
  const [previewMode, setPreviewMode] = useState(false);

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-1/3"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!canEdit) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">Theme editing requires authentication.</p>
        </CardContent>
      </Card>
    );
  }

  const handleSave = async () => {
    try {
      await save();
      toast({
        title: "Theme saved",
        description: "Your theme changes have been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error saving theme",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleReset = () => {
    reset();
    toast({
      title: "Theme reset",
      description: "Theme has been reset to defaults.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Global Theme Editor
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Customize colors, spacing, and typography. Changes apply instantly.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPreviewMode(!previewMode)}
              >
                <Eye className="h-4 w-4 mr-2" />
                {previewMode ? 'Edit' : 'Preview'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Button
                onClick={handleSave}
                disabled={saving}
                size="sm"
              >
                <Save className="h-4 w-4 mr-2" />
                {saving ? 'Saving...' : 'Save Theme'}
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {!previewMode && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Primary Colors */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Primary Colors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ColorRow 
                label="Background" 
                description="Main app background"
                varName="--background" 
              />
              <ColorRow 
                label="Primary" 
                description="Brand color (buttons, links)"
                varName="--primary" 
              />
              <ColorRow 
                label="Secondary" 
                description="Secondary elements"
                varName="--secondary" 
              />
              <ColorRow 
                label="Accent" 
                description="Highlighted elements"
                varName="--accent" 
              />
            </CardContent>
          </Card>

          {/* Surface Colors */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Surface & Text</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ColorRow 
                label="Card Background" 
                description="Cards and panels"
                varName="--card" 
              />
              <ColorRow 
                label="Foreground Text" 
                description="Primary text color"
                varName="--foreground" 
              />
              <ColorRow 
                label="Muted Text" 
                description="Secondary text"
                varName="--muted-foreground" 
              />
              <ColorRow 
                label="Border" 
                description="Element borders"
                varName="--border" 
              />
            </CardContent>
          </Card>

          {/* Layout & Spacing */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Layout & Spacing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Border Radius</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    value={[parseFloat((vars["--radius"] || "0.75rem").replace("rem", ""))]}
                    onValueChange={([value]) => setVars({ ...vars, "--radius": `${value}rem` })}
                    max={2}
                    min={0}
                    step={0.25}
                    className="flex-1"
                  />
                  <span className="text-sm w-16">{vars["--radius"]}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Typography */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Typography</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Base Font Size</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    value={[parseInt((vars["--font-size-base"] || "16px").replace("px", ""))]}
                    onValueChange={([value]) => setVars({ ...vars, "--font-size-base": `${value}px` })}
                    max={20}
                    min={12}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-sm w-16">{vars["--font-size-base"]}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Line Height</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    value={[parseFloat(vars["--line-height"] || "1.6")]}
                    onValueChange={([value]) => setVars({ ...vars, "--line-height": value.toString() })}
                    max={2}
                    min={1}
                    step={0.1}
                    className="flex-1"
                  />
                  <span className="text-sm w-16">{vars["--line-height"]}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Live Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Live Preview</CardTitle>
          <p className="text-sm text-muted-foreground">
            See how your theme changes look across different components
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Sample Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  This is how your cards will look with the current theme.
                </p>
                <Button className="mt-3">Primary Button</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Form Elements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Input placeholder="Sample input field" />
                <Button variant="secondary" className="w-full">
                  Secondary Button
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Typography</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <h3 className="font-semibold">Heading Text</h3>
                <p className="text-sm text-muted-foreground">
                  Body text with current font size and line height settings.
                </p>
                <Button variant="outline">Outline Button</Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}