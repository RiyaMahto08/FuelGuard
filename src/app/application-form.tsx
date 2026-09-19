import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, Shadows } from '@/constants/theme';
import { Header, BottomNavBar } from '@/components/Header';
import { Card, Button, InputField, SuccessModal, Badge } from '@/components/UIComponents';
import { useApp } from '@/context/AppContext';
import { VERIFICATION_TYPES } from '@/data/mockData';

export default function ApplicationFormScreen() {
  const router = useRouter();
  const { equipments, submitApplication, user } = useApp();

  const [selectedEqId, setSelectedEqId] = useState(equipments[0]?.id || 'FG-2026-001');
  const [verificationType, setVerificationType] = useState<'Initial Verification' | 'Re-verification'>('Initial Verification');
  const [preferredDate, setPreferredDate] = useState('20 September 2026');

  // Document Upload (UI Only)
  const [documents, setDocuments] = useState<Array<{ name: string; size: string; status: 'verified' | 'uploaded' }>>([
    { name: 'Hydrostatic_Pressure_Test_Report.pdf', size: '2.4 MB', status: 'verified' },
    { name: 'Flowmeter_Calibration_Log.pdf', size: '1.8 MB', status: 'verified' },
  ]);

  const [uploadingDoc, setUploadingDoc] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [generatedAppId, setGeneratedAppId] = useState('FG-VER-00841');

  const selectedEquipment = equipments.find((e) => e.id === selectedEqId) || equipments[0];

  const handleMockUpload = () => {
    setUploadingDoc(true);
    setTimeout(() => {
      setDocuments(prev => [
        ...prev,
        { name: 'PESO_Installation_Clearance.pdf', size: '3.6 MB', status: 'uploaded' }
      ]);
      setUploadingDoc(false);
    }, 500);
  };

  const handleRemoveDoc = (index: number) => {
    setDocuments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      const newApp = submitApplication({
        equipmentId: selectedEquipment.id,
        verificationType,
        preferredDate,
        documents,
      });

      setGeneratedAppId(newApp.id || 'FG-VER-00841');
      setLoading(false);
      setSuccessModalVisible(true);
    }, 600);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.screen}
    >
      <Header
        title="Apply for Verification"
        subtitle="Submit fuel dispensing & storage equipment for statutory audit"
        showBack
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Step 1: Equipment Details Card */}
        <Card style={styles.sectionCard}>
          <View style={styles.sectionTitleRow}>
            <View style={styles.sectionIconBadge}>
              <Ionicons name="server" size={16} color={Colors.brandBlue} />
            </View>
            <Text style={styles.sectionTitle}>1. Target Equipment Information</Text>
          </View>

          {/* Selected Equipment Display Box */}
          <View style={styles.eqInfoBox}>
            <View style={styles.eqInfoRow}>
              <Text style={styles.eqInfoLabel}>Equipment ID:</Text>
              <Text style={styles.eqInfoIdVal}>{selectedEquipment.id}</Text>
            </View>
            <View style={styles.eqInfoRow}>
              <Text style={styles.eqInfoLabel}>Equipment Name:</Text>
              <Text style={styles.eqInfoVal}>{selectedEquipment.name}</Text>
            </View>
            <View style={styles.eqInfoRow}>
              <Text style={styles.eqInfoLabel}>Fuel Type:</Text>
              <View style={styles.fuelBadge}>
                <Text style={styles.fuelBadgeText}>{selectedEquipment.fuelType || 'Diesel'}</Text>
              </View>
            </View>
            <View style={styles.eqInfoRow}>
              <Text style={styles.eqInfoLabel}>Location:</Text>
              <Text style={styles.eqInfoVal}>{selectedEquipment.location || 'ABC Fuel Station'}</Text>
            </View>
          </View>

          {/* Optional: Switch to another registered equipment */}
          {equipments.length > 1 && (
            <View style={styles.switcherRow}>
              <Text style={styles.switcherLabel}>Or select other asset:</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 6 }}>
                <View style={{ flexDirection: 'row', gap: 6 }}>
                  {equipments.map((eq) => (
                    <TouchableOpacity
                      key={eq.id}
                      onPress={() => setSelectedEqId(eq.id)}
                      style={[styles.eqMiniPill, selectedEqId === eq.id && styles.eqMiniPillActive]}
                    >
                      <Text style={[styles.eqMiniPillText, selectedEqId === eq.id && { color: '#FFFFFF' }]}>
                        {eq.id}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>
          )}
        </Card>

        {/* Step 2: Verification Type */}
        <Card style={styles.sectionCard}>
          <View style={styles.sectionTitleRow}>
            <View style={styles.sectionIconBadge}>
              <Ionicons name="shield-checkmark" size={16} color={Colors.accentTeal} />
            </View>
            <Text style={styles.sectionTitle}>2. Verification Type</Text>
          </View>

          <View style={styles.verTypeRow}>
            {VERIFICATION_TYPES.map((vType) => {
              const isSelected = verificationType === vType;
              return (
                <TouchableOpacity
                  key={vType}
                  onPress={() => setVerificationType(vType as any)}
                  style={[styles.verTypeOption, isSelected && styles.verTypeOptionSelected]}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={isSelected ? 'radio-button-on' : 'radio-button-off'}
                    size={18}
                    color={isSelected ? Colors.brandBlue : Colors.textMuted}
                  />
                  <Text style={[styles.verTypeText, isSelected && styles.verTypeTextSelected]}>
                    {vType}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <InputField
            label="Preferred Verification Date"
            value={preferredDate}
            onChangeText={setPreferredDate}
            placeholder="e.g. 20 September 2026"
            icon="calendar-outline"
            required
            helperText="Field officer inspection slot will be confirmed based on this date"
          />
        </Card>

        {/* Step 3: Document Upload (UI Only) */}
        <Card style={styles.sectionCard}>
          <View style={styles.sectionTitleRow}>
            <View style={styles.sectionIconBadge}>
              <Ionicons name="cloud-upload" size={16} color="#6366F1" />
            </View>
            <Text style={styles.sectionTitle}>3. Statutory Document Upload</Text>
          </View>

          <Text style={styles.fieldLabel}>Attached Calibration & Inspection Reports:</Text>

          <View style={styles.docList}>
            {documents.map((doc, idx) => (
              <View key={idx} style={styles.docItem}>
                <View style={styles.docIconBg}>
                  <Ionicons name="document-text" size={18} color={Colors.brandBlue} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.docName} numberOfLines={1}>{doc.name}</Text>
                  <Text style={styles.docSize}>{doc.size} • Verified Format</Text>
                </View>
                <Badge label="Ready" variant="Approved" size="sm" />
                <TouchableOpacity
                  onPress={() => handleRemoveDoc(idx)}
                  style={{ padding: 4, marginLeft: 6 }}
                >
                  <Ionicons name="close-circle" size={18} color={Colors.textMuted} />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={styles.uploadBox}
            onPress={handleMockUpload}
            activeOpacity={0.7}
          >
            <Ionicons
              name={uploadingDoc ? 'hourglass' : 'cloud-upload-outline'}
              size={22}
              color={Colors.brandBlue}
            />
            <Text style={styles.uploadBoxText}>
              {uploadingDoc ? 'Attaching document...' : '+ Upload Additional Test Certificate (PDF)'}
            </Text>
          </TouchableOpacity>
        </Card>

        {/* Submit Application Button */}
        <Button
          title="Submit Application"
          onPress={handleSubmit}
          variant="primary"
          size="lg"
          loading={loading}
          icon="checkmark-done-circle-outline"
          fullWidth
          style={{ marginBottom: 20 }}
        />
      </ScrollView>

      {/* Success Modal */}
      <SuccessModal
        visible={successModalVisible}
        title="Application Submitted!"
        subtitle="Your verification request has been queued and assigned to Legal Metrology Field Officer Harshit."
        referenceIdLabel="Generated Application ID"
        referenceId={generatedAppId}
        primaryButtonText="View Verification Status & Timeline"
        onPrimaryAction={() => {
          setSuccessModalVisible(false);
          router.push('/application-status');
        }}
        secondaryButtonText="Return to Dashboard"
        onSecondaryAction={() => {
          setSuccessModalVisible(false);
          router.push('/dashboard');
        }}
        additionalDetails={[
          { label: 'Equipment ID', value: selectedEquipment.id },
          { label: 'Equipment Name', value: selectedEquipment.name },
          { label: 'Verification Type', value: verificationType },
          { label: 'Assigned Officer', value: 'Harshit (Legal Metrology Inspector)' },
        ]}
      />

      <BottomNavBar />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    height: '100%',
    backgroundColor: '#F8FAFC',
    overflow: 'hidden',
  },
  scrollContainer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: 90,
  },
  sectionCard: {
    marginBottom: Spacing.md,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 8,
  },
  sectionIconBadge: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  eqInfoBox: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: Spacing.md,
    gap: 8,
  },
  eqInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eqInfoLabel: {
    fontSize: 12,
    color: Colors.textMuted,
    fontWeight: '600',
  },
  eqInfoIdVal: {
    fontSize: 14,
    fontWeight: '900',
    color: Colors.brandBlue,
  },
  eqInfoVal: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textPrimary,
    maxWidth: '65%',
    textAlign: 'right',
  },
  fuelBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  fuelBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.brandBlue,
  },
  switcherRow: {
    marginTop: 10,
  },
  switcherLabel: {
    fontSize: 11,
    color: Colors.textMuted,
    fontWeight: '600',
  },
  eqMiniPill: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  eqMiniPillActive: {
    backgroundColor: Colors.brandBlue,
    borderColor: Colors.brandBlue,
  },
  eqMiniPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  verTypeRow: {
    gap: 8,
    marginBottom: Spacing.md,
  },
  verTypeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 12,
    gap: 10,
  },
  verTypeOptionSelected: {
    backgroundColor: '#EFF6FF',
    borderColor: Colors.brandBlue,
  },
  verTypeText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  verTypeTextSelected: {
    color: Colors.brandBlue,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  docList: {
    gap: 8,
    marginBottom: Spacing.md,
  },
  docItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 10,
    gap: 8,
  },
  docIconBg: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  docName: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  docSize: {
    fontSize: 10,
    color: Colors.textMuted,
    marginTop: 2,
  },
  uploadBox: {
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#93C5FD',
    backgroundColor: '#F0F7FF',
    borderRadius: 8,
    padding: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  uploadBoxText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.brandBlue,
  },
});
