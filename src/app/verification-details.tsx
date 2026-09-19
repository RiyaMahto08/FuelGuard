import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, Shadows } from '@/constants/theme';
import { Header, BottomNavBar } from '@/components/Header';
import { Card, Badge, Button, SectionHeader } from '@/components/UIComponents';
import { useApp } from '@/context/AppContext';

export default function VerificationDetailsScreen() {
  const router = useRouter();
  const { applications, selectedApplicationId } = useApp();

  const currentApp = applications.find(a => a.id === selectedApplicationId) || applications[0];

  const auditChecklist = [
    {
      item: 'Volumetric Flowmeter Calibration',
      standard: 'Legal Metrology (General) Rules, Schedule IX',
      status: 'VERIFIED (±0.03% deviation)',
      passed: true,
    },
    {
      item: 'Fuel Density & Temperature Compensation',
      standard: 'IS 1460 Standard (0.832 kg/L at 15°C)',
      status: 'VERIFIED (Compliant)',
      passed: true,
    },
    {
      item: 'Automated Tank Gauge (ATG) Accuracy',
      standard: 'Hydrostatic Probe Tolerance < 0.1%',
      status: 'VERIFIED (8,420 L calibrated)',
      passed: true,
    },
    {
      item: 'Emergency Solenoid Shut-Off Mechanism',
      standard: 'PESO Safety Code Rule 44',
      status: 'VERIFIED (180ms cutoff latency)',
      passed: true,
    },
  ];

  return (
    <View style={styles.screen}>
      <Header
        title="Verification Details"
        subtitle="Detailed statutory compliance & inspection findings"
        showBack
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Verification Overview Banner */}
        <Card style={styles.overviewCard} accentColor={Colors.brandBlue}>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.appIdLabel}>APPLICATION REFERENCE</Text>
              <Text style={styles.appIdValue}>{currentApp.id}</Text>
            </View>
            <Badge label="Verification Scheduled" variant="Approved" />
          </View>

          <View style={styles.divider} />

          <View style={styles.metaRow}>
            <View style={styles.metaCol}>
              <Text style={styles.metaLabel}>Equipment Name</Text>
              <Text style={styles.metaValueBold}>{currentApp.equipmentName}</Text>
              <Text style={styles.metaSubId}>Asset ID: {currentApp.equipmentId}</Text>
            </View>
            <View style={styles.metaCol}>
              <Text style={styles.metaLabel}>Fuel Type</Text>
              <Text style={styles.metaValueBold}>{currentApp.fuelType || 'Diesel'}</Text>
            </View>
          </View>

          <View style={styles.metaRow}>
            <View style={styles.metaCol}>
              <Text style={styles.metaLabel}>Industry User / Applicant</Text>
              <View style={styles.userRow}>
                <Ionicons name="person-circle" size={16} color={Colors.brandBlue} />
                <Text style={styles.metaValue}>Riya (ABC Fuel Station)</Text>
              </View>
            </View>
            <View style={styles.metaCol}>
              <Text style={styles.metaLabel}>Assigned Field Officer</Text>
              <View style={styles.userRow}>
                <Ionicons name="shield-checkmark" size={16} color="#059669" />
                <Text style={styles.metaValue}>Harshit (Legal Metrology)</Text>
              </View>
            </View>
          </View>
        </Card>

        {/* Section 1: Inspection & Calibration Checklist */}
        <SectionHeader
          title="On-Site Audit Protocol"
          subtitle="Legal Metrology & PESO statutory checklist"
        />

        <Card style={styles.checklistCard}>
          {auditChecklist.map((chk, index) => (
            <View
              key={index}
              style={[
                styles.checklistItem,
                index === auditChecklist.length - 1 && { borderBottomWidth: 0 },
              ]}
            >
              <View style={styles.checkIconCircle}>
                <Ionicons name="checkmark-done" size={16} color="#10B981" />
              </View>
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.checkItemName}>{chk.item}</Text>
                <Text style={styles.checkItemStandard}>{chk.standard}</Text>
                <Text style={styles.checkItemStatus}>{chk.status}</Text>
              </View>
            </View>
          ))}
        </Card>

        {/* Section 2: Attached Statutory Documents */}
        <SectionHeader
          title="Scrutinized Documents"
          subtitle="Pre-verified laboratory test logs & drawings"
        />

        <Card style={styles.docsCard}>
          {currentApp.documents.map((doc, idx) => (
            <View
              key={idx}
              style={[
                styles.docItemRow,
                idx === currentApp.documents.length - 1 && { borderBottomWidth: 0 },
              ]}
            >
              <View style={styles.docIconBg}>
                <Ionicons name="document-text" size={18} color={Colors.brandBlue} />
              </View>
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.docTitle}>{doc.name}</Text>
                <Text style={styles.docSub}>{doc.size} • Certified Stamped</Text>
              </View>
              <Badge label="Verified" variant="Approved" size="sm" />
            </View>
          ))}
        </Card>

        {/* Action Button: View Digital Certificate */}
        <Button
          title="View Digital Certificate"
          onPress={() => router.push('/certificate')}
          variant="success"
          size="lg"
          icon="ribbon-outline"
          fullWidth
          style={{ marginTop: 6, marginBottom: 24 }}
        />
      </ScrollView>

      <BottomNavBar />
    </View>
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
  overviewCard: {
    marginBottom: Spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  appIdLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.textMuted,
    letterSpacing: 0.5,
  },
  appIdValue: {
    fontSize: 18,
    fontWeight: '900',
    color: Colors.brandBlue,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 12,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 10,
  },
  metaCol: {
    flex: 1,
    gap: 2,
  },
  metaLabel: {
    fontSize: 10,
    color: Colors.textMuted,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  metaValueBold: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  metaSubId: {
    fontSize: 10,
    color: Colors.textMuted,
    fontWeight: '600',
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  metaValue: {
    fontSize: 12,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  checklistCard: {
    marginBottom: Spacing.md,
    padding: Spacing.md,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  checkIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  checkItemName: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  checkItemStandard: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 1,
  },
  checkItemStatus: {
    fontSize: 11,
    fontWeight: '700',
    color: '#059669',
    marginTop: 2,
  },
  docsCard: {
    marginBottom: Spacing.lg,
    padding: Spacing.md,
  },
  docItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  docIconBg: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  docTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  docSub: {
    fontSize: 10,
    color: Colors.textMuted,
    marginTop: 1,
  },
});
