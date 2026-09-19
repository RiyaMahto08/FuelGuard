import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, Shadows } from '@/constants/theme';
import { Header, BottomNavBar } from '@/components/Header';
import { Card, Badge, Button, SectionHeader } from '@/components/UIComponents';
import { useApp } from '@/context/AppContext';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, equipments, logout } = useApp();

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  return (
    <View style={styles.screen}>
      <Header
        title="Industry Profile"
        subtitle="Facility registration & compliance officer credentials"
        showBack={false}
        showProfile={false}
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Identity Card */}
        <Card style={styles.profileCard} accentColor={Colors.brandBlue}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>R</Text>
              <View style={styles.verifiedBadge}>
                <Ionicons name="checkmark" size={12} color="#FFFFFF" />
              </View>
            </View>

            <View style={{ flex: 1, marginLeft: 14 }}>
              <View style={styles.nameRow}>
                <Text style={styles.profileName}>{user.fullName}</Text>
                <Badge label="Industry User" variant="Approved" size="sm" />
              </View>
              <Text style={styles.profileRole}>{user.designation}</Text>
              <Text style={styles.profileOrg}>{user.organizationName}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Quick Contact & License Details */}
          <View style={styles.infoList}>
            <View style={styles.infoItem}>
              <Ionicons name="mail-outline" size={16} color={Colors.brandBlue} />
              <Text style={styles.infoText}>{user.email}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="call-outline" size={16} color={Colors.brandBlue} />
              <Text style={styles.infoText}>{user.phone}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="location-outline" size={16} color={Colors.brandBlue} />
              <Text style={styles.infoText}>{user.plantLocation}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="business-outline" size={16} color={Colors.brandBlue} />
              <Text style={styles.infoText}>PESO License: {user.licenseNo}</Text>
            </View>
          </View>
        </Card>

        {/* Assigned Field Inspector Details */}
        <SectionHeader
          title="Assigned Regulatory Officer"
          subtitle="Legal Metrology & PESO field inspection authority"
        />

        <Card style={styles.inspectorCard} accentColor="#059669">
          <View style={styles.inspectorRow}>
            <View style={styles.inspectorAvatar}>
              <Text style={styles.inspectorAvatarText}>H</Text>
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <View style={styles.nameRow}>
                <Text style={styles.inspectorName}>Harshit</Text>
                <Badge label="Field Officer" variant="Approved" size="sm" />
              </View>
              <Text style={styles.inspectorRole}>Senior Legal Metrology & Fuel Quality Inspector</Text>
              <Text style={styles.inspectorReg}>Govt of India • PESO Reg: LM-2026-9901</Text>
            </View>
          </View>

          <View style={styles.inspectorActions}>
            <View style={styles.slotBadge}>
              <Ionicons name="calendar-outline" size={14} color="#047857" />
              <Text style={styles.slotText}>Next Audit: 20 September 2026</Text>
            </View>
          </View>
        </Card>

        {/* Registered Assets Summary */}
        <SectionHeader
          title="Facility Fuel Assets"
          subtitle="Connected dispensing units and bulk tanks"
          actionText="Add New"
          onActionPress={() => router.push('/register-equipment')}
        />

        <View style={styles.assetsGrid}>
          {equipments.map((eq) => (
            <Card key={eq.id} style={styles.assetCard}>
              <View style={styles.assetHeader}>
                <View style={styles.assetIconBox}>
                  <MaterialCommunityIcons name="gas-cylinder" size={18} color={Colors.brandBlue} />
                </View>
                <View style={{ flex: 1, marginLeft: 8 }}>
                  <Text style={styles.assetName}>{eq.name}</Text>
                  <Text style={styles.assetId}>{eq.id} • {eq.capacity}</Text>
                </View>
                <Badge label={eq.status} variant={eq.status} size="sm" />
              </View>
            </Card>
          ))}
        </View>

        {/* Regulatory Network Info Card */}
        <Card style={styles.storyCard}>
          <Text style={styles.storyTitle}>Fuel Guard Regulatory Network</Text>
          <Text style={styles.storySub}>
            Automated fuel measurement surveillance, tamper-proof density monitoring, and decentralized compliance ledger registry.
          </Text>

          <View style={styles.storyFlow}>
            <Text style={styles.flowStep}>1. Monitor Fuel Quantity</Text>
            <Ionicons name="arrow-down" size={12} color="#94A3B8" />
            <Text style={styles.flowStep}>2. Check Fuel Quality</Text>
            <Ionicons name="arrow-down" size={12} color="#94A3B8" />
            <Text style={styles.flowStep}>3. Verify Equipment</Text>
            <Ionicons name="arrow-down" size={12} color="#94A3B8" />
            <Text style={styles.flowStep}>4. Apply for Verification</Text>
            <Ionicons name="arrow-down" size={12} color="#94A3B8" />
            <Text style={styles.flowStep}>5. Track Verification Status</Text>
            <Ionicons name="arrow-down" size={12} color="#94A3B8" />
            <Text style={[styles.flowStep, { color: '#10B981', fontWeight: '800' }]}>
              6. Generate Digital Certificate
            </Text>
          </View>
        </Card>

        {/* Logout Action */}
        <Button
          title="Switch Account / Logout"
          onPress={handleLogout}
          variant="outline"
          size="lg"
          icon="log-out-outline"
          fullWidth
          style={{ marginTop: 6, marginBottom: 28 }}
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
  profileCard: {
    marginBottom: Spacing.md,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: Colors.brandBlue,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    ...Shadows.glowBlue,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#10B981',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileName: {
    fontSize: 16,
    fontWeight: '900',
    color: Colors.textPrimary,
  },
  profileRole: {
    fontSize: 12,
    color: Colors.brandBlue,
    fontWeight: '700',
    marginTop: 2,
  },
  profileOrg: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 12,
  },
  infoList: {
    gap: 8,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '500',
    flex: 1,
  },
  inspectorCard: {
    backgroundColor: '#F0FDF4',
    borderColor: '#BBF7D0',
    marginBottom: Spacing.md,
  },
  inspectorRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inspectorAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#059669',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inspectorAvatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
  },
  inspectorName: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  inspectorRole: {
    fontSize: 11,
    color: '#047857',
    fontWeight: '600',
    marginTop: 2,
  },
  inspectorReg: {
    fontSize: 10,
    color: Colors.textMuted,
    marginTop: 1,
  },
  inspectorActions: {
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#DCFCE7',
  },
  slotBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  slotText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#047857',
  },
  assetsGrid: {
    gap: 8,
    marginBottom: Spacing.md,
  },
  assetCard: {
    marginBottom: 0,
    padding: Spacing.md,
  },
  assetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  assetIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  assetName: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  assetId: {
    fontSize: 10,
    color: Colors.textMuted,
    marginTop: 1,
  },
  storyCard: {
    backgroundColor: '#0B192C',
    borderColor: '#1E3E62',
    marginBottom: Spacing.lg,
    padding: Spacing.lg,
  },
  storyTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#38BDF8',
    letterSpacing: 0.5,
  },
  storySub: {
    fontSize: 11,
    color: '#CBD5E1',
    lineHeight: 16,
    marginVertical: 8,
  },
  storyFlow: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 8,
    padding: 10,
    gap: 4,
  },
  flowStep: {
    fontSize: 11,
    color: '#E2E8F0',
    fontWeight: '600',
  },
});
