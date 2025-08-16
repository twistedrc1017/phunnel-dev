import { supabase } from '@/integrations/supabase/client';

// Sample data for generating random leads
const firstNames = [
  'Sarah', 'Michael', 'Jennifer', 'David', 'Lisa', 'Robert', 'Jessica', 'William',
  'Ashley', 'Christopher', 'Amanda', 'Matthew', 'Stephanie', 'Anthony', 'Melissa',
  'Joshua', 'Michelle', 'Daniel', 'Kimberly', 'Mark', 'Amy', 'Steven', 'Angela',
  'Kevin', 'Helen', 'Brian', 'Deborah', 'George', 'Rachel', 'Edward', 'Carolyn',
  'Ronald', 'Janet', 'Timothy', 'Virginia', 'Jason', 'Maria', 'Jeffrey', 'Heather'
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
  'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson',
  'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker',
  'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores'
];

const companies = [
  'Tech Solutions Inc', 'Global Enterprises', 'Innovative Systems', 'Premier Services',
  'Advanced Technologies', 'Strategic Partners', 'Excellence Group', 'Dynamic Solutions',
  'Professional Services LLC', 'Elite Consulting', 'Modern Ventures', 'Peak Performance',
  'Precision Industries', 'Summit Corporation', 'Nexus Solutions', 'Apex Group',
  'Optimal Systems', 'Prime Industries', 'Focus Enterprises', 'Vision Corp'
];

const cities = [
  'New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX', 'Phoenix, AZ',
  'Philadelphia, PA', 'San Antonio, TX', 'San Diego, CA', 'Dallas, TX', 'San Jose, CA',
  'Austin, TX', 'Jacksonville, FL', 'Fort Worth, TX', 'Columbus, OH', 'Charlotte, NC',
  'San Francisco, CA', 'Indianapolis, IN', 'Seattle, WA', 'Denver, CO', 'Washington, DC',
  'Boston, MA', 'El Paso, TX', 'Detroit, MI', 'Nashville, TN', 'Portland, OR',
  'Memphis, TN', 'Oklahoma City, OK', 'Las Vegas, NV', 'Louisville, KY', 'Baltimore, MD'
];

const timelines = [
  'ASAP', '1-2 weeks', '1 month', '2-3 months', '3-6 months', '6+ months', 'Flexible'
];

const industries = [
  'real_estate', 'property_management', 'healthcare', 'legal_services', 
  'home_services', 'consulting', 'restaurants'
] as const;

const statuses = ['new', 'contacted', 'qualified', 'converted'] as const;

// Generate random custom fields based on industry
const generateCustomFields = (industry: string) => {
  const baseFields = {
    source: ['Website', 'Referral', 'Google Ads', 'Social Media', 'Cold Outreach'][Math.floor(Math.random() * 5)],
    notes: [
      'Interested in premium package',
      'Price sensitive client',
      'Needs quick turnaround',
      'Referred by existing client',
      'Saw our recent work and impressed',
      'Looking for long-term partnership',
      'Has specific requirements',
      'Budget approved, ready to move forward'
    ][Math.floor(Math.random() * 8)]
  };

  // Add industry-specific fields
  switch (industry) {
    case 'real_estate':
      return {
        ...baseFields,
        propertyType: ['Residential', 'Commercial', 'Luxury', 'Investment'][Math.floor(Math.random() * 4)],
        bedrooms: Math.floor(Math.random() * 6) + 1,
        bathrooms: Math.floor(Math.random() * 4) + 1
      };
    case 'home_services':
      return {
        ...baseFields,
        serviceType: ['Plumbing', 'Electrical', 'HVAC', 'Roofing', 'Landscaping'][Math.floor(Math.random() * 5)],
        urgency: ['Emergency', 'Within a week', 'Within a month', 'Flexible'][Math.floor(Math.random() * 4)]
      };
    case 'legal_services':
      return {
        ...baseFields,
        caseType: ['Personal Injury', 'Corporate Law', 'Family Law', 'Criminal Defense', 'Real Estate Law'][Math.floor(Math.random() * 5)],
        complexity: ['Simple', 'Moderate', 'Complex'][Math.floor(Math.random() * 3)]
      };
    case 'healthcare':
      return {
        ...baseFields,
        specialty: ['General Practice', 'Cardiology', 'Dermatology', 'Orthopedics', 'Pediatrics'][Math.floor(Math.random() * 5)],
        insurance: ['PPO', 'HMO', 'Medicare', 'Self-Pay'][Math.floor(Math.random() * 4)]
      };
    case 'restaurants':
      return {
        ...baseFields,
        cuisineType: ['Italian', 'Mexican', 'Asian', 'American', 'Mediterranean'][Math.floor(Math.random() * 5)],
        seatingCapacity: Math.floor(Math.random() * 200) + 50
      };
    default:
      return baseFields;
  }
};

const generateRandomLead = () => {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const industry = industries[Math.floor(Math.random() * industries.length)];
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  
  // Generate email from name
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${companies[Math.floor(Math.random() * companies.length)].toLowerCase().replace(/[^a-z0-9]/g, '')}.com`;
  
  // Generate phone number
  const phone = `+1 (${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`;
  
  // Generate budget (in dollars)
  const budgetRanges = [5000, 10000, 25000, 50000, 100000, 250000, 500000];
  const budget = budgetRanges[Math.floor(Math.random() * budgetRanges.length)] + (Math.random() * 10000);
  
  return {
    name: `${firstName} ${lastName}`,
    email,
    phone,
    industry,
    status,
    budget: Math.round(budget),
    timeline: timelines[Math.floor(Math.random() * timelines.length)],
    project_location: cities[Math.floor(Math.random() * cities.length)],
    custom_fields: generateCustomFields(industry),
    // user_id will be set when we call the function
  };
};

export async function seedRandomLeads(count: number = 25) {
  console.log(`🌱 Generating ${count} random test leads...`);
  
  try {
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      throw new Error('Must be authenticated to seed leads');
    }

    // Generate leads
    const leads = Array.from({ length: count }, () => ({
      ...generateRandomLead(),
      user_id: user.id
    }));

    // Insert leads in batches of 10 to avoid overwhelming the database
    const batchSize = 10;
    let successCount = 0;
    
    for (let i = 0; i < leads.length; i += batchSize) {
      const batch = leads.slice(i, i + batchSize);
      const { data, error } = await supabase
        .from('leads')
        .insert(batch)
        .select();
      
      if (error) {
        console.error(`Error inserting batch ${Math.floor(i/batchSize) + 1}:`, error);
      } else {
        successCount += data?.length || 0;
        console.log(`✅ Inserted batch ${Math.floor(i/batchSize) + 1}: ${data?.length || 0} leads`);
      }
    }

    console.log(`🎉 Successfully seeded ${successCount} out of ${count} leads!`);
    return successCount;
  } catch (error) {
    console.error('❌ Error seeding leads:', error);
    throw error;
  }
}

// Auto-run if called directly (for browser console)
if (typeof window !== 'undefined' && window.location.pathname.includes('dashboard')) {
  // Expose function globally for easy access in browser console
  (window as any).seedRandomLeads = seedRandomLeads;
  console.log('💡 Run seedRandomLeads(50) in console to generate 50 test leads');
}