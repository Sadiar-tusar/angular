export class HealthInsurancePolicy {
  policyId !: string;
  policyHolderName !: string;
  age !: number;
  gender !: 'Male' | 'Female' | 'Other';
  policyType !: string; // e.g., "Individual", "Family Floater"
  sumInsured !: number;
  premiumAmount !: number;
  policyStartDate !: Date;
  policyEndDate !: Date;
  preExistingDiseases !: string[];
  hospitalNetwork !: string[]; // list of approved hospitals
  coverageDetails !: CoverageDetails;
  exclusions !: string[];
  nomineeName !: string;
  nomineeRelation !: string;
  contactNumber !: string;
  email !: string;
  address !: string;
}

export interface CoverageDetails {
  hospitalization: boolean;
  preHospitalizationDays: number;
  postHospitalizationDays: number;
  maternityCoverage: boolean;
  ambulanceChargesCovered: boolean;
  criticalIllnessCoverage: boolean;
  covidCoverage: boolean;
  annualHealthCheckup: boolean;
}
