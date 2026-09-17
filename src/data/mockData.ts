export interface FuelTank {
  id: string;
  name: string;
  fuelType: 'Diesel' | 'Petrol (MS 95)' | 'Ethanol Blend (E20)' | 'CNG';
  currentLevelLiters: number;
  totalCapacityLiters: number;
  qualityScore: number;
  status: 'Good' | 'Optimal' | 'Inspection Due';
  equipmentStatus: 'VERIFIED' | 'CALIBRATED' | 'AUDIT DUE';
  complianceScore: number;
  lastUpdated: string;
  parameters: {
    density: string;
    densityStandard: string;
    waterContent: string;
    waterLimit: string;
    purity: string;
    temperature: string;
    dispenserPressure: string;
    flowRate: string;
  };
}

export interface Equipment {
  id: string;
  name: string;
  type: string;
  manufacturer: string;
  modelNumber: string;
  serialNumber: string;
  fuelType: string;
  capacity: string;
  location: string;
  dateOfInstallation?: string;
  lastVerificationDate?: string;
  status: 'Compliant' | 'Verification Due' | 'Under Inspection' | 'VERIFIED';
  qrCode?: string;
}

export type ApplicationStatusType =
  | 'Application Submitted'
  | 'Documents Verified'
  | 'Verification Scheduled'
  | 'Field Verification'
  | 'Certificate Generated';

export interface TimelineStep {
  title: string;
  subtitle: string;
  date: string;
  status: 'completed' | 'in-progress' | 'pending';
  icon: string;
  details?: string;
}

export interface Application {
  id: string;
  equipmentId: string;
  equipmentName: string;
  fuelType: string;
  verificationType: 'Initial Verification' | 'Re-verification';
  preferredDate: string;
  submissionDate: string;
  currentStatus: ApplicationStatusType;
  industryUser: string;
  assignedOfficer: string;
  scheduledDate: string;
  operatingPressure: string;
  operatingTemperature: string;
  documents: Array<{ name: string; size: string; status: 'verified' | 'uploaded' }>;
  timeline: TimelineStep[];
  certificateId: string;
}

export interface DigitalCertificate {
  certificateNumber: string;
  applicationId: string;
  equipmentId: string;
  equipmentName: string;
  equipmentType: string;
  fuelType: string;
  verifiedQuantity: string;
  qualityScore: string;
  verificationStatus: 'VERIFIED' | 'PROVISIONAL' | 'EXPIRED';
  verifiedBy: string;
  validUntil: string;
  verificationDate: string;
  location: string;
  blockchainHash: string;
  qrPayload: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  subtitle: string;
  timestamp: string;
  type: 'quality' | 'equipment' | 'application' | 'compliance';
  status: 'verified' | 'pending' | 'success';
}

export const USER_PROFILE = {
  name: 'Riya',
  fullName: 'Riya',
  organizationName: 'ABC Fuel Station',
  unitCode: 'ABC-FS-DELHI-01',
  authorizedOfficer: 'Riya',
  designation: 'Station Manager & Fuel Quality Officer',
  email: 'riya@fuelguard.gov.in',
  phone: '+91 98100 45210',
  plantLocation: 'ABC Fuel Station, Mathura Road, New Delhi',
  licenseNo: 'IND-PESO-DL-2024-88219'
};

export const INITIAL_FUEL_TANKS: FuelTank[] = [
  {
    id: 'tank-01',
    name: 'Tank-01',
    fuelType: 'Diesel',
    currentLevelLiters: 8420,
    totalCapacityLiters: 10000,
    qualityScore: 98.4,
    status: 'Good',
    equipmentStatus: 'VERIFIED',
    complianceScore: 92,
    lastUpdated: 'Just now',
    parameters: {
      density: '0.832 kg/L',
      densityStandard: '0.820 - 0.845 kg/L (IS 1460)',
      waterContent: '0.02%',
      waterLimit: '< 0.05% max',
      purity: '98.4%',
      temperature: '24.2 °C',
      dispenserPressure: '3.4 Bar',
      flowRate: '42.5 L/min'
    }
  },
  {
    id: 'tank-02',
    name: 'Tank-02',
    fuelType: 'Petrol (MS 95)',
    currentLevelLiters: 6250,
    totalCapacityLiters: 10000,
    qualityScore: 99.1,
    status: 'Optimal',
    equipmentStatus: 'VERIFIED',
    complianceScore: 96,
    lastUpdated: '2 mins ago',
    parameters: {
      density: '0.742 kg/L',
      densityStandard: '0.720 - 0.775 kg/L (IS 2796)',
      waterContent: '0.01%',
      waterLimit: '< 0.05% max',
      purity: '99.1%',
      temperature: '22.8 °C',
      dispenserPressure: '3.2 Bar',
      flowRate: '38.0 L/min'
    }
  }
];

export const INITIAL_EQUIPMENT: Equipment[] = [
  {
    id: 'FG-2026-001',
    name: 'Wayne Century Fuel Dispensing Unit',
    type: 'Fuel Dispensing Unit',
    manufacturer: 'Dover Fueling Solutions',
    modelNumber: 'DFS-WAYNE-500',
    serialNumber: 'SN-2026-8841',
    fuelType: 'Diesel',
    capacity: '10,000 L',
    location: 'ABC Fuel Station, Bay 1',
    dateOfInstallation: '12 January 2024',
    lastVerificationDate: '20 September 2026',
    status: 'VERIFIED',
    qrCode: 'FG-QR-2026-001',
  },
  {
    id: 'FG-2026-002',
    name: 'Underground Bulk Storage Tank-01',
    type: 'Bulk Storage Tank',
    manufacturer: 'Larsen & Toubro Heavy Eng.',
    modelNumber: 'LT-HST-10000',
    serialNumber: 'FG-SN-8842-LT',
    fuelType: 'Diesel',
    capacity: '10,000 L',
    location: 'ABC Fuel Station, Underground Tank Bay 1',
    dateOfInstallation: '18 April 2022',
    lastVerificationDate: '20 September 2026',
    status: 'VERIFIED',
    qrCode: 'FG-QR-2026-002',
  },
  {
    id: 'FG-2026-003',
    name: 'Digital Coriolis Mass Flowmeter Terminal',
    type: 'Digital Flowmeter',
    manufacturer: 'Endress+Hauser India',
    modelNumber: 'PROMASS-800',
    serialNumber: 'FG-SN-8812-EH',
    fuelType: 'Diesel / Petrol',
    capacity: '120 L/min',
    location: 'ABC Fuel Station, Island 2',
    dateOfInstallation: '20 January 2023',
    lastVerificationDate: '15 August 2026',
    status: 'Compliant',
    qrCode: 'FG-QR-2026-003',
  }
];

export const INITIAL_APPLICATIONS: Application[] = [
  {
    id: 'FG-VER-00841',
    equipmentId: 'FG-2026-001',
    equipmentName: 'Fuel Dispensing Unit',
    fuelType: 'Diesel',
    verificationType: 'Initial Verification',
    preferredDate: '20 September 2026',
    submissionDate: '12 September 2026',
    currentStatus: 'Verification Scheduled',
    industryUser: 'Riya',
    assignedOfficer: 'Harshit',
    scheduledDate: '20 September 2026, 11:00 AM',
    operatingPressure: '3.4 Bar',
    operatingTemperature: '24.2 °C',
    documents: [
      { name: 'Hydrostatic_Pressure_Test_Report.pdf', size: '2.4 MB', status: 'verified' },
      { name: 'Flowmeter_Calibration_Log.pdf', size: '1.8 MB', status: 'verified' },
      { name: 'PESO_Installation_Clearance.pdf', size: '3.6 MB', status: 'verified' }
    ],
    timeline: [
      {
        title: 'Application Submitted',
        subtitle: 'Digital application received from Riya (ABC Fuel Station)',
        date: '12 Sep 2026, 10:30 AM',
        status: 'completed',
        icon: 'checkmark-circle',
        details: 'Initial verification request filed for Fuel Dispensing Unit (FG-2026-001).'
      },
      {
        title: 'Documents Verified',
        subtitle: 'Statutory test logs & calibration certs verified',
        date: '14 Sep 2026, 02:15 PM',
        status: 'completed',
        icon: 'checkmark-circle',
        details: 'Hydrostatic integrity & metrology stamps cleared by compliance desk.'
      },
      {
        title: 'Verification Scheduled',
        subtitle: 'Assigned to Field Officer Harshit',
        date: '16 Sep 2026, 11:00 AM',
        status: 'in-progress',
        icon: 'calendar',
        details: 'On-site audit confirmed for 20 September 2026 at ABC Fuel Station.'
      },
      {
        title: 'Field Verification',
        subtitle: 'Physical dispensing flow & sensor audit',
        date: '20 Sep 2026',
        status: 'pending',
        icon: 'shield-checkmark',
        details: 'Volumetric accuracy & density sensors to be tested on site.'
      },
      {
        title: 'Certificate Generated',
        subtitle: 'Official digital certificate generation',
        date: 'Pending',
        status: 'pending',
        icon: 'ribbon',
        details: 'Certificate FG/CERT/2026/00841 issued upon final approval.'
      }
    ],
    certificateId: 'FG/CERT/2026/00841'
  }
];

export const INITIAL_CERTIFICATES: DigitalCertificate[] = [
  {
    certificateNumber: 'FG/CERT/2026/00841',
    applicationId: 'FG-VER-00841',
    equipmentId: 'FG-2026-001',
    equipmentName: 'Fuel Dispensing Unit',
    equipmentType: 'Fuel Dispensing Unit',
    fuelType: 'Diesel',
    verifiedQuantity: '8,420 L',
    qualityScore: '98.4%',
    verificationStatus: 'VERIFIED',
    verifiedBy: 'Harshit',
    validUntil: '20 September 2027',
    verificationDate: '20 September 2026',
    location: 'ABC Fuel Station',
    blockchainHash: '0x8f3c4e1b7a9d0265bb6291a457fe8901c3de76428135bc841029e0018f4ad923',
    qrPayload: 'https://fuelguard.gov.in/verify/FG/CERT/2026/00841'
  }
];

export const RECENT_ACTIVITIES: ActivityItem[] = [
  {
    id: 'act-1',
    title: 'Fuel Quality Check',
    subtitle: 'Tank-01 Diesel density (0.832 kg/L) verified compliant with IS 1460 standards.',
    timestamp: '10 mins ago',
    type: 'quality',
    status: 'verified'
  },
  {
    id: 'act-2',
    title: 'Equipment Verified',
    subtitle: 'Fuel Dispensing Unit (FG-2026-001) verified by Field Officer Harshit.',
    timestamp: '2 hours ago',
    type: 'equipment',
    status: 'verified'
  },
  {
    id: 'act-3',
    title: 'Verification Application Submitted',
    subtitle: 'Application FG-VER-00841 filed by Riya for ABC Fuel Station.',
    timestamp: 'Yesterday, 04:30 PM',
    type: 'application',
    status: 'success'
  }
];

export const EQUIPMENT_TYPES = [
  'Fuel Dispensing Unit',
  'Bulk Storage Tank',
  'Digital Flowmeter',
  'Underground PNG Terminal',
  'High-Pressure Steam Boiler',
  'Industrial CNG Dispenser'
];

export const FUEL_TYPES = [
  'Diesel',
  'Petrol (MS 95)',
  'Ethanol Blend (E20)',
  'CNG (Compressed Natural Gas)',
  'LPG (Liquefied Petroleum Gas)'
];

export const VERIFICATION_TYPES = [
  'Initial Verification',
  'Re-verification'
];

export interface StateFuelPrice {
  id: string;
  state: string;
  stateCode: string;
  capitalCity: string;
  petrolPrice: number;
  petrolChange: number;
  dieselPrice: number;
  dieselChange: number;
  cngPrice: number;
  vatRatePetrol: string;
  vatRateDiesel: string;
  lastUpdated: string;
  trend: 'stable' | 'up' | 'down';
  notes: string;
  isLowestPetrol?: boolean;
  isLowestDiesel?: boolean;
}

export const STATE_FUEL_PRICES: StateFuelPrice[] = [
  {
    id: 'delhi',
    state: 'New Delhi',
    stateCode: 'DL',
    capitalCity: 'National Capital Territory',
    petrolPrice: 94.72,
    petrolChange: 0.0,
    dieselPrice: 87.62,
    dieselChange: 0.0,
    cngPrice: 75.09,
    vatRatePetrol: '19.40%',
    vatRateDiesel: '16.75%',
    lastUpdated: 'Today, 06:00 AM IST',
    trend: 'stable',
    notes: 'Lowest Diesel rate across Delhi-NCR hub',
    isLowestDiesel: true,
  },
  {
    id: 'haryana',
    state: 'Haryana',
    stateCode: 'HR',
    capitalCity: 'Gurugram / Faridabad',
    petrolPrice: 95.28,
    petrolChange: 0.0,
    dieselPrice: 88.15,
    dieselChange: 0.0,
    cngPrice: 82.50,
    vatRatePetrol: '18.20%',
    vatRateDiesel: '16.00%',
    lastUpdated: 'Today, 06:00 AM IST',
    trend: 'stable',
    notes: 'Commercial fleet tax benefit in border zones',
  },
  {
    id: 'up',
    state: 'Uttar Pradesh (UP)',
    stateCode: 'UP',
    capitalCity: 'Noida / Ghaziabad',
    petrolPrice: 94.66,
    petrolChange: 0.0,
    dieselPrice: 87.79,
    dieselChange: 0.0,
    cngPrice: 86.20,
    vatRatePetrol: '19.36%',
    vatRateDiesel: '17.08%',
    lastUpdated: 'Today, 06:00 AM IST',
    trend: 'stable',
    notes: 'Lowest Petrol rate in Northern NCR region',
    isLowestPetrol: true,
  },
];
