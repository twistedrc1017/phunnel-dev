import { ThemeVars } from "./types";

export function applyThemeVars(vars: ThemeVars, target: HTMLElement = document.documentElement) {
  Object.entries(vars).forEach(([key, value]) => {
    if (value && typeof value === "string") {
      target.style.setProperty(key, value);
    }
  });
}

export function safeToHex(value: string): string {
  if (!value) return "#000000";
  
  // Handle HSL values
  if (value.includes("hsl")) {
    // Extract the hue value for color picker
    const hueMatch = value.match(/hsl\((\d+)/);
    if (hueMatch) {
      const hue = parseInt(hueMatch[1]);
      // Convert HSL to approximate hex for color picker
      return hslToHex(hue, 50, 50);
    }
  }
  
  // Handle hex values
  const hex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value) ? value : "#000000";
  return hex;
}

export function hexToHsl(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

function hslToHex(h: number, s: number, l: number): string {
  const hDecimal = l / 100;
  const a = (s * Math.min(hDecimal, 1 - hDecimal)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = hDecimal - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}