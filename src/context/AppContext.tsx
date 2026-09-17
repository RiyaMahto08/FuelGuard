import React, { createContext, useContext, useState, ReactNode } from 'react';
import { 
  Equipment, 
  Application, 
  DigitalCertificate, 
  INITIAL_EQUIPMENT, 
  INITIAL_APPLICATIONS, 
  INITIAL_CERTIFICATES, 
  USER_PROFILE 
} from '@/data/mockData';

interface AppContextType {
  equipments: Equipment[];
  applications: Application[];
  certificates: DigitalCertificate[];
  selectedApplicationId: string;
  selectedCertificateId: string;
  isLoggedIn: boolean;
  user: typeof USER_PROFILE;
  unreadNotifications: number;
  
  // Actions
  login: () => void;
  logout: () => void;
  addEquipment: (equipmentData: Omit<Equipment, 'id' | 'qrCode' | 'status'>) => Equipment;
  submitApplication: (appData: {
    equipmentId: string;
    verificationType: 'Initial Verification' | 'Re-verification';
    preferredDate: string;
    documents: Array<{ name: string; size: string; status: 'verified' | 'uploaded' }>;
  }) => Application;
  setSelectedApplicationId: (id: string) => void;
  setSelectedCertificateId: (id: string) => void;
  getApplicationById: (id: string) => Application | undefined;
  getCertificateById: (id: string) => DigitalCertificate | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [equipments, setEquipments] = useState<Equipment[]>(INITIAL_EQUIPMENT);
  const [applications, setApplications] = useState<Application[]>(INITIAL_APPLICATIONS);
  const [certificates, setCertificates] = useState<DigitalCertificate[]>(INITIAL_CERTIFICATES);
  const [selectedApplicationId, setSelectedApplicationId] = useState<string>(INITIAL_APPLICATIONS[0].id);
  const [selectedCertificateId, setSelectedCertificateId] = useState<string>(INITIAL_CERTIFICATES[0].certificateNumber);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [unreadNotifications, setUnreadNotifications] = useState<number>(3);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  const addEquipment = (equipmentData: Omit<Equipment, 'id' | 'qrCode' | 'status'>): Equipment => {
    const nextNum = (equipments.length + 1).toString().padStart(3, '0');
    const newId = `FG-2026-${nextNum}`;
    const newEquipment: Equipment = {
      ...equipmentData,
      id: newId,
      status: 'VERIFIED',
      qrCode: `FG-QR-2026-${nextNum}`,
    };
    setEquipments(prev => [newEquipment, ...prev]);
    return newEquipment;
  };

  const submitApplication = (appData: {
    equipmentId: string;
    verificationType: 'Initial Verification' | 'Re-verification';
    preferredDate: string;
    documents: Array<{ name: string; size: string; status: 'verified' | 'uploaded' }>;
  }): Application => {
    const randomNum = Math.floor(100 + Math.random() * 900);
    const newAppId = `FG-VER-00${randomNum}`;
    const selectedEq = equipments.find(e => e.id === appData.equipmentId) || equipments[0];
    const certNumber = `FG/CERT/2026/00${randomNum}`;

    const newApplication: Application = {
      id: newAppId,
      equipmentId: appData.equipmentId,
      equipmentName: selectedEq.name,
      fuelType: selectedEq.fuelType || 'Diesel',
      verificationType: appData.verificationType,
      preferredDate: appData.preferredDate || '20 September 2026',
      submissionDate: '16 September 2026',
      currentStatus: 'Application Submitted',
      industryUser: USER_PROFILE.name,
      assignedOfficer: 'Harshit',
      scheduledDate: `${appData.preferredDate || '20 September 2026'}, 11:00 AM`,
      operatingPressure: '3.4 Bar',
      operatingTemperature: '24.2 °C',
      documents: appData.documents.length > 0 ? appData.documents : [
        { name: 'Hydrostatic_Pressure_Test_Report.pdf', size: '2.4 MB', status: 'verified' },
        { name: 'Flowmeter_Calibration_Log.pdf', size: '1.8 MB', status: 'verified' }
      ],
      timeline: [
        {
          title: 'Application Submitted',
          subtitle: `Digital application received from ${USER_PROFILE.name} (${USER_PROFILE.organizationName})`,
          date: '16 Sep 2026, 10:30 AM',
          status: 'completed',
          icon: 'checkmark-circle',
          details: `Application submitted for ${selectedEq.name} (${selectedEq.id}).`
        },
        {
          title: 'Documents Verified',
          subtitle: 'Technical scrutiny in progress',
          date: '16 Sep 2026',
          status: 'in-progress',
          icon: 'checkmark-circle',
          details: 'Desk audit of attached engineering drawings and test certificates.'
        },
        {
          title: 'Verification Scheduled',
          subtitle: 'Assigned to Field Officer Harshit',
          date: 'Pending',
          status: 'pending',
          icon: 'calendar',
        },
        {
          title: 'Field Verification',
          subtitle: 'On-site sensor calibration & volumetric check',
          date: 'Pending',
          status: 'pending',
          icon: 'shield-checkmark',
        },
        {
          title: 'Certificate Generated',
          subtitle: 'Official digital certificate generation',
          date: 'Pending',
          status: 'pending',
          icon: 'ribbon',
        }
      ],
      certificateId: certNumber
    };

    // Also prepare certificate mock entry
    const newCertificate: DigitalCertificate = {
      certificateNumber: certNumber,
      applicationId: newAppId,
      equipmentId: selectedEq.id,
      equipmentName: selectedEq.name,
      equipmentType: selectedEq.type,
      fuelType: selectedEq.fuelType || 'Diesel',
      verifiedQuantity: '8,420 L',
      qualityScore: '98.4%',
      verificationStatus: 'VERIFIED',
      verifiedBy: 'Harshit',
      validUntil: '20 September 2027',
      verificationDate: '20 September 2026',
      location: selectedEq.location || USER_PROFILE.plantLocation,
      blockchainHash: '0x8f3c4e1b7a9d0265bb6291a457fe8901c3de76428135bc841029e0018f4ad923',
      qrPayload: `https://fuelguard.gov.in/verify/${certNumber}`
    };

    setCertificates(prev => [newCertificate, ...prev]);
    setApplications(prev => [newApplication, ...prev]);
    setSelectedApplicationId(newAppId);
    setSelectedCertificateId(certNumber);
    return newApplication;
  };

  const getApplicationById = (id: string) => {
    return applications.find(a => a.id === id) || applications[0];
  };

  const getCertificateById = (id: string) => {
    return certificates.find(c => c.certificateNumber === id) || certificates[0];
  };

  return (
    <AppContext.Provider
      value={{
        equipments,
        applications,
        certificates,
        selectedApplicationId,
        selectedCertificateId,
        isLoggedIn,
        user: USER_PROFILE,
        unreadNotifications,
        login,
        logout,
        addEquipment,
        submitApplication,
        setSelectedApplicationId,
        setSelectedCertificateId,
        getApplicationById,
        getCertificateById,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
