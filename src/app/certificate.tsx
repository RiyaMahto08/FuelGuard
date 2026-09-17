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
import { Card, Button, Badge } from '@/components/UIComponents';
import { useApp } from '@/context/AppContext';

export default function CertificateScreen() {
  const router = useRouter();
  const { certificates, user } = useApp();

  const cert = certificates[0] || {
    certificateNumber: 'FG/CERT/2026/00841',
    equipmentName: 'Fuel Dispensing Unit',
    fuelType: 'Diesel',
    equipmentId: 'FG-2026-001',
    verifiedQuantity: '8,420 L',
    qualityScore: '98.4%',
    verificationStatus: 'VERIFIED',
    verifiedBy: 'Harshit',
    validUntil: '20 September 2027',
    verificationDate: '20 September 2026',
    location: 'ABC Fuel Station',
    blockchainHash: '0x8f3c4e1b7a9d0265bb6291a457fe8901c3de76428135bc841029e0018f4ad923',
    qrPayload: 'https://fuelguard.gov.in/verify/FG/CERT/2026/00841',
  };

  const [verifyModal, setVerifyModal] = useState(false);
  const [fullViewModal, setFullViewModal] = useState(false);
  const [verifyingStatus, setVerifyingStatus] = useState<'idle' | 'checking' | 'verified'>('idle');

  const handleVerifyCertificate = () => {
    setVerifyingStatus('checking');
    setVerifyModal(true);
    setTimeout(() => {
      setVerifyingStatus('verified');
    }, 700);
  };

  return (
    <View style={styles.screen}>
      <Header
        title="Digital Certificate"
        subtitle="Cryptographically verified legal metrology clearance"
        showBack
      />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* ================= OFFICIAL DIGITAL CERTIFICATE FRAME ================= */}
        <View style={styles.certificateOuterFrame}>
          <View style={styles.certificateInnerFrame}>
            {/* Certificate Header Branding */}
            <View style={styles.certHeader}>
              <View style={styles.certLogoRow}>
                <View style={styles.brandIconBox}>
                  <Ionicons name="shield" size={24} color="#1D4ED8" />
                  <MaterialCommunityIcons
                    name="gas-station"
                    size={13}
                    color="#10B981"
                    style={styles.logoFlame}
                  />
                </View>
                <Text style={styles.brandTitle}>FUEL GUARD</Text>
              </View>

              <Text style={styles.certTitle}>DIGITAL VERIFICATION CERTIFICATE</Text>
              <Text style={styles.govSubTitle}>
                CENTRAL INDUSTRIAL FUEL & LEGAL METROLOGY REGULATORY REGISTRY
              </Text>
            </View>

            {/* Certificate Number & Status Row */}
            <View style={styles.certMetaRow}>
              <View>
                <Text style={styles.certNoLabel}>Certificate No:</Text>
                <Text style={styles.certNoValue}>{cert.certificateNumber}</Text>
              </View>

              <View style={styles.statusVerifiedBadge}>
                <Ionicons name="checkmark-done" size={14} color="#047857" />
                <Text style={styles.statusVerifiedText}>{cert.verificationStatus}</Text>
              </View>
            </View>

            {/* Equipment & Verification Specs Table */}
            <View style={styles.specsTable}>
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>Equipment:</Text>
                <Text style={styles.specVal}>{cert.equipmentName}</Text>
              </View>

              <View style={styles.specDualRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.specLabel}>Fuel Type:</Text>
                  <Text style={styles.specValBold}>{cert.fuelType}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.specLabel}>Equipment ID:</Text>
                  <Text style={[styles.specValBold, { color: Colors.brandBlue }]}>{cert.equipmentId}</Text>
                </View>
              </View>

              <View style={styles.specDualRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.specLabel}>Verified Quantity:</Text>
                  <Text style={styles.specValBold}>{cert.verifiedQuantity}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.specLabel}>Quality Score:</Text>
                  <Text style={[styles.specValBold, { color: '#047857' }]}>{cert.qualityScore}</Text>
                </View>
              </View>

              <View style={styles.specDualRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.specLabel}>Verified By:</Text>
                  <Text style={styles.specValBold}>{cert.verifiedBy} (Field Officer)</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.specLabel}>Valid Until:</Text>
                  <Text style={[styles.specValBold, { color: '#047857' }]}>{cert.validUntil}</Text>
                </View>
              </View>
            </View>

            {/* QR Code & Scan to Verify Section */}
            <View style={styles.qrSectionRow}>
              <View style={styles.qrCodeBox}>
                <MaterialCommunityIcons name="qrcode" size={72} color="#0B192C" />
                <Text style={styles.scanText}>Scan to Verify</Text>
              </View>

              <View style={styles.sealBox}>
                <View style={styles.sealStamp}>
                  <Ionicons name="shield-checkmark" size={16} color="#047857" />
                  <Text style={styles.sealStampText}>LEGAL METROLOGY SEAL</Text>
                </View>
                <Text style={styles.sealAuthority}>Govt. of India • Fuel Safety Authority</Text>
                <Text style={styles.sealLocation}>Station: {cert.location}</Text>
                <Text style={styles.sealHash} numberOfLines={1}>{cert.blockchainHash}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* ================= BUTTONS ================= */}
        <View style={styles.actionButtonsContainer}>
          <Button
            title="View Certificate"
            onPress={() => setFullViewModal(true)}
            variant="outline"
            size="lg"
            icon="eye-outline"
            fullWidth
            style={{ marginBottom: 10 }}
          />

          <Button
            title="Verify Certificate"
            onPress={handleVerifyCertificate}
            variant="success"
            size="lg"
            icon="shield-checkmark-outline"
            fullWidth
          />
        </View>
      </ScrollView>

      {/* ================= VERIFY CERTIFICATE MODAL ================= */}
      <Modal visible={verifyModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            {verifyingStatus === 'checking' ? (
              <View style={styles.verifyingState}>
                <Ionicons name="sync" size={42} color={Colors.brandBlue} />
                <Text style={styles.verifyingTitle}>Verifying Cryptographic Ledger...</Text>
                <Text style={styles.verifyingSub}>Querying Fuel Guard Decentralized Metrology Nodes</Text>
              </View>
            ) : (
              <View style={styles.verifiedState}>
                <View style={styles.verifiedIconBadge}>
                  <Ionicons name="checkmark-circle" size={46} color="#10B981" />
                </View>
                <Text style={styles.modalTitle}>Certificate 100% Authentic</Text>
                <Text style={styles.modalSubtitle}>
                  Verified by Legal Metrology Field Officer <Text style={{ fontWeight: '800', color: Colors.textPrimary }}>Harshit</Text> for <Text style={{ fontWeight: '800', color: Colors.brandBlue }}>Riya</Text> at ABC Fuel Station.
                </Text>

                <View style={styles.auditCheckList}>
                  <View style={styles.auditItem}>
                    <Ionicons name="checkmark" size={16} color="#10B981" />
                    <Text style={styles.auditText}>Certificate ID: {cert.certificateNumber}</Text>
                  </View>
                  <View style={styles.auditItem}>
                    <Ionicons name="checkmark" size={16} color="#10B981" />
                    <Text style={styles.auditText}>Volumetric Accuracy: 8,420 L Calibrated</Text>
                  </View>
                  <View style={styles.auditItem}>
                    <Ionicons name="checkmark" size={16} color="#10B981" />
                    <Text style={styles.auditText}>Validity: Active until {cert.validUntil}</Text>
                  </View>
                </View>

                <Button
                  title="Close Verification"
                  onPress={() => setVerifyModal(false)}
                  variant="primary"
                  fullWidth
                  size="md"
                />
              </View>
            )}
          </View>
        </View>
      </Modal>

      {/* ================= FULL VIEW MODAL ================= */}
      <Modal visible={fullViewModal} animationType="slide">
        <View style={styles.fullViewContainer}>
          <View style={styles.fullViewHeader}>
            <Text style={styles.fullViewTitle}>Digital Certificate Full View</Text>
            <TouchableOpacity onPress={() => setFullViewModal(false)}>
              <Ionicons name="close" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.fullViewScroll}>
            <View style={styles.fullCertWrapper}>
              <View style={styles.certHeader}>
                <Text style={styles.brandTitle}>FUEL GUARD</Text>
                <Text style={styles.certTitle}>DIGITAL VERIFICATION CERTIFICATE</Text>
              </View>

              <View style={styles.fullMetaBox}>
                <Text style={styles.fullMetaCertNo}>Certificate: {cert.certificateNumber}</Text>
                <Text style={styles.fullMetaValidity}>STATUS: {cert.verificationStatus}</Text>
              </View>

              <View style={styles.fullDetailsTable}>
                <View style={styles.fullTableRow}><Text style={styles.fullTableKey}>Equipment</Text><Text style={styles.fullTableVal}>{cert.equipmentName}</Text></View>
                <View style={styles.fullTableRow}><Text style={styles.fullTableKey}>Fuel Type</Text><Text style={styles.fullTableVal}>{cert.fuelType}</Text></View>
                <View style={styles.fullTableRow}><Text style={styles.fullTableKey}>Equipment ID</Text><Text style={styles.fullTableVal}>{cert.equipmentId}</Text></View>
                <View style={styles.fullTableRow}><Text style={styles.fullTableKey}>Verified Quantity</Text><Text style={styles.fullTableVal}>{cert.verifiedQuantity}</Text></View>
                <View style={styles.fullTableRow}><Text style={styles.fullTableKey}>Quality Score</Text><Text style={styles.fullTableVal}>{cert.qualityScore}</Text></View>
                <View style={styles.fullTableRow}><Text style={styles.fullTableKey}>Verified By</Text><Text style={styles.fullTableVal}>{cert.verifiedBy} (Field Officer)</Text></View>
                <View style={styles.fullTableRow}><Text style={styles.fullTableKey}>Valid Until</Text><Text style={[styles.fullTableVal, { color: '#047857' }]}>{cert.validUntil}</Text></View>
              </View>

              <View style={styles.fullBottomRow}>
                <MaterialCommunityIcons name="qrcode" size={80} color="#0B192C" />
                <View style={{ flex: 1, marginLeft: 16 }}>
                  <Text style={styles.fullStampHead}>LEGAL METROLOGY CERTIFIED</Text>
                  <Text style={styles.fullStampBody}>Signed with SHA-256 token by Harshit on 20-09-2026</Text>
                </View>
              </View>
            </View>

            <Button
              title="Close Preview"
              onPress={() => setFullViewModal(false)}
              variant="primary"
              size="lg"
              fullWidth
              style={{ marginTop: 20 }}
            />
          </ScrollView>
        </View>
      </Modal>

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
  certificateOuterFrame: {
    backgroundColor: '#FAF9F6',
    borderWidth: 3,
    borderColor: '#D4AF37', // Gold statutory seal border
    borderRadius: 14,
    padding: 6,
    marginBottom: Spacing.lg,
    ...Shadows.lg,
  },
  certificateInnerFrame: {
    borderWidth: 1.5,
    borderColor: '#0B192C',
    borderRadius: 10,
    padding: Spacing.md,
    backgroundColor: '#FFFFFF',
  },
  certHeader: {
    alignItems: 'center',
    borderBottomWidth: 1.5,
    borderBottomColor: '#E2E8F0',
    paddingBottom: 10,
    marginBottom: 10,
  },
  certLogoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  brandIconBox: {
    position: 'relative',
  },
  logoFlame: {
    position: 'absolute',
    top: 8,
    left: 5,
  },
  brandTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0B192C',
    letterSpacing: 1,
  },
  certTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: Colors.brandBlue,
    letterSpacing: 0.8,
    textAlign: 'center',
    marginTop: 2,
  },
  govSubTitle: {
    fontSize: 8,
    color: Colors.textMuted,
    fontWeight: '800',
    letterSpacing: 0.8,
    textAlign: 'center',
    marginTop: 2,
  },
  certMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 8,
    borderRadius: 6,
    marginBottom: 10,
  },
  certNoLabel: {
    fontSize: 9,
    color: Colors.textMuted,
    fontWeight: '800',
  },
  certNoValue: {
    fontSize: 13,
    fontWeight: '900',
    color: Colors.brandBlue,
  },
  statusVerifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    gap: 4,
  },
  statusVerifiedText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#047857',
  },
  specsTable: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    gap: 6,
  },
  specRow: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 4,
  },
  specLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.textMuted,
  },
  specVal: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  specDualRow: {
    flexDirection: 'row',
    gap: 8,
  },
  specValBold: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  qrSectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  qrCodeBox: {
    alignItems: 'center',
  },
  scanText: {
    fontSize: 9,
    fontWeight: '800',
    color: Colors.brandBlue,
    marginTop: 2,
  },
  sealBox: {
    alignItems: 'flex-end',
    maxWidth: '65%',
  },
  sealStamp: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    marginBottom: 4,
  },
  sealStampText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#047857',
  },
  sealAuthority: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  sealLocation: {
    fontSize: 9,
    color: Colors.textSecondary,
  },
  sealHash: {
    fontSize: 8,
    color: Colors.textMuted,
    marginTop: 2,
  },
  actionButtonsContainer: {
    marginBottom: Spacing.xxl,
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
    alignItems: 'center',
    ...Shadows.lg,
  },
  verifyingState: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  verifyingTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginTop: 12,
  },
  verifyingSub: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 4,
  },
  verifiedState: {
    alignItems: 'center',
    width: '100%',
  },
  verifiedIconBadge: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#A7F3D0',
    marginBottom: Spacing.md,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginVertical: 8,
    lineHeight: 16,
  },
  auditCheckList: {
    width: '100%',
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: Spacing.md,
    gap: 6,
    marginBottom: Spacing.lg,
  },
  auditItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  auditText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  fullViewContainer: {
    flex: 1,
    backgroundColor: '#0B192C',
  },
  fullViewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  fullViewTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  fullViewScroll: {
    padding: Spacing.lg,
  },
  fullCertWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: Spacing.lg,
    borderWidth: 2,
    borderColor: '#D4AF37',
  },
  fullMetaBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    padding: 10,
    borderRadius: 6,
    marginVertical: 10,
  },
  fullMetaCertNo: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.brandBlue,
  },
  fullMetaValidity: {
    fontSize: 12,
    fontWeight: '800',
    color: '#047857',
  },
  fullDetailsTable: {
    gap: 8,
    marginVertical: 10,
  },
  fullTableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  fullTableKey: {
    fontSize: 12,
    color: Colors.textMuted,
    fontWeight: '600',
  },
  fullTableVal: {
    fontSize: 12,
    color: Colors.textPrimary,
    fontWeight: '700',
    maxWidth: '60%',
    textAlign: 'right',
  },
  fullBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  fullStampHead: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.primary,
  },
  fullStampBody: {
    fontSize: 10,
    color: Colors.textSecondary,
    marginTop: 2,
  },
});
