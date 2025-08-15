import { supabase } from '@/integrations/supabase/client';
import { TemplateSpec, TemplateSpec as TemplateSpecSchema } from '@/config/templates/schema';
import { AppManifest } from '@/config/apps/schema';

// Import template files
import luxuryBuildersTemplate from '@/config/templates/baseline/luxury_builders.json';
import roofingTemplate from '@/config/templates/baseline/roofing.json';
import medSpaTemplate from '@/config/templates/baseline/med_spa.json';
import legalTemplate from '@/config/templates/baseline/legal.json';

// Import app manifests
import roofingEstimatorApp from '@/config/apps/baseline/roofing_estimator.json';
import legalIntakeApp from '@/config/apps/baseline/legal_intake.json';

const templates = [
  {
    key: 'luxury_builders',
    name: 'Luxury Home Builders',
    version: 1,
    spec: luxuryBuildersTemplate,
    is_active: true
  },
  {
    key: 'roofing',
    name: 'Roofing Services',
    version: 1,
    spec: roofingTemplate,
    is_active: true
  },
  {
    key: 'med_spa',
    name: 'Medical Spa',
    version: 1,
    spec: medSpaTemplate,
    is_active: true
  },
  {
    key: 'legal',
    name: 'Legal Services',
    version: 1,
    spec: legalTemplate,
    is_active: true
  }
];

const apps = [
  {
    key: 'roofing_estimator',
    name: 'Roofing Cost Estimator',
    industry_keys: ['roofing', 'home_services'],
    version: 1,
    spec: roofingEstimatorApp,
    is_active: true
  },
  {
    key: 'legal_intake',
    name: 'Legal Case Intake Wizard',
    industry_keys: ['legal'],
    version: 1,
    spec: legalIntakeApp,
    is_active: true
  }
];

export async function seedTemplates() {
  console.log('🌱 Seeding industry templates...');
  
  try {
    // Validate templates against schema
    for (const template of templates) {
      TemplateSpecSchema.parse(template.spec);
    }

    // Upsert templates
    for (const template of templates) {
      const { error } = await supabase
        .from('industry_templates')
        .upsert(template, { onConflict: 'key' });
      
      if (error) {
        console.error(`Error seeding template ${template.key}:`, error);
      } else {
        console.log(`✅ Seeded template: ${template.name}`);
      }
    }

    console.log('🎉 Templates seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding templates:', error);
    throw error;
  }
}

export async function seedApps() {
  console.log('🌱 Seeding industry apps...');
  
  try {
    // Upsert apps
    for (const app of apps) {
      const { error } = await supabase
        .from('industry_apps')
        .upsert(app, { onConflict: 'key' });
      
      if (error) {
        console.error(`Error seeding app ${app.key}:`, error);
      } else {
        console.log(`✅ Seeded app: ${app.name}`);
      }
    }

    console.log('🎉 Apps seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding apps:', error);
    throw error;
  }
}

// Auto-seed when imported (run once)
if (typeof window !== 'undefined') {
  // Only run in browser
  Promise.all([seedTemplates(), seedApps()]).catch(console.error);
}