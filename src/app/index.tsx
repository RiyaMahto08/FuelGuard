import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, Shadows } from '@/constants/theme';
import { FuelGuardLogo } from '@/components/FuelGuardLogo';

export default function SplashScreen() {
  const router = useRouter();
  const [progress] = useState(new Animated.Value(0));
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    // Fade in content
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();

    // Progress bar animation
    Animated.timing(progress, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start();

    // Auto navigate to Login after short delay
    const timer = setTimeout(() => {
      router.replace('/login');
    }, 2200);

    return () => clearTimeout(timer);
  }, [router]);

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const handleSkip = () => {
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      {/* Background Tech Rings */}
      <View style={styles.decorativeRing1} />
      <View style={styles.decorativeRing2} />

      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {/* National Initiative Badge */}
        <View style={styles.authorityPill}>
          <Ionicons name="shield-checkmark" size={14} color="#10B981" />
          <Text style={styles.authorityText}>
            NATIONAL STATUTORY COMPLIANCE REGISTRY
          </Text>
        </View>

        {/* Center Fuel Guard Logo & Tagline */}
        <View style={styles.logoSection}>
          <FuelGuardLogo size="large" showTagline theme="dark" />
        </View>

        {/* Feature Highlights */}
        <View style={styles.featuresRow}>
          <View style={styles.featureBadge}>
            <Ionicons name="speedometer-outline" size={14} color="#38BDF8" />
            <Text style={styles.featureBadgeText}>Real-Time Quantity</Text>
          </View>
          <View style={styles.featureBadge}>
            <Ionicons name="flask-outline" size={14} color="#34D399" />
            <Text style={styles.featureBadgeText}>Quality & Purity Check</Text>
          </View>
          <View style={styles.featureBadge}>
            <Ionicons name="checkmark-done-outline" size={14} color="#A78BFA" />
            <Text style={styles.featureBadgeText}>Legal Metrology</Text>
          </View>
        </View>

        {/* Loading Progress & Get Started */}
        <View style={styles.bottomSection}>
          <View style={styles.progressBarContainer}>
            <Animated.View style={[styles.progressBarFill, { width: progressWidth }]} />
          </View>
          <Text style={styles.loadingStatus}>
            Initializing Smart Fuel Monitoring & Verification...
          </Text>

          <TouchableOpacity
            style={styles.proceedButton}
            onPress={handleSkip}
            activeOpacity={0.8}
          >
            <Text style={styles.proceedButtonText}>Get Started</Text>
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Prototype Footer */}
        <Text style={styles.footerNote}>
          Smart Fuel Measurement & Statutory Compliance System
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B192C',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  decorativeRing1: {
    position: 'absolute',
    width: 600,
    height: 600,
    borderRadius: 300,
    borderWidth: 1,
    borderColor: 'rgba(29, 78, 216, 0.12)',
    top: -150,
    right: -150,
  },
  decorativeRing2: {
    position: 'absolute',
    width: 400,
    height: 400,
    borderRadius: 200,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.12)',
    bottom: -100,
    left: -100,
  },
  content: {
    flex: 1,
    width: '100%',
    maxWidth: 460,
    paddingHorizontal: Spacing.xl,
    paddingVertical: 56,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  authorityPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    gap: 8,
  },
  authorityText: {
    color: '#E2E8F0',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  logoSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  featuresRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  featureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 32, 66, 0.8)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    gap: 6,
  },
  featureBadgeText: {
    color: '#CBD5E1',
    fontSize: 11,
    fontWeight: '600',
  },
  bottomSection: {
    width: '100%',
    alignItems: 'center',
    gap: 12,
  },
  progressBarContainer: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#10B981',
  },
  loadingStatus: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '500',
  },
  proceedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1D4ED8',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
    width: '100%',
    gap: 8,
    marginTop: 8,
    ...Shadows.glowBlue,
  },
  proceedButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  footerNote: {
    color: '#64748B',
    fontSize: 11,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 14,
  },
});
