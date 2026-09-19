import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, Shadows } from '@/constants/theme';
import { Header, BottomNavBar } from '@/components/Header';
import { Card, Badge, Button, SectionHeader } from '@/components/UIComponents';
import { useApp } from '@/context/AppContext';

interface TankData {
  id: string;
  name: string;
  fuelType: string;
  location: string;
  currentQuantity: number;
  capacity: number;
  fuelLevelPercent: number;
  dailyConsumption: number;
  qualityScore: number;
  qualityStatus: 'GOOD' | 'OPTIMAL' | 'ATTENTION';
  density: string;
  densityStatus: 'Normal' | 'Optimal' | 'High';
  waterContent: string;
  waterStatus: 'Normal' | 'Low' | 'Warning';
  purity: string;
  purityStatus: 'Good' | 'High' | 'Degraded';
  equipmentStatus: 'VERIFIED' | 'CALIBRATED' | 'AUDIT DUE';
  lastVerification: string;
  nextVerification: string;
  inspectorAuthority: string;
  sealNumber: string;
}

const TANKS_DATA: TankData[] = [
  {
    id: 'tank-01',
    name: 'Tank-01',
    fuelType: 'Diesel',
    location: 'ABC Fuel Station',
    currentQuantity: 8420,
    capacity: 10000,
    fuelLevelPercent: 84.2,
    dailyConsumption: 1580,
    qualityScore: 98.4,
    qualityStatus: 'GOOD',
    density: '0.832 kg/L',
    densityStatus: 'Normal',
    waterContent: '0.02%',
    waterStatus: 'Normal',
    purity: '98.4%',
    purityStatus: 'Good',
    equipmentStatus: 'VERIFIED',
    lastVerification: '20 September 2026',
    nextVerification: '20 September 2027',
    inspectorAuthority: 'Legal Metrology & PESO Certified',
    sealNumber: 'LM-PESO-2026-88910',
  },
  {
    id: 'tank-02',
    name: 'Tank-02',
    fuelType: 'Petrol (MS 95)',
    location: 'ABC Fuel Station',
    currentQuantity: 6250,
    capacity: 10000,
    fuelLevelPercent: 62.5,
    dailyConsumption: 1840,
    qualityScore: 99.1,
    qualityStatus: 'OPTIMAL',
    density: '0.742 kg/L',
    densityStatus: 'Normal',
    waterContent: '0.01%',
    waterStatus: 'Normal',
    purity: '99.1%',
    purityStatus: 'Good',
    equipmentStatus: 'VERIFIED',
    lastVerification: '15 August 2026',
    nextVerification: '15 August 2027',
    inspectorAuthority: 'Legal Metrology & PESO Certified',
    sealNumber: 'LM-PESO-2026-88412',
  },
];

export default function FuelMonitoringScreen() {
  const router = useRouter();
  const { user } = useApp();

  const [selectedTankIndex, setSelectedTankIndex] = useState(0);
  const [isAbnormalSimulated, setIsAbnormalSimulated] = useState(false);
  const [historyModalVisible, setHistoryModalVisible] = useState(false);

  const tank = TANKS_DATA[selectedTankIndex];

  return (
    <View style={styles.screen}>
      <Header
        title="Fuel Monitoring"
        subtitle="Real-time storage telemetry & quality surveillance"
        showBack
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* ================= UNIT SELECTION HEADER CARD ================= */}
        <Card style={styles.unitCard} accentColor={Colors.brandBlue}>
          <View style={styles.unitHeaderRow}>
            <View style={styles.unitIconCircle}>
              <MaterialCommunityIcons name="gas-cylinder" size={26} color={Colors.brandBlue} />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <View style={styles.unitTitleRow}>
                <Text style={styles.unitName}>{tank.name}</Text>
                <View style={styles.fuelTypePill}>
                  <Text style={styles.fuelTypeText}>{tank.fuelType}</Text>
                </View>
              </View>
              <View style={styles.locationRow}>
                <Ionicons name="location" size={13} color={Colors.textMuted} />
                <Text style={styles.locationText}>{tank.location}</Text>
              </View>
            </View>

            {/* Tank Switcher Quick Toggle */}
            <TouchableOpacity
              onPress={() => setSelectedTankIndex(selectedTankIndex === 0 ? 1 : 0)}
              style={styles.switchTankBtn}
              activeOpacity={0.7}
            >
              <Ionicons name="swap-horizontal" size={16} color={Colors.brandBlue} />
              <Text style={styles.switchTankText}>
                {selectedTankIndex === 0 ? 'Tank-02' : 'Tank-01'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Automatic Tank Gauge Telemetry Badge */}
          <View style={styles.prototypeNotice}>
            <Ionicons name="shield-checkmark-outline" size={13} color="#047857" />
            <Text style={styles.prototypeNoticeText}>
              Automatic Tank Gauge (ATG) & High-Precision Density Sensor Online
            </Text>
          </View>
        </Card>

        {/* ================= SECTION 1: FUEL QUANTITY ================= */}
        <SectionHeader
          title="Section 1 — Fuel Quantity"
          subtitle="Real-time capacitive reservoir volume tracking"
        />

        <Card style={styles.quantityCard}>
          {/* Main Quantity Display Top Stats */}
          <View style={styles.quantityStatsRow}>
            <View style={styles.quantityPrimaryCol}>
              <Text style={styles.quantityLabel}>CURRENT QUANTITY</Text>
              <Text style={styles.quantityPrimaryVal}>{tank.currentQuantity.toLocaleString()} L</Text>
              <Text style={styles.quantityCapacitySub}>
                Tank Capacity: <Text style={{ fontWeight: '800', color: Colors.textPrimary }}>{tank.capacity.toLocaleString()} L</Text>
              </Text>
            </View>

            <View style={styles.levelBadgeCol}>
              <View style={styles.levelBadge}>
                <Text style={styles.levelBadgeNumber}>{tank.fuelLevelPercent}%</Text>
                <Text style={styles.levelBadgeSub}>Fuel Level</Text>
              </View>
            </View>
          </View>

          {/* Large Visual Tank Level Indicator Container */}
          <View style={styles.tankGraphicContainer}>
            <View style={styles.tankOuterFrame}>
              <View
                style={[
                  styles.tankFillLevel,
                  {
                    height: `${tank.fuelLevelPercent}%`,
                    backgroundColor:
                      tank.fuelLevelPercent > 40
                        ? Colors.brandBlue
                        : Colors.accentAmber,
                  },
                ]}
              >
                <View style={styles.liquidWaveHighlight} />
                <View style={styles.liquidCenterGlow} />
              </View>

              {/* Graduation Level Lines */}
              <View style={[styles.gradLine, { bottom: '75%' }]}><Text style={styles.gradText}>7,500 L (75%)</Text></View>
              <View style={[styles.gradLine, { bottom: '50%' }]}><Text style={styles.gradText}>5,000 L (50%)</Text></View>
              <View style={[styles.gradLine, { bottom: '25%' }]}><Text style={styles.gradText}>2,500 L (25%)</Text></View>
            </View>

            {/* Scale Gauge Legend */}
            <View style={styles.tankGraphicLegend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: Colors.brandBlue }]} />
                <Text style={styles.legendText}>Available: {tank.currentQuantity.toLocaleString()} L</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#CBD5E1' }]} />
                <Text style={styles.legendText}>Ullage (Empty): {(tank.capacity - tank.currentQuantity).toLocaleString()} L</Text>
              </View>
            </View>
          </View>

          {/* Daily Consumption Card Row */}
          <View style={styles.consumptionBox}>
            <View style={styles.consumptionIcon}>
              <Ionicons name="trending-down" size={18} color="#D97706" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.consumptionLabel}>Daily Consumption</Text>
              <Text style={styles.consumptionValue}>{tank.dailyConsumption.toLocaleString()} L</Text>
            </View>
            <View style={styles.consumptionEst}>
              <Text style={styles.consumptionEstText}>Est. Autonomy: ~5.3 Days</Text>
            </View>
          </View>
        </Card>

        {/* ================= SECTION 2: FUEL QUALITY ================= */}
        <SectionHeader
          title="Section 2 — Fuel Quality"
          subtitle="Multi-parameter purity & legal metrology parameters"
        />

        <Card style={styles.qualityCard} accentColor={Colors.accentGreen}>
          {/* Overall Quality Score Header */}
          <View style={styles.qualityScoreHeader}>
            <View style={styles.qualityScoreLeft}>
              <View style={styles.qualityScoreIconCircle}>
                <Ionicons name="shield-checkmark" size={24} color="#10B981" />
              </View>
              <View>
                <Text style={styles.qualityHeaderLabel}>OVERALL QUALITY SCORE</Text>
                <View style={styles.qualityScoreRow}>
                  <Text style={styles.qualityScoreVal}>{tank.qualityScore}%</Text>
                  <View style={styles.qualityStatusPill}>
                    <Text style={styles.qualityStatusText}>{tank.qualityStatus}</Text>
                  </View>
                </View>
              </View>
            </View>

            <Badge label="IS 1460 Standard" variant="Approved" />
          </View>

          <View style={styles.divider} />

          {/* Mock Quality Parameters Grid */}
          <View style={styles.paramsGrid}>
            {/* Density Parameter */}
            <View style={styles.paramCard}>
              <View style={styles.paramCardHeader}>
                <Ionicons name="speedometer-outline" size={16} color={Colors.brandBlue} />
                <Text style={styles.paramCardName}>Density</Text>
              </View>
              <Text style={styles.paramCardValue}>{tank.density}</Text>
              <View style={styles.paramStatusRow}>
                <View style={[styles.statusDot, { backgroundColor: '#10B981' }]} />
                <Text style={styles.paramStatusLabel}>{tank.densityStatus}</Text>
                <Text style={styles.paramRangeSub}>(0.820 - 0.845)</Text>
              </View>
            </View>

            {/* Water Content Parameter */}
            <View style={styles.paramCard}>
              <View style={styles.paramCardHeader}>
                <Ionicons name="water-outline" size={16} color="#0D9488" />
                <Text style={styles.paramCardName}>Water Content</Text>
              </View>
              <Text style={styles.paramCardValue}>{tank.waterContent}</Text>
              <View style={styles.paramStatusRow}>
                <View style={[styles.statusDot, { backgroundColor: '#10B981' }]} />
                <Text style={styles.paramStatusLabel}>{tank.waterStatus}</Text>
                <Text style={styles.paramRangeSub}>(&lt; 0.05% max)</Text>
              </View>
            </View>

            {/* Purity Parameter */}
            <View style={[styles.paramCard, { width: '100%' }]}>
              <View style={styles.paramCardHeader}>
                <Ionicons name="checkmark-done-circle-outline" size={16} color="#059669" />
                <Text style={styles.paramCardName}>Purity Index</Text>
              </View>
              <View style={styles.purityRow}>
                <Text style={styles.paramCardValue}>{tank.purity}</Text>
                <View style={styles.paramStatusRow}>
                  <View style={[styles.statusDot, { backgroundColor: '#10B981' }]} />
                  <Text style={styles.paramStatusLabel}>{tank.purityStatus}</Text>
                  <Text style={styles.paramRangeSub}>(Zero Adulteration)</Text>
                </View>
              </View>
            </View>
          </View>
        </Card>

        {/* ================= SECTION 3: EQUIPMENT STATUS ================= */}
        <SectionHeader
          title="Section 3 — Equipment Status"
          subtitle="Legal metrology stamping & dispensing unit certification"
        />

        <Card style={styles.equipmentCard} accentColor="#6366F1">
          <View style={styles.eqHeaderRow}>
            <View style={styles.eqIconCircle}>
              <Ionicons name="construct" size={22} color="#6366F1" />
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.eqSubHeading}>Dispenser / Tank Status</Text>
              <View style={styles.eqStatusPillRow}>
                <Text style={styles.eqStatusTitle}>{tank.equipmentStatus}</Text>
                <Badge label="Active Stamping" variant="Approved" size="sm" />
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.verificationDatesGrid}>
            <View style={styles.dateCol}>
              <Text style={styles.dateLabel}>Last Verification:</Text>
              <View style={styles.dateValueRow}>
                <Ionicons name="checkmark-circle" size={14} color="#10B981" />
                <Text style={styles.dateValueText}>{tank.lastVerification}</Text>
              </View>
            </View>

            <View style={styles.dateCol}>
              <Text style={styles.dateLabel}>Next Verification:</Text>
              <View style={styles.dateValueRow}>
                <Ionicons name="calendar-outline" size={14} color={Colors.brandBlue} />
                <Text style={styles.dateValueText}>{tank.nextVerification}</Text>
              </View>
            </View>
          </View>

          <View style={styles.sealInfoBox}>
            <Ionicons name="ribbon-outline" size={14} color={Colors.textMuted} />
            <Text style={styles.sealInfoText}>
              Security Seal: <Text style={{ fontWeight: '700', color: Colors.textPrimary }}>{tank.sealNumber}</Text> • {tank.inspectorAuthority}
            </Text>
          </View>
        </Card>

        {/* ================= SECTION 4: ALERTS ================= */}
        <SectionHeader
          title="Section 4 — Alerts & Safety Surveillance"
          subtitle="Real-time deviation alerts and safety notifications"
        />

        <Card
          style={[
            styles.alertCard,
            isAbnormalSimulated ? styles.alertCardAbnormal : styles.alertCardNormal,
          ]}
        >
          <View style={styles.alertContentRow}>
            <View
              style={[
                styles.alertIconCircle,
                isAbnormalSimulated ? { backgroundColor: '#FEE2E2' } : { backgroundColor: '#ECFDF5' },
              ]}
            >
              <Ionicons
                name={isAbnormalSimulated ? 'alert-circle' : 'shield-checkmark'}
                size={24}
                color={isAbnormalSimulated ? Colors.accentRed : '#10B981'}
              />
            </View>

            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text
                style={[
                  styles.alertTitle,
                  isAbnormalSimulated ? { color: Colors.accentRed } : { color: '#065F46' },
                ]}
              >
                {isAbnormalSimulated
                  ? 'Abnormal Reading: Water Content Spike'
                  : 'No abnormal reading detected.'}
              </Text>
              <Text style={styles.alertDescription}>
                {isAbnormalSimulated
                  ? 'Water moisture index rose to 0.06% (Threshold > 0.05%). Automatic dispensing lock recommended.'
                  : 'All metrology parameters, tank volumetric readings, and safety sensors are functioning within nominal thresholds.'}
              </Text>
            </View>
          </View>

          {/* Quality Alert State Toggle */}
          <TouchableOpacity
            style={styles.simAlertBtn}
            onPress={() => setIsAbnormalSimulated(!isAbnormalSimulated)}
            activeOpacity={0.7}
          >
            <Ionicons name="flask-outline" size={13} color={Colors.brandBlue} />
            <Text style={styles.simAlertBtnText}>
              {isAbnormalSimulated ? 'Reset to Nominal Status' : 'Test Alert State (Moisture Spike Simulation)'}
            </Text>
          </TouchableOpacity>
        </Card>

        {/* ================= BUTTONS ================= */}
        <View style={styles.actionButtonsRow}>
          <Button
            title="Verify Equipment"
            onPress={() => router.push('/register-equipment')}
            variant="primary"
            size="lg"
            icon="checkmark-circle-outline"
            style={{ flex: 1 }}
          />

          <Button
            title="View Verification History"
            onPress={() => setHistoryModalVisible(true)}
            variant="outline"
            size="lg"
            icon="time-outline"
            style={{ flex: 1 }}
          />
        </View>
      </ScrollView>

      {/* ================= VERIFICATION HISTORY MODAL ================= */}
      <Modal visible={historyModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <View style={styles.modalTitleRow}>
                <Ionicons name="time" size={20} color={Colors.brandBlue} />
                <Text style={styles.modalTitle}>Verification Audit History</Text>
              </View>
              <TouchableOpacity onPress={() => setHistoryModalVisible(false)}>
                <Ionicons name="close" size={22} color={Colors.textMuted} />
              </TouchableOpacity>
            </View>

            <ScrollView style={{ maxHeight: 340 }}>
              <View style={styles.historyItem}>
                <View style={styles.historyDotCompleted} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.histTitle}>Annual Metrology Recalibration</Text>
                  <Text style={styles.histDate}>20 September 2026 • Legal Metrology Dept</Text>
                  <Text style={styles.histDesc}>Flowmeter tolerance measured at &plusmn;0.05% (Compliant).</Text>
                </View>
                <Badge label="Passed" variant="Approved" size="sm" />
              </View>

              <View style={styles.historyItem}>
                <View style={styles.historyDotCompleted} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.histTitle}>Ultrasonic Tank Integrity Check</Text>
                  <Text style={styles.histDate}>14 March 2026 • PESO Industrial Inspector</Text>
                  <Text style={styles.histDesc}>12.4mm wall thickness & corrosion barrier intact.</Text>
                </View>
                <Badge label="Passed" variant="Approved" size="sm" />
              </View>

              <View style={styles.historyItem}>
                <View style={styles.historyDotCompleted} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.histTitle}>Fuel Quality Density Audit</Text>
                  <Text style={styles.histDate}>10 January 2026 • Central Fuel Lab</Text>
                  <Text style={styles.histDesc}>Diesel batch purity verified 99.8%.</Text>
                </View>
                <Badge label="Certified" variant="Approved" size="sm" />
              </View>
            </ScrollView>

            <Button
              title="Close Audit History"
              onPress={() => setHistoryModalVisible(false)}
              variant="primary"
              size="md"
              fullWidth
              style={{ marginTop: 14 }}
            />
          </View>
        </View>
      </Modal>

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
  unitCard: {
    marginBottom: Spacing.md,
  },
  unitHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  unitIconCircle: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  unitTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  unitName: {
    fontSize: 18,
    fontWeight: '900',
    color: Colors.textPrimary,
  },
  fuelTypePill: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  fuelTypeText: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.brandBlue,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 3,
  },
  locationText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  switchTankBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  switchTankText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.brandBlue,
  },
  prototypeNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 6,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  prototypeNoticeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#065F46',
  },
  quantityCard: {
    marginBottom: Spacing.md,
  },
  quantityStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  quantityPrimaryCol: {
    gap: 2,
  },
  quantityLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.textMuted,
    letterSpacing: 0.5,
  },
  quantityPrimaryVal: {
    fontSize: 28,
    fontWeight: '900',
    color: Colors.textPrimary,
    letterSpacing: 0.5,
  },
  quantityCapacitySub: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  levelBadgeCol: {
    alignItems: 'flex-end',
  },
  levelBadge: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1.5,
    borderColor: '#93C5FD',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
    alignItems: 'center',
  },
  levelBadgeNumber: {
    fontSize: 18,
    fontWeight: '900',
    color: Colors.brandBlue,
  },
  levelBadgeSub: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.textMuted,
  },
  tankGraphicContainer: {
    marginVertical: 12,
    alignItems: 'center',
  },
  tankOuterFrame: {
    width: '100%',
    height: 120,
    backgroundColor: '#F1F5F9',
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    justifyContent: 'flex-end',
    overflow: 'hidden',
    position: 'relative',
  },
  tankFillLevel: {
    width: '100%',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    position: 'relative',
  },
  liquidWaveHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
  },
  liquidCenterGlow: {
    position: 'absolute',
    top: 10,
    left: '10%',
    right: '10%',
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  gradLine: {
    position: 'absolute',
    left: 8,
    right: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(15, 23, 42, 0.15)',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  gradText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#64748B',
    marginTop: -14,
  },
  tankGraphicLegend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  consumptionBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FDE68A',
    borderRadius: 10,
    padding: 10,
    gap: 10,
    marginTop: 4,
  },
  consumptionIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  consumptionLabel: {
    fontSize: 11,
    color: '#92400E',
    fontWeight: '700',
  },
  consumptionValue: {
    fontSize: 16,
    fontWeight: '900',
    color: '#78350F',
  },
  consumptionEst: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  consumptionEstText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#92400E',
  },
  qualityCard: {
    marginBottom: Spacing.md,
  },
  qualityScoreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  qualityScoreLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  qualityScoreIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  qualityHeaderLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.textMuted,
    letterSpacing: 0.5,
  },
  qualityScoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 2,
  },
  qualityScoreVal: {
    fontSize: 22,
    fontWeight: '900',
    color: '#065F46',
  },
  qualityStatusPill: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  qualityStatusText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#047857',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 12,
  },
  paramsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  paramCard: {
    flex: 1,
    minWidth: '47%',
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  paramCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  paramCardName: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  paramCardValue: {
    fontSize: 16,
    fontWeight: '900',
    color: Colors.textPrimary,
  },
  paramStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  paramStatusLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#047857',
  },
  paramRangeSub: {
    fontSize: 10,
    color: Colors.textMuted,
  },
  purityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  equipmentCard: {
    marginBottom: Spacing.md,
  },
  eqHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eqIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eqSubHeading: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textMuted,
    textTransform: 'uppercase',
  },
  eqStatusPillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 2,
  },
  eqStatusTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#4338CA',
  },
  verificationDatesGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 10,
  },
  dateCol: {
    flex: 1,
    gap: 2,
  },
  dateLabel: {
    fontSize: 11,
    color: Colors.textMuted,
    fontWeight: '600',
  },
  dateValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  dateValueText: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  sealInfoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 8,
    borderRadius: 6,
    gap: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sealInfoText: {
    fontSize: 11,
    color: Colors.textSecondary,
    flex: 1,
  },
  alertCard: {
    marginBottom: Spacing.lg,
    borderWidth: 1.5,
  },
  alertCardNormal: {
    backgroundColor: '#F0FDF4',
    borderColor: '#BBF7D0',
  },
  alertCardAbnormal: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
  },
  alertContentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  alertIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: '800',
  },
  alertDescription: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
    lineHeight: 16,
  },
  simAlertBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 6,
    paddingVertical: 6,
    gap: 6,
    marginTop: 12,
  },
  simAlertBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.brandBlue,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: Spacing.xxl,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(11, 25, 44, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    width: '100%',
    maxWidth: 420,
    ...Shadows.lg,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingBottom: 8,
  },
  modalTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    gap: 10,
  },
  historyDotCompleted: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
    marginTop: 6,
  },
  histTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  histDate: {
    fontSize: 10,
    color: Colors.textMuted,
    marginTop: 2,
  },
  histDesc: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
  },
});
