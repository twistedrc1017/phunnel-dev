import { z } from "zod";

export const OnboardingOption = z.object({
  label: z.string(),
  value: z.string(),
  next: z.string().optional() // Next node key for conditional flows
});

export const OnboardingNode = z.object({
  key: z.string(),
  type: z.enum(["intro", "question", "fork", "end"]),
  title: z.string(),
  body: z.string().optional(),
  required: z.boolean().default(false),
  
  // Question-specific fields
  questionType: z.enum(["single", "multi", "scale", "text", "email", "number"]).optional(),
  options: z.array(OnboardingOption).optional(),
  min: z.number().optional(),
  max: z.number().optional(),
  
  // Navigation
  next: z.string().optional(), // Default next node
  conditions: z.array(z.object({
    answer: z.any(),
    next: z.string()
  })).optional()
});

export const OnboardingSurvey = z.object({
  version: z.number(),
  title: z.string(),
  description: z.string(),
  nodes: z.array(OnboardingNode),
  startNode: z.string()
});

export const OnboardingSession = z.object({
  id: z.string(),
  userId: z.string().optional(),
  email: z.string().optional(),
  version: z.number(),
  cursor: z.string(),
  answers: z.record(z.string(), z.any()),
  recommendedTemplate: z.string().optional(),
  recommendedWidgets: z.array(z.string()).optional(),
  createdAt: z.string(),
  updatedAt: z.string()
});

export const OnboardingResponse = z.object({
  sessionId: z.string(),
  businessName: z.string().optional(),
  website: z.string().optional(),
  industry: z.string().optional(),
  teamSize: z.number().optional(),
  monthlyAdSpend: z.number().optional(),
  primaryGoals: z.array(z.string()).optional(),
  pains: z.array(z.string()).optional(),
  timeline: z.string().optional()
});

export type OnboardingOption = z.infer<typeof OnboardingOption>;
export type OnboardingNode = z.infer<typeof OnboardingNode>;
export type OnboardingSurvey = z.infer<typeof OnboardingSurvey>;
export type OnboardingSession = z.infer<typeof OnboardingSession>;
export type OnboardingResponse = z.infer<typeof OnboardingResponse>;