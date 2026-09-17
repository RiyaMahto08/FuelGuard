import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';

interface FuelGuardLogoProps {
  size?: 'small' | 'medium' | 'large';
  showTagline?: boolean;
  theme?: 'light' | 'dark';
}

export const FuelGuardLogo: React.FC<FuelGuardLogoProps> = ({
  size = 'medium',
  showTagline = false,
  theme = 'light',
}) => {
  const isLarge = size === 'large';
  const isSmall = size === 'small';

  const iconContainerSize = isLarge ? 88 : isSmall ? 40 : 54;
  const flameSize = isLarge ? 42 : isSmall ? 20 : 28;
  const titleFontSize = isLarge ? 32 : isSmall ? 18 : 22;

  const isDark = theme === 'dark';

  return (
    <View style={styles.container}>
      {/* High-tech Shield & Fuel Pump Brand Icon */}
      <View
        style={[
          styles.iconContainer,
          {
            width: iconContainerSize,
            height: iconContainerSize,
            borderRadius: iconContainerSize * 0.32,
            backgroundColor: isDark ? '#1E3E62' : '#0B192C',
          },
        ]}
      >
        <View style={styles.iconGlow} />
        <View style={styles.shieldBackground}>
          <Ionicons
            name="shield"
            size={iconContainerSize * 0.72}
            color="#1D4ED8"
            style={styles.shieldIcon}
          />
          <View style={styles.flameOverlay}>
            <MaterialCommunityIcons
              name="gas-station"
              size={flameSize}
              color="#10B981"
            />
          </View>
        </View>
      </View>

      {/* Brand Typography */}
      <View style={styles.textContainer}>
        <View style={styles.titleRow}>
          <Text
            style={[
              styles.titleFuel,
              {
                fontSize: titleFontSize,
                color: isDark ? '#FFFFFF' : '#0B192C',
              },
            ]}
          >
            FUEL
          </Text>
          <Text
            style={[
              styles.titleGuard,
              {
                fontSize: titleFontSize,
                color: '#1D4ED8',
              },
            ]}
          >
            GUARD
          </Text>
          <View style={styles.sihPill}>
            <Text style={styles.sihText}>OFFICIAL</Text>
          </View>
        </View>

        {showTagline && (
          <Text
            style={[
              styles.tagline,
              {
                color: isDark ? '#94A3B8' : '#475569',
                fontSize: isLarge ? 14 : 12,
              },
            ]}
          >
            Smart Fuel Monitoring & Verification
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0052CC',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.18)',
    position: 'relative',
  },
  iconGlow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 20,
    backgroundColor: 'rgba(29, 78, 216, 0.15)',
  },
  shieldBackground: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  shieldIcon: {
    opacity: 0.9,
  },
  flameOverlay: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 3,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  titleFuel: {
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  titleGuard: {
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  sihPill: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    marginLeft: 6,
  },
  sihText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#047857',
    letterSpacing: 0.5,
  },
  tagline: {
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 4,
    letterSpacing: 0.3,
  },
});
