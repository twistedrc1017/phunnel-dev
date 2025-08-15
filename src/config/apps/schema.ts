import { z } from "zod";

export const AppManifest = z.object({
  key: z.string(),
  name: z.string(),
  version: z.number().int().min(1),
  industries: z.array(z.string()),
  ui: z.object({
    route: z.string(),
    navLabel: z.string(),
    icon: z.string().optional()
  }),
  permissions: z.array(z.enum(["leads:read", "leads:write", "calendar:write", "analytics:read", "org:admin"])),
  backend: z.object({
    needsEdgeFn: z.boolean().default(false),
    webhooks: z.array(z.object({ path: z.string(), secretEnv: z.string().optional() })).optional()
  }),
  configSchema: z.record(z.string(), z.any()).optional()
});

export type AppManifest = z.infer<typeof AppManifest>;