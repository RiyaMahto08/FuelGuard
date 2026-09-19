import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Alert, Platform } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, Shadows } from '@/constants/theme';
import { useApp } from '@/context/AppContext';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  onBackPress?: () => void;
  showProfile?: boolean;
  showNotifications?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  showBack = false,
  onBackPress,
  showProfile = true,
  showNotifications = true,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, unreadNotifications } = useApp();
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/dashboard');
    }
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.topRow}>
        {/* Left Side: Back button OR Mini Fuel Guard Branding */}
        {showBack ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleBack}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push('/dashboard')}
            style={styles.brandRow}
          >
            <View style={styles.logoBadge}>
              <Ionicons name="shield" size={18} color="#FFFFFF" />
              <Ionicons
                name="flame"
                size={11}
                color="#10B981"
                style={styles.logoFlame}
              />
            </View>
            <View>
              <Text style={styles.brandTitle}>FUEL GUARD</Text>
              <Text style={styles.brandSub}>COMPLIANCE PORTAL</Text>
            </View>
          </TouchableOpacity>
        )}

        {/* Right Side: Notification Icon & Profile Avatar */}
        <View style={styles.rightActions}>
          {showNotifications && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setShowNotificationModal(true)}
              style={styles.iconBtn}
            >
              <Ionicons name="notifications-outline" size={21} color="#F8FAFC" />
              {unreadNotifications > 0 && (
                <View style={styles.notificationBadge}>
                  <Text style={styles.badgeNumber}>{unreadNotifications}</Text>
                </View>
              )}
            </TouchableOpacity>
          )}

          {showProfile && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setShowProfileModal(true)}
              style={styles.avatarButton}
            >
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarInitials}>IO</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Screen Title (if provided) */}
      {title && (
        <View style={styles.titleSection}>
          <Text style={styles.titleText}>{title}</Text>
          {subtitle && <Text style={styles.subtitleText}>{subtitle}</Text>}
        </View>
      )}

      {/* Notifications Modal */}
      <Modal visible={showNotificationModal} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowNotificationModal(false)}
        >
          <View style={styles.notificationCard}>
            <View style={styles.modalHeader}>
              <View style={styles.modalTitleRow}>
                <Ionicons name="notifications" size={18} color={Colors.brandBlue} />
                <Text style={styles.modalTitle}>Notifications & Alerts</Text>
              </View>
              <TouchableOpacity onPress={() => setShowNotificationModal(false)}>
                <Ionicons name="close" size={20} color={Colors.textMuted} />
              </TouchableOpacity>
            </View>

            <View style={styles.notifItem}>
              <View style={[styles.notifDot, { backgroundColor: '#10B981' }]} />
              <View style={styles.notifBody}>
                <Text style={styles.notifSubject}>Digital Certificate Issued</Text>
                <Text style={styles.notifDesc}>Certificate FG-CERT-2024-08992 is now available for download.</Text>
                <Text style={styles.notifTime}>10 mins ago</Text>
              </View>
            </View>

            <View style={styles.notifItem}>
              <View style={[styles.notifDot, { backgroundColor: '#3B82F6' }]} />
              <View style={styles.notifBody}>
                <Text style={styles.notifSubject}>Inspection Slot Confirmed</Text>
                <Text style={styles.notifDesc}>Dr. R.K. Sharma scheduled audit for Steam Boiler #4.</Text>
                <Text style={styles.notifTime}>2 hours ago</Text>
              </View>
            </View>

            <View style={[styles.notifItem, { borderBottomWidth: 0 }]}>
              <View style={[styles.notifDot, { backgroundColor: '#F59E0B' }]} />
              <View style={styles.notifBody}>
                <Text style={styles.notifSubject}>Annual Verification Reminder</Text>
                <Text style={styles.notifDesc}>Cummins DG Fuel System verification due in 14 days.</Text>
                <Text style={styles.notifTime}>1 day ago</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Profile Modal */}
      <Modal visible={showProfileModal} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowProfileModal(false)}
        >
          <View style={styles.profileCard}>
            <View style={styles.profileTop}>
              <View style={styles.largeAvatar}>
                <Text style={styles.largeAvatarText}>IO</Text>
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.profileOrg}>{user.organizationName}</Text>
                <Text style={styles.profileOfficer}>{user.authorizedOfficer}</Text>
                <Text style={styles.profileRole}>{user.designation}</Text>
              </View>
            </View>

            <View style={styles.profileDivider} />

            <View style={styles.profileDetailsRow}>
              <Ionicons name="business-outline" size={16} color={Colors.textMuted} />
              <Text style={styles.profileDetailText}>License: {user.licenseNo}</Text>
            </View>
            <View style={styles.profileDetailsRow}>
              <Ionicons name="location-outline" size={16} color={Colors.textMuted} />
              <Text style={styles.profileDetailText}>{user.plantLocation}</Text>
            </View>
            <View style={styles.profileDetailsRow}>
              <Ionicons name="mail-outline" size={16} color={Colors.textMuted} />
              <Text style={styles.profileDetailText}>{user.email}</Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                setShowProfileModal(false);
                router.replace('/login');
              }}
              style={styles.logoutBtn}
            >
              <Ionicons name="log-out-outline" size={16} color={Colors.accentRed} />
              <Text style={styles.logoutText}>Switch Account / Logout</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

// ======================== BOTTOM NAVIGATION BAR ========================
export const BottomNavBar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { label: 'Home', icon: 'grid-outline', activeIcon: 'grid', route: '/dashboard' },
    { label: 'Monitor', icon: 'analytics-outline', activeIcon: 'analytics', route: '/fuel-monitoring' },
    { label: 'Applications', icon: 'document-text-outline', activeIcon: 'document-text', route: '/application-status' },
    { label: 'Certificates', icon: 'ribbon-outline', activeIcon: 'ribbon', route: '/certificate' },
    { label: 'Profile', icon: 'person-outline', activeIcon: 'person', route: '/profile' },
  ];

  return (
    <View style={styles.navBarContainer}>
      {tabs.map((tab) => {
        const isActive = pathname === tab.route || (pathname === '/' && tab.route === '/dashboard');
        return (
          <TouchableOpacity
            key={tab.route}
            activeOpacity={0.7}
            onPress={() => router.push(tab.route as any)}
            style={styles.navItem}
          >
            <View style={[styles.iconWrapper, isActive && styles.iconWrapperActive]}>
              <Ionicons
                name={isActive ? (tab.activeIcon as any) : (tab.icon as any)}
                size={22}
                color={isActive ? '#FFFFFF' : '#64748B'}
              />
            </View>
            <Text
              style={[
                styles.navLabel,
                { color: isActive ? Colors.brandBlue : '#64748B', fontWeight: isActive ? '700' : '500' },
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: Colors.primary,
    paddingTop: 48,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoBadge: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: Colors.brandBlue,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  logoFlame: {
    position: 'absolute',
    bottom: 6,
  },
  brandTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1,
  },
  brandSub: {
    color: '#94A3B8',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 6,
  },
  backText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: Colors.accentAmber,
    borderRadius: 8,
    width: 17,
    height: 17,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  badgeNumber: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
  },
  avatarButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#059669',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#34D399',
  },
  avatarCircle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitials: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  titleSection: {
    marginTop: Spacing.md,
  },
  titleText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  subtitleText: {
    color: '#94A3B8',
    fontSize: 13,
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(11, 25, 44, 0.65)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 80,
    paddingRight: Spacing.lg,
  },
  notificationCard: {
    backgroundColor: '#FFFFFF',
    width: 320,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
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
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  notifItem: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  notifDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
    marginRight: 10,
  },
  notifBody: {
    flex: 1,
  },
  notifSubject: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  notifDesc: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
    lineHeight: 15,
  },
  notifTime: {
    fontSize: 10,
    color: Colors.textMuted,
    marginTop: 4,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    width: 320,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    ...Shadows.lg,
  },
  profileTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  largeAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#059669',
    justifyContent: 'center',
    alignItems: 'center',
  },
  largeAvatarText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  profileOrg: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.textPrimary,
    lineHeight: 16,
  },
  profileOfficer: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.brandBlue,
    marginTop: 2,
  },
  profileRole: {
    fontSize: 11,
    color: Colors.textMuted,
  },
  profileDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 12,
  },
  profileDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  profileDetailText: {
    fontSize: 12,
    color: Colors.textSecondary,
    flex: 1,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 12,
    paddingVertical: 8,
    backgroundColor: '#FEF2F2',
    borderRadius: 8,
  },
  logoutText: {
    color: Colors.accentRed,
    fontSize: 12,
    fontWeight: '700',
  },
  navBarContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 8,
    paddingBottom:
      Platform.OS === 'web'
        ? ('max(8px, env(safe-area-inset-bottom, 8px))' as any)
        : 10,
    paddingHorizontal: 4,
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    flexShrink: 0,
    zIndex: 999,
    ...Shadows.md,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    flex: 1,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapperActive: {
    backgroundColor: Colors.brandBlue,
  },
  navLabel: {
    fontSize: 10,
    marginTop: 2,
  },
});
