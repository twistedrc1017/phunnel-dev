import { z } from "zod";

export const FieldDef = z.object({
  key: z.string(),
  label: z.string(),
  type: z.enum(["text", "email", "tel", "select", "date", "money", "notes", "textarea"]),
  required: z.boolean().optional(),
  options: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
  placeholder: z.string().optional()
});

export const TemplateSpec = z.object({
  meta: z.object({
    industryKey: z.string(),
    displayName: z.string(),
    version: z.number().int().min(1),
    icon: z.string().optional(),
    description: z.string().optional()
  }),
  pipeline: z.object({
    stages: z.array(z.string()).min(3)
  }),
  leadForm: z.object({
    fields: z.array(FieldDef).min(1)
  }),
  aiScripts: z.object({
    intro: z.string(),
    closing: z.string(),
    qualifiers: z.array(z.string())
  }),
  calendar: z.object({
    viewModes: z.array(z.enum(["day", "week", "month", "timeline"])).default(["week", "month"]),
    eventFields: z.array(FieldDef)
  }),
  landing: z.object({
    sections: z.array(z.object({
      key: z.string(),
      props: z.record(z.string(), z.any())
    }))
  }),
  analytics: z.object({
    kpis: z.array(z.object({
      key: z.string(),
      label: z.string(),
      formula: z.string()
    }))
  }),
  automations: z.array(z.object({
    key: z.string(),
    trigger: z.enum(["lead_created", "call_finished", "status_changed"]),
    action: z.enum(["send_email", "send_sms", "create_task", "webhook"]),
    template: z.record(z.string(), z.any())
  })).default([])
});

export type FieldDef = z.infer<typeof FieldDef>;
export type TemplateSpec = z.infer<typeof TemplateSpec>;