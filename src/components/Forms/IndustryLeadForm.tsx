import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { IndustryType } from './AddLeadDialog';

interface IndustryLeadFormProps {
  industry: IndustryType;
  customFields: Record<string, any>;
  onFieldChange: (field: string, value: any) => void;
}

export const IndustryLeadForm: React.FC<IndustryLeadFormProps> = ({
  industry,
  customFields,
  onFieldChange
}) => {
  const renderRealEstateFields = () => (
    <div className="space-y-4 p-4 bg-muted/20 rounded-lg">
      <h3 className="font-semibold text-lg">Real Estate Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="property_address">Property Address</Label>
          <Input
            id="property_address"
            value={customFields.property_address || ''}
            onChange={(e) => onFieldChange('property_address', e.target.value)}
            placeholder="123 Main St, City, State"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="buyer_seller_status">Buyer/Seller Status</Label>
          <Select value={customFields.buyer_seller_status || ''} onValueChange={(value) => onFieldChange('buyer_seller_status', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="buyer">Buyer</SelectItem>
              <SelectItem value="seller">Seller</SelectItem>
              <SelectItem value="both">Both</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="desired_closing_date">Desired Closing Date</Label>
          <Input
            id="desired_closing_date"
            type="date"
            value={customFields.desired_closing_date || ''}
            onChange={(e) => onFieldChange('desired_closing_date', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="property_type">Property Type</Label>
          <Select value={customFields.property_type || ''} onValueChange={(value) => onFieldChange('property_type', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single_family">Single Family</SelectItem>
              <SelectItem value="condo">Condo</SelectItem>
              <SelectItem value="townhouse">Townhouse</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="land">Land</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  const renderPropertyManagementFields = () => (
    <div className="space-y-4 p-4 bg-muted/20 rounded-lg">
      <h3 className="font-semibold text-lg">Property Management Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="property_type_mgmt">Property Type</Label>
          <Select value={customFields.property_type_mgmt || ''} onValueChange={(value) => onFieldChange('property_type_mgmt', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="residential">Residential</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="mixed_use">Mixed Use</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="showing_date">Showing Date</Label>
          <Input
            id="showing_date"
            type="date"
            value={customFields.showing_date || ''}
            onChange={(e) => onFieldChange('showing_date', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="commission_rate">Commission Rate (%)</Label>
          <Input
            id="commission_rate"
            type="number"
            step="0.1"
            value={customFields.commission_rate || ''}
            onChange={(e) => onFieldChange('commission_rate', parseFloat(e.target.value))}
            placeholder="2.5"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="units_count">Number of Units</Label>
          <Input
            id="units_count"
            type="number"
            value={customFields.units_count || ''}
            onChange={(e) => onFieldChange('units_count', parseInt(e.target.value))}
            placeholder="10"
          />
        </div>
      </div>
    </div>
  );

  const renderHealthcareFields = () => (
    <div className="space-y-4 p-4 bg-muted/20 rounded-lg">
      <h3 className="font-semibold text-lg">Healthcare Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="appointment_date">Appointment Date</Label>
          <Input
            id="appointment_date"
            type="datetime-local"
            value={customFields.appointment_date || ''}
            onChange={(e) => onFieldChange('appointment_date', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="insurance_provider">Insurance Provider</Label>
          <Input
            id="insurance_provider"
            value={customFields.insurance_provider || ''}
            onChange={(e) => onFieldChange('insurance_provider', e.target.value)}
            placeholder="Blue Cross Blue Shield"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="treatment_type">Treatment Type</Label>
          <Select value={customFields.treatment_type || ''} onValueChange={(value) => onFieldChange('treatment_type', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select treatment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="consultation">Consultation</SelectItem>
              <SelectItem value="routine_checkup">Routine Checkup</SelectItem>
              <SelectItem value="specialist_care">Specialist Care</SelectItem>
              <SelectItem value="emergency">Emergency</SelectItem>
              <SelectItem value="follow_up">Follow-up</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="medical_history">Relevant Medical History</Label>
          <Textarea
            id="medical_history"
            value={customFields.medical_history || ''}
            onChange={(e) => onFieldChange('medical_history', e.target.value)}
            placeholder="Brief medical history..."
            rows={3}
          />
        </div>
      </div>
    </div>
  );

  const renderLegalServicesFields = () => (
    <div className="space-y-4 p-4 bg-muted/20 rounded-lg">
      <h3 className="font-semibold text-lg">Legal Services Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="case_type">Case Type</Label>
          <Select value={customFields.case_type || ''} onValueChange={(value) => onFieldChange('case_type', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select case type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="family_law">Family Law</SelectItem>
              <SelectItem value="corporate">Corporate</SelectItem>
              <SelectItem value="criminal">Criminal</SelectItem>
              <SelectItem value="real_estate_law">Real Estate Law</SelectItem>
              <SelectItem value="personal_injury">Personal Injury</SelectItem>
              <SelectItem value="bankruptcy">Bankruptcy</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="court_date">Next Court Date</Label>
          <Input
            id="court_date"
            type="date"
            value={customFields.court_date || ''}
            onChange={(e) => onFieldChange('court_date', e.target.value)}
          />
        </div>
        <div className="col-span-full space-y-2">
          <Label htmlFor="case_notes">Case Notes</Label>
          <Textarea
            id="case_notes"
            value={customFields.case_notes || ''}
            onChange={(e) => onFieldChange('case_notes', e.target.value)}
            placeholder="Brief case description and important notes..."
            rows={4}
          />
        </div>
      </div>
    </div>
  );

  const renderHomeServicesFields = () => (
    <div className="space-y-4 p-4 bg-muted/20 rounded-lg">
      <h3 className="font-semibold text-lg">Home Services Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="job_type">Job Type</Label>
          <Select value={customFields.job_type || ''} onValueChange={(value) => onFieldChange('job_type', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select job type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="plumbing">Plumbing</SelectItem>
              <SelectItem value="electrical">Electrical</SelectItem>
              <SelectItem value="hvac">HVAC</SelectItem>
              <SelectItem value="roofing">Roofing</SelectItem>
              <SelectItem value="landscaping">Landscaping</SelectItem>
              <SelectItem value="painting">Painting</SelectItem>
              <SelectItem value="cleaning">Cleaning</SelectItem>
              <SelectItem value="renovation">Renovation</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="service_date">Preferred Service Date</Label>
          <Input
            id="service_date"
            type="date"
            value={customFields.service_date || ''}
            onChange={(e) => onFieldChange('service_date', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="estimated_cost">Estimated Cost ($)</Label>
          <Input
            id="estimated_cost"
            type="number"
            value={customFields.estimated_cost || ''}
            onChange={(e) => onFieldChange('estimated_cost', parseFloat(e.target.value))}
            placeholder="500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="urgency">Urgency Level</Label>
          <Select value={customFields.urgency || ''} onValueChange={(value) => onFieldChange('urgency', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select urgency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="emergency">Emergency</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-full space-y-2">
          <Label htmlFor="service_description">Service Description</Label>
          <Textarea
            id="service_description"
            value={customFields.service_description || ''}
            onChange={(e) => onFieldChange('service_description', e.target.value)}
            placeholder="Describe the service needed..."
            rows={3}
          />
        </div>
      </div>
    </div>
  );

  const renderConsultingFields = () => (
    <div className="space-y-4 p-4 bg-muted/20 rounded-lg">
      <h3 className="font-semibold text-lg">Consulting Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="project_name">Project Name</Label>
          <Input
            id="project_name"
            value={customFields.project_name || ''}
            onChange={(e) => onFieldChange('project_name', e.target.value)}
            placeholder="Digital Transformation Initiative"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="proposal_due_date">Proposal Due Date</Label>
          <Input
            id="proposal_due_date"
            type="date"
            value={customFields.proposal_due_date || ''}
            onChange={(e) => onFieldChange('proposal_due_date', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="retainer_amount">Retainer Amount ($)</Label>
          <Input
            id="retainer_amount"
            type="number"
            value={customFields.retainer_amount || ''}
            onChange={(e) => onFieldChange('retainer_amount', parseFloat(e.target.value))}
            placeholder="5000"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="consulting_type">Consulting Type</Label>
          <Select value={customFields.consulting_type || ''} onValueChange={(value) => onFieldChange('consulting_type', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="strategy">Strategy</SelectItem>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="operations">Operations</SelectItem>
              <SelectItem value="hr">Human Resources</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-full space-y-2">
          <Label htmlFor="project_scope">Project Scope</Label>
          <Textarea
            id="project_scope"
            value={customFields.project_scope || ''}
            onChange={(e) => onFieldChange('project_scope', e.target.value)}
            placeholder="Describe the project scope and objectives..."
            rows={4}
          />
        </div>
      </div>
    </div>
  );

  const renderRestaurantFields = () => (
    <div className="space-y-4 p-4 bg-muted/20 rounded-lg">
      <h3 className="font-semibold text-lg">Restaurant Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="reservation_date">Reservation Date</Label>
          <Input
            id="reservation_date"
            type="datetime-local"
            value={customFields.reservation_date || ''}
            onChange={(e) => onFieldChange('reservation_date', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="party_size">Party Size</Label>
          <Input
            id="party_size"
            type="number"
            value={customFields.party_size || ''}
            onChange={(e) => onFieldChange('party_size', parseInt(e.target.value))}
            placeholder="4"
            min="1"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="seating_preference">Seating Preference</Label>
          <Select value={customFields.seating_preference || ''} onValueChange={(value) => onFieldChange('seating_preference', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select preference" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="indoor">Indoor</SelectItem>
              <SelectItem value="outdoor">Outdoor</SelectItem>
              <SelectItem value="bar">Bar</SelectItem>
              <SelectItem value="private_room">Private Room</SelectItem>
              <SelectItem value="no_preference">No Preference</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="occasion">Occasion</Label>
          <Select value={customFields.occasion || ''} onValueChange={(value) => onFieldChange('occasion', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select occasion" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="birthday">Birthday</SelectItem>
              <SelectItem value="anniversary">Anniversary</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="date_night">Date Night</SelectItem>
              <SelectItem value="celebration">Celebration</SelectItem>
              <SelectItem value="casual">Casual</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-full space-y-2">
          <Label htmlFor="dietary_preferences">Dietary Preferences</Label>
          <Textarea
            id="dietary_preferences"
            value={customFields.dietary_preferences || ''}
            onChange={(e) => onFieldChange('dietary_preferences', e.target.value)}
            placeholder="Any allergies, dietary restrictions, or special requests..."
            rows={3}
          />
        </div>
      </div>
    </div>
  );

  const renderIndustryForm = () => {
    switch (industry) {
      case 'real_estate':
        return renderRealEstateFields();
      case 'property_management':
        return renderPropertyManagementFields();
      case 'healthcare':
        return renderHealthcareFields();
      case 'legal_services':
        return renderLegalServicesFields();
      case 'home_services':
        return renderHomeServicesFields();
      case 'consulting':
        return renderConsultingFields();
      case 'restaurants':
        return renderRestaurantFields();
      default:
        return null;
    }
  };

  return renderIndustryForm();
};