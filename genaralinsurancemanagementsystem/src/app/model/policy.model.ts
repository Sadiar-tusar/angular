export class Policy{

     policyNumber !: string;
  policyType !: 'Health' | 'Car' | 'Fire' | 'Travel' | 'Marine';
  policyHolderId !: number;
  relatedAssetInfo?: string;
  coverageAmount !: number;
  premiumAmount !: number;
  premiumFrequency !: 'Monthly' | 'Quarterly' | 'Annually';
  startDate !: Date;
  endDate !: Date;
  status !: 'Active' | 'Expired' | 'Cancelled';
  inclusions !: string;
  exclusions !: string;
  beneficiary?: string;
  details?: string;
  hasPreviousClaims?: boolean;

}