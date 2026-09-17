import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, Shadows } from '@/constants/theme';
import { FuelGuardLogo } from '@/components/FuelGuardLogo';
import { Button, InputField, Card } from '@/components/UIComponents';
import { useApp } from '@/context/AppContext';

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useApp();

  const [identifier, setIdentifier] = useState('riya.sharma@fuelguard.gov.in');
  const [password, setPassword] = useState('FuelGuard@2024');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);

  const handleLogin = () => {
    if (!identifier.trim() || !password.trim()) {
      Alert.alert('Required Fields', 'Please enter your registered email/mobile and password.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login();
      router.replace('/dashboard');
    }, 600);
  };

  const handleQuickFill = () => {
    setIdentifier('riya.sharma@fuelguard.gov.in');
    setPassword('FuelGuard@2024');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.screen}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Top Header Background Banner */}
        <View style={styles.topBanner}>
          <View style={styles.bannerBadge}>
            <Ionicons name="shield-checkmark" size={14} color="#10B981" />
            <Text style={styles.bannerBadgeText}>NATIONAL COMPLIANCE PORTAL</Text>
          </View>
          <FuelGuardLogo size="medium" showTagline theme="dark" />
        </View>

        {/* Login Form Container Card */}
        <View style={styles.formContainer}>
          <Card style={styles.loginCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Welcome to Fuel Guard</Text>
              <Text style={styles.cardSubtitle}>
                Smart Fuel Measurement & Compliance Verification Portal
              </Text>
            </View>

            {/* Quick Demo Pre-fill for Riya */}
            <TouchableOpacity
              style={styles.demoFillBanner}
              onPress={handleQuickFill}
              activeOpacity={0.7}
            >
              <Ionicons name="flash" size={16} color={Colors.brandBlue} />
              <View style={{ flex: 1 }}>
                <Text style={styles.demoFillTitle}>Demo Login: Riya Sharma</Text>
                <Text style={styles.demoFillSub}>IOCL Fuel Depot #4 • Quality Manager</Text>
              </View>
              <Ionicons name="checkmark-circle" size={16} color="#10B981" />
            </TouchableOpacity>

            {/* Inputs */}
            <InputField
              label="Mobile Number / Email"
              value={identifier}
              onChangeText={setIdentifier}
              placeholder="e.g. riya.sharma@fuelguard.gov.in"
              icon="mail-outline"
              required
            />

            <InputField
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••••••"
              icon="lock-closed-outline"
              secureTextEntry={!showPassword}
              required
              rightAction={
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={{ padding: 4 }}
                >
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color={Colors.textMuted}
                  />
                </TouchableOpacity>
              }
            />

            {/* Login Button */}
            <Button
              title="Login"
              onPress={handleLogin}
              variant="primary"
              size="lg"
              loading={loading}
              icon="log-in-outline"
              fullWidth
              style={{ marginTop: 8 }}
            />

            {/* Register as Industry User Button */}
            <Button
              title="Register as Industry User"
              onPress={() => setRegisterModal(true)}
              variant="outline"
              size="md"
              icon="business-outline"
              fullWidth
              style={{ marginTop: 12 }}
            />
          </Card>

          {/* Security Notice */}
          <View style={styles.prototypeNotice}>
            <Ionicons name="lock-closed-outline" size={14} color="#94A3B8" />
            <Text style={styles.prototypeNoticeText}>
              256-Bit Encrypted & Verified via Ministry of Petroleum & Legal Metrology.
            </Text>
          </View>
        </View>

        {/* Register Modal */}
        <Modal visible={registerModal} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <View style={styles.modalHeader}>
                <Ionicons name="business" size={24} color={Colors.accentTeal} />
                <Text style={styles.modalTitle}>Register as Industry User</Text>
              </View>
              <Text style={styles.modalDesc}>
                Register your fuel depot, petrol pump, or industrial fuel storage facility for smart metering verification.
              </Text>

              <View style={styles.registerSteps}>
                <View style={styles.stepItem}>
                  <Text style={styles.stepNum}>1</Text>
                  <Text style={styles.stepText}>Enter PESO / Legal Metrology Depot License</Text>
                </View>
                <View style={styles.stepItem}>
                  <Text style={styles.stepNum}>2</Text>
                  <Text style={styles.stepText}>Link Storage Tanks & Digital Flowmeters</Text>
                </View>
                <View style={styles.stepItem}>
                  <Text style={styles.stepNum}>3</Text>
                  <Text style={styles.stepText}>Activate Real-Time Compliance Ledger</Text>
                </View>
              </View>

              <Button
                title="Continue with Demo Depot Profile"
                onPress={() => {
                  setRegisterModal(false);
                  handleLogin();
                }}
                variant="primary"
                size="md"
                fullWidth
              />
              <Button
                title="Close"
                onPress={() => setRegisterModal(false)}
                variant="ghost"
                size="sm"
                fullWidth
                style={{ marginTop: 6 }}
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0B192C',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 32,
  },
  topBanner: {
    paddingTop: 54,
    paddingBottom: 24,
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  bannerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    gap: 6,
    marginBottom: 16,
  },
  bannerBadgeText: {
    color: '#CBD5E1',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  formContainer: {
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
  },
  loginCard: {
    width: '100%',
    maxWidth: 460,
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    ...Shadows.lg,
  },
  cardHeader: {
    marginBottom: Spacing.lg,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: Colors.textPrimary,
    letterSpacing: 0.2,
  },
  cardSubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 4,
    lineHeight: 18,
  },
  demoFillBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    borderRadius: 8,
    padding: 10,
    gap: 10,
    marginBottom: Spacing.lg,
  },
  demoFillTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.brandBlue,
  },
  demoFillSub: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  prototypeNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 18,
    maxWidth: 420,
    paddingHorizontal: 12,
  },
  prototypeNoticeText: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 15,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(11, 25, 44, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
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
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  modalDesc: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginBottom: Spacing.md,
  },
  registerSteps: {
    gap: 8,
    marginBottom: Spacing.lg,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#F8FAFC',
    padding: 10,
    borderRadius: 8,
  },
  stepNum: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Colors.brandBlue,
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 22,
  },
  stepText: {
    fontSize: 12,
    color: Colors.textPrimary,
    fontWeight: '600',
    flex: 1,
  },
});
