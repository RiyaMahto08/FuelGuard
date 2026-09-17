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

export default function VerificationStatusScreen() {
  const router = useRouter();
  const { applications, selectedApplicationId, setSelectedApplicationId, setSelectedCertificateId } = useApp();

  const currentApp = applications.find(a => a.id === selectedApplicationId) || applications[0];

  const timelineSteps = [
    {
      title: 'Application Submitted',
      subtitle: `Filed by Riya (${currentApp.equipmentName})`,
      date: '12 Sep 2026, 10:30 AM',
      status: 'completed',
      icon: 'checkmark-circle' as const,
    },
    {
      title: 'Documents Verified',
      subtitle: 'Calibration logs & test reports scrutinized',
      date: '14 Sep 2026, 02:15 PM',
      status: 'completed',
      icon: 'checkmark-circle' as const,
    },
    {
      title: 'Verification Scheduled',
      subtitle: `Assigned to Field Officer Harshit`,
      date: currentApp.scheduledDate || '20 Sep 2026, 11:00 AM',
      status: 'current',
      icon: 'calendar' as const,
    },
    {
      title: 'Field Verification',
      subtitle: 'On-site sensor calibration & flowmeter audit',
      date: 'Pending Inspection',
      status: 'pending',
      icon: 'ellipse-outline' as const,
    },
    {
      title: 'Certificate Generated',
      subtitle: 'Digital Certificate FG/CERT/2026/00841',
      date: 'Pending Approval',
      status: 'pending',
      icon: 'ribbon-outline' as const,
    },
  ];

  return (
    <View style={styles.screen}>
      <Header
        title="Verification Status"
        subtitle="Official statutory inspection & certification tracker"
        showBack
      />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Application Summary Card */}
        <Card style={styles.summaryCard} accentColor={Colors.brandBlue}>
          <View style={styles.summaryHeader}>
            <View>
              <Text style={styles.appIdLabel}>APPLICATION ID</Text>
              <Text style={styles.appIdValue}>{currentApp.id}</Text>
            </View>
            <Badge label="Verification Scheduled" variant="Inspection Scheduled" />
          </View>

          <View style={styles.divider} />

          {/* Key Stakeholders & Equipment Grid */}
          <View style={styles.metaGrid}>
            <View style={styles.metaCol}>
              <Text style={styles.metaLabel}>Industry User</Text>
              <View style={styles.metaValRow}>
                <Ionicons name="person" size={14} color={Colors.brandBlue} />
                <Text style={styles.metaValText}>Riya (ABC Fuel Station)</Text>
              </View>
            </View>

            <View style={styles.metaCol}>
              <Text style={styles.metaLabel}>Assigned Officer</Text>
              <View style={styles.metaValRow}>
                <Ionicons name="shield-checkmark" size={14} color="#059669" />
                <Text style={styles.metaValText}>Harshit (Field Officer)</Text>
              </View>
            </View>
          </View>

          <View style={styles.metaGrid}>
            <View style={styles.metaCol}>
              <Text style={styles.metaLabel}>Equipment</Text>
              <Text style={styles.metaValTextBold}>{currentApp.equipmentName}</Text>
              <Text style={styles.metaSubId}>ID: {currentApp.equipmentId}</Text>
            </View>

            <View style={styles.metaCol}>
              <Text style={styles.metaLabel}>Scheduled Date</Text>
              <View style={styles.metaValRow}>
                <Ionicons name="calendar" size={14} color={Colors.brandBlue} />
                <Text style={styles.metaValTextBold}>
                  {currentApp.scheduledDate || '20 September 2026'}
                </Text>
              </View>
            </View>
          </View>
        </Card>

        {/* ================= TIMELINE SECTION ================= */}
        <Card style={styles.timelineCard}>
          <View style={styles.timelineHeader}>
            <Ionicons name="git-commit-outline" size={18} color={Colors.brandBlue} />
            <Text style={styles.timelineCardTitle}>Statutory Verification Workflow</Text>
          </View>

          <View style={styles.timelineContainer}>
            {timelineSteps.map((step, index) => {
              const isLast = index === timelineSteps.length - 1;
              const isCompleted = step.status === 'completed';
              const isCurrent = step.status === 'current';

              return (
                <View key={index} style={styles.timelineRow}>
                  {/* Left Column: Icons & Connecting Bar */}
                  <View style={styles.timelineLeftCol}>
                    <View
                      style={[
                        styles.stepBadgeCircle,
                        isCompleted && styles.stepCompletedBadge,
                        isCurrent && styles.stepCurrentBadge,
                      ]}
                    >
                      {isCompleted ? (
                        <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                      ) : isCurrent ? (
                        <View style={styles.pulsingDot} />
                      ) : (
                        <View style={styles.pendingDot} />
                      )}
                    </View>
                    {!isLast && (
                      <View
                        style={[
                          styles.timelineLine,
                          {
                            backgroundColor: isCompleted ? '#10B981' : '#E2E8F0',
                          },
                        ]}
                      />
                    )}
                  </View>

                  {/* Right Column: Step Content */}
                  <View style={styles.timelineRightCol}>
                    <View style={styles.stepTitleRow}>
                      <Text
                        style={[
                          styles.stepTitle,
                          isCompleted && { color: Colors.textPrimary },
                          isCurrent && { color: Colors.brandBlue, fontWeight: '800' },
                        ]}
                      >
                        {isCompleted ? `✓ ${step.title}` : isCurrent ? `● ${step.title}` : `○ ${step.title}`}
                      </Text>
                      <Text style={styles.stepDate}>{step.date}</Text>
                    </View>

                    <Text style={styles.stepSubtitle}>{step.subtitle}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </Card>

        {/* Assigned Officer Contact & Audit Bay Card */}
        <Card style={styles.officerCard} accentColor="#059669">
          <View style={styles.officerHeader}>
            <View style={styles.officerAvatar}>
              <Text style={styles.officerAvatarText}>H</Text>
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.officerName}>Harshit</Text>
              <Text style={styles.officerRole}>Assigned Legal Metrology Field Officer</Text>
              <Text style={styles.officerBadgeText}>Government of India • PESO Reg: LM-2026-9901</Text>
            </View>
          </View>
        </Card>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <Button
            title="View Verification Details"
            onPress={() => router.push('/verification-details')}
            variant="primary"
            size="lg"
            icon="document-text-outline"
            fullWidth
            style={{ marginBottom: 10 }}
          />

          <Button
            title="Digital Certificate Preview"
            onPress={() => router.push('/certificate')}
            variant="success"
            size="lg"
            icon="ribbon-outline"
            fullWidth
          />
        </View>
      </ScrollView>

      <BottomNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContainer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: 40,
  },
  summaryCard: {
    marginBottom: Spacing.md,
  },
  summaryHeader: {
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
  metaGrid: {
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
  metaValRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  metaValText: {
    fontSize: 12,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  metaValTextBold: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  metaSubId: {
    fontSize: 10,
    color: Colors.textMuted,
    fontWeight: '600',
  },
  timelineCard: {
    marginBottom: Spacing.md,
  },
  timelineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 10,
    marginBottom: Spacing.md,
  },
  timelineCardTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  timelineContainer: {
    paddingLeft: 4,
  },
  timelineRow: {
    flexDirection: 'row',
    minHeight: 58,
  },
  timelineLeftCol: {
    alignItems: 'center',
    width: 28,
    marginRight: 10,
  },
  stepBadgeCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCompletedBadge: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  stepCurrentBadge: {
    backgroundColor: '#EFF6FF',
    borderColor: Colors.brandBlue,
    borderWidth: 2,
  },
  pulsingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.brandBlue,
  },
  pendingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#CBD5E1',
  },
  timelineLine: {
    width: 2,
    flex: 1,
    marginVertical: 4,
  },
  timelineRightCol: {
    flex: 1,
    paddingBottom: 14,
  },
  stepTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  stepDate: {
    fontSize: 10,
    color: Colors.textMuted,
  },
  stepSubtitle: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  officerCard: {
    backgroundColor: '#F0FDF4',
    borderColor: '#BBF7D0',
    marginBottom: Spacing.lg,
  },
  officerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  officerAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#059669',
    justifyContent: 'center',
    alignItems: 'center',
  },
  officerAvatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
  },
  officerName: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  officerRole: {
    fontSize: 11,
    fontWeight: '600',
    color: '#047857',
  },
  officerBadgeText: {
    fontSize: 10,
    color: Colors.textMuted,
    marginTop: 2,
  },
  actionsContainer: {
    marginBottom: Spacing.xxl,
  },
});
