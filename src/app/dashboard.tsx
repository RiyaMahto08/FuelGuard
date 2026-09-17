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
import {
  INITIAL_FUEL_TANKS,
  RECENT_ACTIVITIES,
  FuelTank,
  STATE_FUEL_PRICES,
  StateFuelPrice,
} from '@/data/mockData';

export default function DashboardScreen() {
  const router = useRouter();
  const { user } = useApp();

  const [tanks, setTanks] = useState<FuelTank[]>(INITIAL_FUEL_TANKS);
  const [selectedTankId, setSelectedTankId] = useState<string>('tank-01');
  const [refreshingMock, setRefreshingMock] = useState<boolean>(false);
  const [fuelPriceTab, setFuelPriceTab] = useState<'all' | 'petrol' | 'diesel' | 'cng'>('all');
  const [selectedStateDetail, setSelectedStateDetail] = useState<string | null>(null);

  const activeTank = tanks.find((t) => t.id === selectedTankId) || tanks[0];
  const fillPercentage = Math.round((activeTank.currentLevelLiters / activeTank.totalCapacityLiters) * 100);

  // Story flow items for the SIH presentation
  const storySteps = [
    { number: '1', title: 'Monitor Fuel Quantity', desc: '8,420 L live level', icon: 'speedometer-outline', route: '/fuel-monitoring' },
    { number: '2', title: 'Check Fuel Quality', desc: '98.4% purity score', icon: 'flask-outline', route: '/fuel-monitoring' },
    { number: '3', title: 'Verify Equipment', desc: 'Dispenser & tanks', icon: 'construct-outline', route: '/register-equipment' },
    { number: '4', title: 'Apply Verification', desc: 'Initial & Re-verification', icon: 'document-text-outline', route: '/application-form' },
    { number: '5', title: 'Track Status', desc: '5-stage timeline', icon: 'time-outline', route: '/application-status' },
    { number: '6', title: 'Digital Certificate', desc: 'Official signed cert', icon: 'ribbon-outline', route: '/certificate' },
  ];

  const handleRefreshSensors = () => {
    setRefreshingMock(true);
    setTimeout(() => {
      setTanks((prev) =>
        prev.map((t) => {
          if (t.id === selectedTankId) {
            const delta = (Math.random() - 0.5) * 6;
            const newLevel = Math.max(1000, Math.min(t.totalCapacityLiters, t.currentLevelLiters + Math.round(delta)));
            return {
              ...t,
              currentLevelLiters: newLevel,
              lastUpdated: 'Just now',
            };
          }
          return t;
        })
      );
      setRefreshingMock(false);
    }, 450);
  };

  return (
    <View style={styles.screen}>
      <Header />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* ================= GREETING & HERO BANNER ================= */}
        <View style={styles.greetingBanner}>
          <View style={styles.greetingHeaderRow}>
            <View>
              <Text style={styles.greetingText}>Welcome back, {user.name}</Text>
              <Text style={styles.greetingSubtitle}>
                Monitor your fuel operations at a glance.
              </Text>
            </View>
            <View style={styles.facilityPill}>
              <Ionicons name="business" size={13} color="#38BDF8" />
              <Text style={styles.facilityText}>{user.organizationName}</Text>
            </View>
          </View>

          {/* Regulatory Surveillance Badge */}
          <View style={styles.mockDisclaimer}>
            <Ionicons name="shield-checkmark" size={14} color="#A7F3D0" />
            <Text style={styles.mockDisclaimerText}>
              Legal Metrology & Fuel Quality Surveillance Active
            </Text>
          </View>
        </View>

        {/* ================= OPERATIONAL WORKFLOWS STRIP ================= */}
        <View style={styles.storySection}>
          <Text style={styles.storyHeading}>OPERATIONAL WORKFLOWS</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storyScroll}>
            <View style={styles.storyRow}>
              {storySteps.map((step, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={styles.storyCard}
                  onPress={() => router.push(step.route as any)}
                  activeOpacity={0.7}
                >
                  <View style={styles.storyNumberBadge}>
                    <Text style={styles.storyNumberText}>{step.number}</Text>
                  </View>
                  <Ionicons name={step.icon as any} size={18} color={Colors.brandBlue} style={{ marginTop: 2 }} />
                  <Text style={styles.storyCardTitle}>{step.title}</Text>
                  <Text style={styles.storyCardDesc}>{step.desc}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* ================= TANK SWITCHER TABS ================= */}
        <View style={styles.tankTabsContainer}>
          <Text style={styles.sectionSmallTitle}>ACTIVE STORAGE TANKS:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.tankTabsRow}>
              {tanks.map((tank) => {
                const isSelected = tank.id === activeTank.id;
                return (
                  <TouchableOpacity
                    key={tank.id}
                    style={[styles.tankTab, isSelected && styles.tankTabSelected]}
                    onPress={() => setSelectedTankId(tank.id)}
                    activeOpacity={0.7}
                  >
                    <MaterialCommunityIcons
                      name="gas-cylinder"
                      size={16}
                      color={isSelected ? '#FFFFFF' : Colors.textMuted}
                    />
                    <Text style={[styles.tankTabText, isSelected && styles.tankTabTextSelected]}>
                      {tank.name}
                    </Text>
                    <View
                      style={[
                        styles.tankTypeMini,
                        isSelected ? { backgroundColor: 'rgba(255,255,255,0.2)' } : {},
                      ]}
                    >
                      <Text style={[styles.tankTypeMiniText, isSelected && { color: '#FFFFFF' }]}>
                        {tank.fuelType.split(' ')[0]}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>

        {/* ================= 4 CORE STATUS CARDS GRID ================= */}
        <View style={styles.coreGrid}>
          {/* Card 1: Fuel Quantity */}
          <Card
            style={styles.coreCard}
            accentColor={Colors.brandBlue}
            onPress={() => router.push('/fuel-monitoring')}
          >
            <View style={styles.cardTopRow}>
              <View style={[styles.coreIconCircle, { backgroundColor: '#EFF6FF' }]}>
                <Ionicons name="speedometer" size={18} color={Colors.brandBlue} />
              </View>
              <Text style={styles.coreCardTag}>{fillPercentage}% Level</Text>
            </View>
            <Text style={styles.coreValue}>{activeTank.currentLevelLiters.toLocaleString()} L</Text>
            <Text style={styles.coreLabel}>Available Fuel</Text>
            <View style={styles.coreSubRow}>
              <Text style={styles.coreSubText}>Cap: {activeTank.totalCapacityLiters.toLocaleString()} L</Text>
            </View>
          </Card>

          {/* Card 2: Fuel Quality */}
          <Card
            style={styles.coreCard}
            accentColor={Colors.accentGreen}
            onPress={() => router.push('/fuel-monitoring')}
          >
            <View style={styles.cardTopRow}>
              <View style={[styles.coreIconCircle, { backgroundColor: '#ECFDF5' }]}>
                <Ionicons name="flask" size={18} color="#10B981" />
              </View>
              <Badge label={activeTank.status} variant="Approved" size="sm" />
            </View>
            <Text style={[styles.coreValue, { color: '#065F46' }]}>{activeTank.qualityScore}%</Text>
            <Text style={styles.coreLabel}>Quality Score</Text>
            <View style={styles.coreSubRow}>
              <Ionicons name="checkmark-circle" size={12} color="#10B981" />
              <Text style={[styles.coreSubText, { color: '#047857' }]}>IS 1460 Standard</Text>
            </View>
          </Card>

          {/* Card 3: Equipment Status */}
          <Card
            style={styles.coreCard}
            accentColor="#6366F1"
            onPress={() => router.push('/register-equipment')}
          >
            <View style={styles.cardTopRow}>
              <View style={[styles.coreIconCircle, { backgroundColor: '#EEF2FF' }]}>
                <Ionicons name="construct" size={18} color="#6366F1" />
              </View>
              <Badge label="Active" variant="Primary" size="sm" />
            </View>
            <Text style={[styles.coreValue, { color: '#4338CA', fontSize: 18, marginTop: 4 }]}>
              {activeTank.equipmentStatus}
            </Text>
            <Text style={styles.coreLabel}>Equipment Status</Text>
            <View style={styles.coreSubRow}>
              <Text style={styles.coreSubText}>Flowmeter Calibrated</Text>
            </View>
          </Card>

          {/* Card 4: Compliance */}
          <Card
            style={styles.coreCard}
            accentColor={Colors.accentAmber}
            onPress={() => router.push('/application-status')}
          >
            <View style={styles.cardTopRow}>
              <View style={[styles.coreIconCircle, { backgroundColor: '#FFFBEB' }]}>
                <Ionicons name="shield-checkmark" size={18} color={Colors.accentAmber} />
              </View>
              <Text style={[styles.coreCardTag, { color: Colors.accentAmberDark }]}>Grade A</Text>
            </View>
            <Text style={[styles.coreValue, { color: '#B45309' }]}>{activeTank.complianceScore}%</Text>
            <Text style={styles.coreLabel}>Compliance</Text>
            <View style={styles.coreSubRow}>
              <Text style={[styles.coreSubText, { color: '#B45309', fontWeight: '700' }]}>Compliant</Text>
            </View>
          </Card>
        </View>

        {/* ================= VISUAL FUEL LEVEL GAUGE CARD ================= */}
        <Card
          style={styles.gaugeCard}
          onPress={() => router.push('/fuel-monitoring')}
        >
          <View style={styles.gaugeHeader}>
            <View>
              <Text style={styles.gaugeTitle}>Live Fuel Reservoir Level</Text>
              <Text style={styles.gaugeSub}>
                Storage Tank: <Text style={{ fontWeight: '800', color: Colors.textPrimary }}>{activeTank.name}</Text> • Fuel Type: <Text style={{ fontWeight: '800', color: Colors.brandBlue }}>{activeTank.fuelType}</Text>
              </Text>
            </View>
            <TouchableOpacity
              onPress={handleRefreshSensors}
              style={styles.refreshBtn}
              activeOpacity={0.7}
            >
              <Ionicons
                name={refreshingMock ? 'sync' : 'refresh'}
                size={15}
                color={Colors.brandBlue}
              />
              <Text style={styles.refreshText}>{activeTank.lastUpdated}</Text>
            </TouchableOpacity>
          </View>

          {/* Visual Tank Level Bar */}
          <View style={styles.tankGaugeContainer}>
            <View style={styles.gaugeBarBackground}>
              <View
                style={[
                  styles.gaugeBarFill,
                  {
                    width: `${fillPercentage}%`,
                    backgroundColor:
                      fillPercentage > 40
                        ? Colors.brandBlue
                        : fillPercentage > 20
                        ? Colors.accentAmber
                        : Colors.accentRed,
                  },
                ]}
              >
                <View style={styles.gaugeWaveEffect} />
              </View>
            </View>

            {/* Scale Markers */}
            <View style={styles.gaugeMarkersRow}>
              <Text style={styles.markerText}>0 L</Text>
              <Text style={styles.markerText}>2.5k L (25%)</Text>
              <Text style={styles.markerText}>5k L (50%)</Text>
              <Text style={styles.markerText}>7.5k L (75%)</Text>
              <Text style={styles.markerText}>{activeTank.totalCapacityLiters.toLocaleString()} L (Full)</Text>
            </View>
          </View>

          {/* Real-Time Telemetry Row */}
          <View style={styles.telemetryRow}>
            <View style={styles.telemetryItem}>
              <Ionicons name="thermometer-outline" size={14} color={Colors.textMuted} />
              <Text style={styles.telemetryLabel}>Temp:</Text>
              <Text style={styles.telemetryVal}>{activeTank.parameters.temperature}</Text>
            </View>
            <View style={styles.telemetryItem}>
              <Ionicons name="speedometer-outline" size={14} color={Colors.textMuted} />
              <Text style={styles.telemetryLabel}>Pressure:</Text>
              <Text style={styles.telemetryVal}>{activeTank.parameters.dispenserPressure}</Text>
            </View>
            <View style={styles.telemetryItem}>
              <Ionicons name="water-outline" size={14} color={Colors.textMuted} />
              <Text style={styles.telemetryLabel}>Flow Rate:</Text>
              <Text style={styles.telemetryVal}>{activeTank.parameters.flowRate}</Text>
            </View>
          </View>
        </Card>

        {/* ================= INTERSTATE FUEL PRICE COMPARISON TABLE ================= */}
        <SectionHeader
          title="Fuel Price Rates Comparison"
          subtitle="Current dynamic RSP benchmark across Haryana, Delhi & UP"
        />

        <Card style={styles.priceTableCard}>
          {/* Card Top Banner / Summary */}
          <View style={styles.priceCardHeader}>
            <View style={styles.priceHeaderTitleRow}>
              <View style={styles.priceIconBadge}>
                <Ionicons name="pricetags" size={16} color={Colors.brandBlue} />
              </View>
              <View>
                <Text style={styles.priceCardTitle}>NCR Interstate Price Index</Text>
                <Text style={styles.priceCardSubtitle}>Haryana • New Delhi • Uttar Pradesh</Text>
              </View>
            </View>
            <View style={styles.livePricePill}>
              <View style={styles.livePriceDot} />
              <Text style={styles.livePriceText}>Live Today</Text>
            </View>
          </View>

          {/* Fuel Category Selector Tabs */}
          <View style={styles.fuelFilterTabs}>
            {(['all', 'petrol', 'diesel', 'cng'] as const).map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[styles.fuelFilterTab, fuelPriceTab === tab && styles.fuelFilterTabActive]}
                onPress={() => setFuelPriceTab(tab)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.fuelFilterTabText,
                    fuelPriceTab === tab && styles.fuelFilterTabTextActive,
                  ]}
                >
                  {tab === 'all'
                    ? 'All Fuels'
                    : tab === 'petrol'
                    ? 'Petrol (MS)'
                    : tab === 'diesel'
                    ? 'Diesel (HSD)'
                    : 'CNG'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Comparison Table */}
          <View style={styles.comparisonTable}>
            {/* Table Header */}
            <View style={styles.tableHeaderRow}>
              <Text style={[styles.tableHeaderCell, styles.cellState]}>STATE / UT</Text>
              {(fuelPriceTab === 'all' || fuelPriceTab === 'petrol') && (
                <Text style={[styles.tableHeaderCell, styles.cellPrice]}>PETROL</Text>
              )}
              {(fuelPriceTab === 'all' || fuelPriceTab === 'diesel') && (
                <Text style={[styles.tableHeaderCell, styles.cellPrice]}>DIESEL</Text>
              )}
              {(fuelPriceTab === 'all' || fuelPriceTab === 'cng') && (
                <Text style={[styles.tableHeaderCell, styles.cellPrice]}>CNG</Text>
              )}
            </View>

            {/* Table Rows */}
            {STATE_FUEL_PRICES.map((item) => {
              const isSelected = selectedStateDetail === item.id;
              return (
                <View key={item.id}>
                  <TouchableOpacity
                    style={[styles.tableRow, isSelected && styles.tableRowSelected]}
                    onPress={() =>
                      setSelectedStateDetail(isSelected ? null : item.id)
                    }
                    activeOpacity={0.7}
                  >
                    {/* State Column */}
                    <View style={styles.cellState}>
                      <View style={styles.stateIdentityRow}>
                        <View
                          style={[
                            styles.stateCodeBadge,
                            item.stateCode === 'DL'
                              ? { backgroundColor: '#EFF6FF', borderColor: '#BFDBFE' }
                              : item.stateCode === 'HR'
                              ? { backgroundColor: '#F0FDF4', borderColor: '#BBF7D0' }
                              : { backgroundColor: '#FEF3C7', borderColor: '#FDE68A' },
                          ]}
                        >
                          <Text
                            style={[
                              styles.stateCodeText,
                              item.stateCode === 'DL'
                                ? { color: Colors.brandBlue }
                                : item.stateCode === 'HR'
                                ? { color: '#15803D' }
                                : { color: '#B45309' },
                            ]}
                          >
                            {item.stateCode}
                          </Text>
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.stateNameText}>{item.state}</Text>
                          <Text style={styles.stateCityText}>{item.capitalCity}</Text>
                        </View>
                      </View>
                    </View>

                    {/* Petrol Column */}
                    {(fuelPriceTab === 'all' || fuelPriceTab === 'petrol') && (
                      <View style={styles.cellPrice}>
                        <View style={styles.priceValueWrapper}>
                          <Text style={styles.priceCurrency}>₹</Text>
                          <Text
                            style={[
                              styles.priceMainValue,
                              item.isLowestPetrol && styles.priceLowestHighlight,
                            ]}
                          >
                            {item.petrolPrice.toFixed(2)}
                          </Text>
                          <Text style={styles.priceUnit}>/L</Text>
                        </View>
                        {item.isLowestPetrol ? (
                          <View style={styles.lowestBadge}>
                            <Text style={styles.lowestBadgeText}>Lowest</Text>
                          </View>
                        ) : (
                          <Text style={styles.diffText}>
                            +₹{(item.petrolPrice - 94.66).toFixed(2)}
                          </Text>
                        )}
                      </View>
                    )}

                    {/* Diesel Column */}
                    {(fuelPriceTab === 'all' || fuelPriceTab === 'diesel') && (
                      <View style={styles.cellPrice}>
                        <View style={styles.priceValueWrapper}>
                          <Text style={styles.priceCurrency}>₹</Text>
                          <Text
                            style={[
                              styles.priceMainValue,
                              item.isLowestDiesel && styles.priceLowestHighlight,
                            ]}
                          >
                            {item.dieselPrice.toFixed(2)}
                          </Text>
                          <Text style={styles.priceUnit}>/L</Text>
                        </View>
                        {item.isLowestDiesel ? (
                          <View style={styles.lowestBadge}>
                            <Text style={styles.lowestBadgeText}>Lowest</Text>
                          </View>
                        ) : (
                          <Text style={styles.diffText}>
                            +₹{(item.dieselPrice - 87.62).toFixed(2)}
                          </Text>
                        )}
                      </View>
                    )}

                    {/* CNG Column */}
                    {(fuelPriceTab === 'all' || fuelPriceTab === 'cng') && (
                      <View style={styles.cellPrice}>
                        <View style={styles.priceValueWrapper}>
                          <Text style={styles.priceCurrency}>₹</Text>
                          <Text
                            style={[
                              styles.priceMainValue,
                              item.stateCode === 'DL' && styles.priceLowestHighlight,
                            ]}
                          >
                            {item.cngPrice.toFixed(2)}
                          </Text>
                          <Text style={styles.priceUnit}>/Kg</Text>
                        </View>
                        {item.stateCode === 'DL' ? (
                          <View style={styles.lowestBadge}>
                            <Text style={styles.lowestBadgeText}>Lowest</Text>
                          </View>
                        ) : (
                          <Text style={styles.diffText}>
                            +₹{(item.cngPrice - 75.09).toFixed(2)}
                          </Text>
                        )}
                      </View>
                    )}
                  </TouchableOpacity>

                  {/* Collapsible Details Row */}
                  {isSelected && (
                    <View style={styles.stateDetailDrawer}>
                      <View style={styles.detailRow}>
                        <View style={styles.detailItem}>
                          <Text style={styles.detailLabel}>State VAT (Petrol):</Text>
                          <Text style={styles.detailVal}>{item.vatRatePetrol}</Text>
                        </View>
                        <View style={styles.detailItem}>
                          <Text style={styles.detailLabel}>State VAT (Diesel):</Text>
                          <Text style={styles.detailVal}>{item.vatRateDiesel}</Text>
                        </View>
                      </View>
                      <View style={styles.detailNoteRow}>
                        <Ionicons name="information-circle-outline" size={14} color={Colors.brandBlue} />
                        <Text style={styles.detailNoteText}>{item.notes}</Text>
                      </View>
                    </View>
                  )}
                </View>
              );
            })}
          </View>

          {/* Quick Insights Cards */}
          <View style={styles.priceInsightsContainer}>
            <View style={[styles.insightPill, { backgroundColor: '#F0FDF4', borderColor: '#BBF7D0' }]}>
              <Ionicons name="trending-down" size={14} color="#16A34A" />
              <Text style={styles.insightText}>
                Best Petrol:{' '}
                <Text style={{ fontWeight: '800', color: '#15803D' }}>UP @ ₹94.66/L</Text>
              </Text>
            </View>

            <View style={[styles.insightPill, { backgroundColor: '#EFF6FF', borderColor: '#BFDBFE' }]}>
              <Ionicons name="trending-down" size={14} color={Colors.brandBlue} />
              <Text style={styles.insightText}>
                Best Diesel:{' '}
                <Text style={{ fontWeight: '800', color: Colors.brandBlue }}>Delhi @ ₹87.62/L</Text>
              </Text>
            </View>
          </View>

          {/* Source and Regulatory Footer */}
          <View style={styles.priceSourceFooter}>
            <Ionicons name="shield-checkmark-outline" size={13} color={Colors.textMuted} />
            <Text style={styles.priceSourceText}>
              Dynamic pricing benchmarked via IOCL, BPCL & HPCL Legal Metrology feed.
            </Text>
          </View>
        </Card>

        {/* ================= QUICK ACTIONS ================= */}
        <SectionHeader
          title="Quick Actions"
          subtitle="Primary operational and statutory workflows"
        />

        <View style={styles.quickActionsGrid}>
          {/* Action 1: Monitor Fuel */}
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => router.push('/fuel-monitoring')}
            activeOpacity={0.8}
          >
            <View style={[styles.actionIconWrapper, { backgroundColor: '#EFF6FF' }]}>
              <Ionicons name="analytics" size={24} color={Colors.brandBlue} />
            </View>
            <Text style={styles.actionBtnTitle}>Monitor Fuel</Text>
            <Text style={styles.actionBtnDesc}>Live ATG & sensor telemetry</Text>
          </TouchableOpacity>

          {/* Action 2: Verify Equipment */}
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => router.push('/register-equipment')}
            activeOpacity={0.8}
          >
            <View style={[styles.actionIconWrapper, { backgroundColor: '#EEF2FF' }]}>
              <Ionicons name="construct" size={24} color="#6366F1" />
            </View>
            <Text style={styles.actionBtnTitle}>Verify Equipment</Text>
            <Text style={styles.actionBtnDesc}>Register dispenser & meters</Text>
          </TouchableOpacity>

          {/* Action 3: Apply for Verification */}
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => router.push('/application-form')}
            activeOpacity={0.8}
          >
            <View style={[styles.actionIconWrapper, { backgroundColor: '#ECFDF5' }]}>
              <Ionicons name="document-text" size={24} color="#059669" />
            </View>
            <Text style={styles.actionBtnTitle}>Apply for Verification</Text>
            <Text style={styles.actionBtnDesc}>File PESO compliance audit</Text>
          </TouchableOpacity>

          {/* Action 4: View Certificate */}
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => router.push('/certificate')}
            activeOpacity={0.8}
          >
            <View style={[styles.actionIconWrapper, { backgroundColor: '#FFFBEB' }]}>
              <Ionicons name="ribbon" size={24} color={Colors.accentAmber} />
            </View>
            <Text style={styles.actionBtnTitle}>View Certificate</Text>
            <Text style={styles.actionBtnDesc}>Official digital registry cert</Text>
          </TouchableOpacity>
        </View>

        {/* ================= RECENT ACTIVITY ================= */}
        <SectionHeader
          title="Recent Activity"
          subtitle="Audit trails and metrology event log"
          actionText="Track All"
          onActionPress={() => router.push('/application-status')}
        />

        <View style={styles.activityList}>
          {RECENT_ACTIVITIES.map((activity) => (
            <Card
              key={activity.id}
              style={styles.activityCard}
              onPress={() => router.push('/application-status')}
            >
              <View style={styles.activityHeader}>
                <View style={styles.activityIconGroup}>
                  <View
                    style={[
                      styles.actDot,
                      {
                        backgroundColor:
                          activity.type === 'quality'
                            ? '#10B981'
                            : activity.type === 'equipment'
                            ? '#6366F1'
                            : Colors.brandBlue,
                      },
                    ]}
                  />
                  <Text style={styles.activityTitle}>{activity.title}</Text>
                </View>
                <Text style={styles.activityTime}>{activity.timestamp}</Text>
              </View>

              <Text style={styles.activitySubtitle}>{activity.subtitle}</Text>
            </Card>
          ))}
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
  greetingBanner: {
    backgroundColor: '#0B192C',
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    marginBottom: Spacing.md,
    ...Shadows.md,
  },
  greetingHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  greetingText: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  greetingSubtitle: {
    fontSize: 13,
    color: '#CBD5E1',
    marginTop: 2,
  },
  facilityPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    gap: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  facilityText: {
    color: '#E2E8F0',
    fontSize: 11,
    fontWeight: '700',
  },
  mockDisclaimer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.25)',
  },
  mockDisclaimerText: {
    color: '#A7F3D0',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  storySection: {
    marginBottom: Spacing.md,
  },
  storyHeading: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.textMuted,
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  storyScroll: {
    marginBottom: 2,
  },
  storyRow: {
    flexDirection: 'row',
    gap: 8,
  },
  storyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    width: 130,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.sm,
  },
  storyNumberBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  storyNumberText: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.brandBlue,
  },
  storyCardTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginTop: 4,
  },
  storyCardDesc: {
    fontSize: 9,
    color: Colors.textMuted,
    marginTop: 2,
  },
  tankTabsContainer: {
    marginBottom: Spacing.md,
  },
  sectionSmallTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textMuted,
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  tankTabsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  tankTab: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  tankTabSelected: {
    backgroundColor: Colors.brandBlue,
    borderColor: Colors.brandBlue,
  },
  tankTabText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  tankTabTextSelected: {
    color: '#FFFFFF',
  },
  tankTypeMini: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  tankTypeMiniText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.textMuted,
  },
  coreGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: Spacing.md,
  },
  coreCard: {
    flex: 1,
    minWidth: '47%',
    marginBottom: 0,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  coreIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coreCardTag: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.brandBlue,
  },
  coreValue: {
    fontSize: 20,
    fontWeight: '900',
    color: Colors.textPrimary,
  },
  coreLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginTop: 2,
  },
  coreSubRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
  },
  coreSubText: {
    fontSize: 10,
    color: Colors.textMuted,
    fontWeight: '600',
  },
  gaugeCard: {
    marginBottom: Spacing.md,
  },
  gaugeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  gaugeTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  gaugeSub: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  refreshBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  refreshText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.brandBlue,
  },
  tankGaugeContainer: {
    marginVertical: 4,
  },
  gaugeBarBackground: {
    width: '100%',
    height: 20,
    backgroundColor: '#E2E8F0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  gaugeBarFill: {
    height: '100%',
    borderRadius: 10,
    position: 'relative',
  },
  gaugeWaveEffect: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  gaugeMarkersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  markerText: {
    fontSize: 9,
    color: Colors.textMuted,
    fontWeight: '600',
  },
  telemetryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  telemetryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  telemetryLabel: {
    fontSize: 11,
    color: Colors.textMuted,
  },
  telemetryVal: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: Spacing.lg,
  },
  actionBtn: {
    flex: 1,
    minWidth: '47%',
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.sm,
  },
  actionIconWrapper: {
    width: 42,
    height: 42,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionBtnTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  actionBtnDesc: {
    fontSize: 10,
    color: Colors.textMuted,
    marginTop: 2,
    lineHeight: 14,
  },
  activityList: {
    gap: 8,
  },
  activityCard: {
    marginBottom: 0,
    padding: Spacing.md,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  activityIconGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  activityTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  activityTime: {
    fontSize: 10,
    color: Colors.textMuted,
  },
  activitySubtitle: {
    fontSize: 11,
    color: Colors.textSecondary,
    lineHeight: 15,
  },
  /* Interstate Price Comparison Styles */
  priceTableCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    ...Shadows.md,
  },
  priceCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  priceHeaderTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  priceIconBadge: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceCardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  priceCardSubtitle: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  livePricePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BBF7D0',
    gap: 5,
  },
  livePriceDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#16A34A',
  },
  livePriceText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#15803D',
  },
  fuelFilterTabs: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    padding: 3,
    marginBottom: Spacing.md,
    gap: 4,
  },
  fuelFilterTab: {
    flex: 1,
    paddingVertical: 6,
    alignItems: 'center',
    borderRadius: 6,
  },
  fuelFilterTabActive: {
    backgroundColor: '#FFFFFF',
    ...Shadows.sm,
  },
  fuelFilterTabText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  fuelFilterTabTextActive: {
    color: Colors.brandBlue,
    fontWeight: '800',
  },
  comparisonTable: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  tableHeaderCell: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.textMuted,
    letterSpacing: 0.5,
  },
  cellState: {
    flex: 1.4,
  },
  cellPrice: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  tableRowSelected: {
    backgroundColor: '#F8FAFC',
  },
  stateIdentityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stateCodeBadge: {
    width: 26,
    height: 26,
    borderRadius: 6,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stateCodeText: {
    fontSize: 10,
    fontWeight: '900',
  },
  stateNameText: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  stateCityText: {
    fontSize: 10,
    color: Colors.textMuted,
  },
  priceValueWrapper: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  priceCurrency: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginRight: 1,
  },
  priceMainValue: {
    fontSize: 14,
    fontWeight: '900',
    color: Colors.textPrimary,
  },
  priceLowestHighlight: {
    color: '#15803D',
  },
  priceUnit: {
    fontSize: 9,
    color: Colors.textMuted,
    marginLeft: 1,
  },
  lowestBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
    marginTop: 2,
  },
  lowestBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#15803D',
  },
  diffText: {
    fontSize: 9,
    fontWeight: '600',
    color: Colors.textMuted,
    marginTop: 2,
  },
  stateDetailDrawer: {
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    gap: 6,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flexDirection: 'row',
    gap: 4,
  },
  detailLabel: {
    fontSize: 10,
    color: Colors.textMuted,
  },
  detailVal: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  detailNoteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailNoteText: {
    fontSize: 10,
    color: Colors.brandBlue,
    fontStyle: 'italic',
  },
  priceInsightsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: Spacing.md,
  },
  insightPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
  },
  insightText: {
    fontSize: 11,
    color: Colors.textPrimary,
    flexShrink: 1,
  },
  priceSourceFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  priceSourceText: {
    fontSize: 10,
    color: Colors.textMuted,
    flex: 1,
    lineHeight: 14,
  },
});
