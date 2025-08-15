import { IndustryKey, IndustryConfig } from '@/hooks/useIndustry';

export const industryConfigs: Record<IndustryKey, IndustryConfig> = {
  real_estate: {
    displayName: 'Real Estate',
    leadFields: [
      { key: 'name', label: 'Full Name', type: 'text', required: true },
      { key: 'email', label: 'Email Address', type: 'email', required: true },
      { key: 'phone', label: 'Phone Number', type: 'tel', required: true },
      { key: 'buyer_seller', label: 'Are you buying or selling?', type: 'select', required: true, options: [
        { label: 'Buying', value: 'buying' },
        { label: 'Selling', value: 'selling' },
        { label: 'Both', value: 'both' }
      ]},
      { key: 'property_type', label: 'Property Type', type: 'select', required: true, options: [
        { label: 'Single Family Home', value: 'single_family' },
        { label: 'Condo', value: 'condo' },
        { label: 'Townhouse', value: 'townhouse' },
        { label: 'Multi-Family', value: 'multi_family' },
        { label: 'Commercial', value: 'commercial' }
      ]},
      { key: 'budget', label: 'Budget Range', type: 'money', required: true },
      { key: 'timeline', label: 'Timeline', type: 'select', required: true, options: [
        { label: 'ASAP', value: 'asap' },
        { label: '1-3 months', value: '1_3_months' },
        { label: '3-6 months', value: '3_6_months' },
        { label: '6+ months', value: '6_plus_months' }
      ]},
      { key: 'preferred_area', label: 'Preferred Area/Neighborhood', type: 'text' },
      { key: 'notes', label: 'Additional Notes', type: 'textarea' }
    ],
    pipelineStages: ['new', 'pre_qualified', 'showing', 'offer_made', 'under_contract', 'closed'],
    calendarEventTypes: ['showing', 'listing_appointment', 'closing', 'inspection', 'consultation'],
    aiScriptContext: 'real estate agent helping with buying and selling properties'
  },

  property_management: {
    displayName: 'Property Management',
    leadFields: [
      { key: 'name', label: 'Property Owner Name', type: 'text', required: true },
      { key: 'email', label: 'Email Address', type: 'email', required: true },
      { key: 'phone', label: 'Phone Number', type: 'tel', required: true },
      { key: 'property_address', label: 'Property Address', type: 'text', required: true },
      { key: 'property_type', label: 'Property Type', type: 'select', required: true, options: [
        { label: 'Single Family', value: 'single_family' },
        { label: 'Multi-Family', value: 'multi_family' },
        { label: 'Condo', value: 'condo' },
        { label: 'Commercial', value: 'commercial' }
      ]},
      { key: 'units_count', label: 'Number of Units', type: 'text' },
      { key: 'current_rent', label: 'Current Monthly Rent', type: 'money' },
      { key: 'service_needed', label: 'Service Needed', type: 'select', required: true, options: [
        { label: 'Full Management', value: 'full_management' },
        { label: 'Tenant Placement', value: 'tenant_placement' },
        { label: 'Maintenance Only', value: 'maintenance_only' },
        { label: 'Consultation', value: 'consultation' }
      ]},
      { key: 'notes', label: 'Additional Details', type: 'textarea' }
    ],
    pipelineStages: ['new', 'property_assessed', 'contract_sent', 'signed', 'active'],
    calendarEventTypes: ['property_inspection', 'owner_meeting', 'tenant_showing', 'maintenance_visit'],
    aiScriptContext: 'property management company helping property owners with rental management'
  },

  healthcare: {
    displayName: 'Healthcare',
    leadFields: [
      { key: 'name', label: 'Patient Name', type: 'text', required: true },
      { key: 'email', label: 'Email Address', type: 'email', required: true },
      { key: 'phone', label: 'Phone Number', type: 'tel', required: true },
      { key: 'date_of_birth', label: 'Date of Birth', type: 'date', required: true },
      { key: 'insurance_provider', label: 'Insurance Provider', type: 'text' },
      { key: 'reason_for_visit', label: 'Reason for Visit', type: 'select', required: true, options: [
        { label: 'Routine Checkup', value: 'routine_checkup' },
        { label: 'Specific Concern', value: 'specific_concern' },
        { label: 'Follow-up', value: 'follow_up' },
        { label: 'Emergency', value: 'emergency' }
      ]},
      { key: 'preferred_provider', label: 'Preferred Healthcare Provider', type: 'text' },
      { key: 'urgency', label: 'Urgency Level', type: 'select', required: true, options: [
        { label: 'Routine', value: 'routine' },
        { label: 'Urgent', value: 'urgent' },
        { label: 'Emergency', value: 'emergency' }
      ]},
      { key: 'symptoms', label: 'Symptoms/Concerns', type: 'textarea' }
    ],
    pipelineStages: ['new', 'appointment_scheduled', 'consultation_completed', 'treatment_plan', 'follow_up'],
    calendarEventTypes: ['appointment', 'consultation', 'follow_up', 'procedure', 'check_up'],
    aiScriptContext: 'healthcare practice helping patients schedule appointments and consultations'
  },

  legal_services: {
    displayName: 'Legal Services',
    leadFields: [
      { key: 'name', label: 'Client Name', type: 'text', required: true },
      { key: 'email', label: 'Email Address', type: 'email', required: true },
      { key: 'phone', label: 'Phone Number', type: 'tel', required: true },
      { key: 'legal_matter_type', label: 'Type of Legal Matter', type: 'select', required: true, options: [
        { label: 'Personal Injury', value: 'personal_injury' },
        { label: 'Family Law', value: 'family_law' },
        { label: 'Criminal Defense', value: 'criminal_defense' },
        { label: 'Business Law', value: 'business_law' },
        { label: 'Real Estate Law', value: 'real_estate_law' },
        { label: 'Immigration', value: 'immigration' },
        { label: 'Other', value: 'other' }
      ]},
      { key: 'urgency', label: 'Case Urgency', type: 'select', required: true, options: [
        { label: 'Not Urgent', value: 'not_urgent' },
        { label: 'Moderate', value: 'moderate' },
        { label: 'Urgent', value: 'urgent' },
        { label: 'Emergency', value: 'emergency' }
      ]},
      { key: 'budget', label: 'Estimated Budget', type: 'money' },
      { key: 'case_description', label: 'Brief Case Description', type: 'textarea', required: true }
    ],
    pipelineStages: ['new', 'consultation_scheduled', 'case_reviewed', 'retainer_sent', 'active_case'],
    calendarEventTypes: ['consultation', 'court_date', 'deposition', 'client_meeting', 'deadline'],
    aiScriptContext: 'law firm helping clients with legal matters and case consultations'
  },

  home_services: {
    displayName: 'Home Services',
    leadFields: [
      { key: 'name', label: 'Homeowner Name', type: 'text', required: true },
      { key: 'email', label: 'Email Address', type: 'email', required: true },
      { key: 'phone', label: 'Phone Number', type: 'tel', required: true },
      { key: 'service_address', label: 'Service Address', type: 'text', required: true },
      { key: 'service_type', label: 'Service Needed', type: 'select', required: true, options: [
        { label: 'Plumbing', value: 'plumbing' },
        { label: 'Electrical', value: 'electrical' },
        { label: 'HVAC', value: 'hvac' },
        { label: 'Roofing', value: 'roofing' },
        { label: 'Landscaping', value: 'landscaping' },
        { label: 'Cleaning', value: 'cleaning' },
        { label: 'Painting', value: 'painting' },
        { label: 'Other', value: 'other' }
      ]},
      { key: 'urgency', label: 'Service Urgency', type: 'select', required: true, options: [
        { label: 'Emergency', value: 'emergency' },
        { label: 'This Week', value: 'this_week' },
        { label: 'Next 2 Weeks', value: 'next_2_weeks' },
        { label: 'Next Month', value: 'next_month' },
        { label: 'Planning/Quote Only', value: 'planning_only' }
      ]},
      { key: 'budget', label: 'Budget Range', type: 'money' },
      { key: 'problem_description', label: 'Problem Description', type: 'textarea', required: true }
    ],
    pipelineStages: ['new', 'quote_requested', 'quote_sent', 'job_scheduled', 'completed'],
    calendarEventTypes: ['estimate', 'service_call', 'installation', 'follow_up', 'maintenance'],
    aiScriptContext: 'home services company helping homeowners with repairs and maintenance'
  },

  consulting: {
    displayName: 'Consulting',
    leadFields: [
      { key: 'name', label: 'Contact Name', type: 'text', required: true },
      { key: 'email', label: 'Email Address', type: 'email', required: true },
      { key: 'phone', label: 'Phone Number', type: 'tel', required: true },
      { key: 'company', label: 'Company Name', type: 'text', required: true },
      { key: 'title', label: 'Job Title', type: 'text' },
      { key: 'consulting_area', label: 'Consulting Area', type: 'select', required: true, options: [
        { label: 'Business Strategy', value: 'business_strategy' },
        { label: 'Marketing', value: 'marketing' },
        { label: 'Operations', value: 'operations' },
        { label: 'Technology', value: 'technology' },
        { label: 'HR/Organizational', value: 'hr_organizational' },
        { label: 'Financial', value: 'financial' },
        { label: 'Other', value: 'other' }
      ]},
      { key: 'project_scope', label: 'Project Scope', type: 'select', required: true, options: [
        { label: 'Short-term (< 3 months)', value: 'short_term' },
        { label: 'Medium-term (3-6 months)', value: 'medium_term' },
        { label: 'Long-term (6+ months)', value: 'long_term' },
        { label: 'Ongoing', value: 'ongoing' }
      ]},
      { key: 'budget', label: 'Project Budget', type: 'money' },
      { key: 'project_description', label: 'Project Description', type: 'textarea', required: true }
    ],
    pipelineStages: ['new', 'discovery_call', 'proposal_sent', 'negotiation', 'contract_signed'],
    calendarEventTypes: ['discovery_call', 'strategy_session', 'workshop', 'presentation', 'check_in'],
    aiScriptContext: 'consulting firm helping businesses with strategic advice and solutions'
  },

  restaurants: {
    displayName: 'Restaurants',
    leadFields: [
      { key: 'name', label: 'Contact Name', type: 'text', required: true },
      { key: 'email', label: 'Email Address', type: 'email', required: true },
      { key: 'phone', label: 'Phone Number', type: 'tel', required: true },
      { key: 'event_type', label: 'Event Type', type: 'select', required: true, options: [
        { label: 'Private Dining', value: 'private_dining' },
        { label: 'Catering', value: 'catering' },
        { label: 'Corporate Event', value: 'corporate_event' },
        { label: 'Wedding', value: 'wedding' },
        { label: 'Birthday Party', value: 'birthday_party' },
        { label: 'Other Celebration', value: 'other_celebration' }
      ]},
      { key: 'guest_count', label: 'Number of Guests', type: 'text', required: true },
      { key: 'event_date', label: 'Preferred Event Date', type: 'date', required: true },
      { key: 'budget_per_person', label: 'Budget Per Person', type: 'money' },
      { key: 'dietary_restrictions', label: 'Dietary Restrictions', type: 'text' },
      { key: 'special_requests', label: 'Special Requests', type: 'textarea' }
    ],
    pipelineStages: ['new', 'menu_discussion', 'quote_sent', 'booking_confirmed', 'event_completed'],
    calendarEventTypes: ['tasting', 'menu_planning', 'event', 'follow_up', 'consultation'],
    aiScriptContext: 'restaurant helping customers plan private events and catering services'
  },

  other: {
    displayName: 'General Business',
    leadFields: [
      { key: 'name', label: 'Contact Name', type: 'text', required: true },
      { key: 'email', label: 'Email Address', type: 'email', required: true },
      { key: 'phone', label: 'Phone Number', type: 'tel', required: true },
      { key: 'company', label: 'Company Name', type: 'text' },
      { key: 'inquiry_type', label: 'Type of Inquiry', type: 'select', required: true, options: [
        { label: 'General Information', value: 'general_info' },
        { label: 'Service Request', value: 'service_request' },
        { label: 'Partnership', value: 'partnership' },
        { label: 'Support', value: 'support' },
        { label: 'Other', value: 'other' }
      ]},
      { key: 'budget', label: 'Estimated Budget', type: 'money' },
      { key: 'timeline', label: 'Timeline', type: 'select', options: [
        { label: 'Immediate', value: 'immediate' },
        { label: 'This Month', value: 'this_month' },
        { label: 'Next 3 Months', value: 'next_3_months' },
        { label: 'Future Planning', value: 'future_planning' }
      ]},
      { key: 'description', label: 'Description', type: 'textarea', required: true }
    ],
    pipelineStages: ['new', 'contacted', 'qualified', 'proposal_sent', 'converted'],
    calendarEventTypes: ['consultation', 'meeting', 'follow_up', 'presentation', 'demo'],
    aiScriptContext: 'business helping clients with inquiries and service requests'
  }
};

export function getIndustryConfig(industry: IndustryKey): IndustryConfig {
  return industryConfigs[industry] || industryConfigs.other;
}