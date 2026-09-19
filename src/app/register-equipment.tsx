import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, Shadows } from '@/constants/theme';
import { Header, BottomNavBar } from '@/components/Header';
import { Card, Button, InputField, SuccessModal } from '@/components/UIComponents';
import { useApp } from '@/context/AppContext';
import { EQUIPMENT_TYPES, FUEL_TYPES } from '@/data/mockData';

export default function RegisterEquipmentScreen() {
  const router = useRouter();
  const { addEquipment, user } = useApp();

  const [equipmentName, setEquipmentName] = useState('Wayne Century Fuel Dispensing Unit');
  const [equipmentType, setEquipmentType] = useState(EQUIPMENT_TYPES[0]);
  const [manufacturer, setManufacturer] = useState('Dover Fueling Solutions');
  const [modelNumber, setModelNumber] = useState('DFS-WAYNE-500');
  const [serialNumber, setSerialNumber] = useState('SN-2026-8841');
  const [fuelType, setFuelType] = useState(FUEL_TYPES[0]);
  const [tankCapacity, setTankCapacity] = useState('10,000 L');
  const [location, setLocation] = useState('ABC Fuel Station, Bay 1');

  const [loading, setLoading] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [registeredEquipmentId, setRegisteredEquipmentId] = useState('FG-2026-001');

  // Quick autofill preset
  const handleAutoFill = () => {
    setEquipmentName('Wayne Century Fuel Dispensing Unit');
    setEquipmentType('Fuel Dispensing Unit');
    setManufacturer('Dover Fueling Solutions');
    setModelNumber('DFS-WAYNE-500');
    setSerialNumber('SN-2026-8841');
    setFuelType('Diesel');
    setTankCapacity('10,000 L');
    setLocation('ABC Fuel Station, Bay 1');
  };

  const handleSubmit = () => {
    if (!equipmentName.trim() || !manufacturer.trim() || !modelNumber.trim() || !serialNumber.trim()) {
      Alert.alert('Required Information', 'Please fill in all mandatory equipment details.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const newEq = addEquipment({
        name: equipmentName.trim(),
        type: equipmentType,
        manufacturer: manufacturer.trim(),
        modelNumber: modelNumber.trim(),
        serialNumber: serialNumber.trim(),
        fuelType: fuelType,
        capacity: tankCapacity.trim(),
        location: location.trim(),
        dateOfInstallation: '12 January 2024',
        lastVerificationDate: '20 September 2026',
      });

      setRegisteredEquipmentId(newEq.id || 'FG-2026-001');
      setLoading(false);
      setSuccessModalVisible(true);
    }, 600);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.screen}
    >
      <Header
        title="Register Fuel Equipment"
        subtitle="Catalog fuel dispensers, storage tanks & digital flowmeters"
        showBack
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Sample Autofill Card */}
        <View style={styles.topActionRow}>
          <TouchableOpacity
            onPress={handleAutoFill}
            style={styles.autoFillBtn}
            activeOpacity={0.7}
          >
            <Ionicons name="sparkles" size={14} color={Colors.brandBlue} />
            <Text style={styles.autoFillText}>Auto-Fill Mock Dispenser Specs</Text>
          </TouchableOpacity>
        </View>

        {/* Section 1: Equipment Details */}
        <Card style={styles.sectionCard}>
          <View style={styles.sectionTitleRow}>
            <View style={styles.sectionIconBadge}>
              <Ionicons name="construct" size={16} color={Colors.brandBlue} />
            </View>
            <Text style={styles.sectionTitle}>Equipment Identification</Text>
          </View>

          <InputField
            label="Equipment Name"
            value={equipmentName}
            onChangeText={setEquipmentName}
            placeholder="e.g. Wayne Century Fuel Dispensing Unit"
            icon="pricetag-outline"
            required
          />

          <Text style={styles.fieldLabel}>Equipment Type *</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pillsScroll}>
            <View style={styles.pillsRow}>
              {EQUIPMENT_TYPES.map((type) => {
                const isSelected = equipmentType === type;
                return (
                  <TouchableOpacity
                    key={type}
                    onPress={() => setEquipmentType(type)}
                    style={[styles.typePill, isSelected && styles.typePillSelected]}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name={isSelected ? 'checkmark-circle' : 'radio-button-off'}
                      size={14}
                      color={isSelected ? '#FFFFFF' : Colors.textMuted}
                    />
                    <Text style={[styles.typePillText, isSelected && styles.typePillTextSelected]}>
                      {type}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>

          <InputField
            label="Manufacturer"
            value={manufacturer}
            onChangeText={setManufacturer}
            placeholder="e.g. Dover Fueling Solutions / L&T"
            icon="business-outline"
            required
          />

          <View style={styles.dualRow}>
            <View style={{ flex: 1 }}>
              <InputField
                label="Model Number"
                value={modelNumber}
                onChangeText={setModelNumber}
                placeholder="DFS-WAYNE-500"
                icon="barcode-outline"
                required
              />
            </View>
            <View style={{ flex: 1 }}>
              <InputField
                label="Serial Number"
                value={serialNumber}
                onChangeText={setSerialNumber}
                placeholder="SN-2026-8841"
                icon="qr-code-outline"
                required
              />
            </View>
          </View>
        </Card>

        {/* Section 2: Fuel Type & Operational Specs */}
        <Card style={styles.sectionCard}>
          <View style={styles.sectionTitleRow}>
            <View style={styles.sectionIconBadge}>
              <MaterialCommunityIcons name="gas-cylinder" size={16} color={Colors.accentTeal} />
            </View>
            <Text style={styles.sectionTitle}>Fuel & Storage Specifications</Text>
          </View>

          <Text style={styles.fieldLabel}>Fuel Type *</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pillsScroll}>
            <View style={styles.pillsRow}>
              {FUEL_TYPES.map((fType) => {
                const isSelected = fuelType === fType;
                return (
                  <TouchableOpacity
                    key={fType}
                    onPress={() => setFuelType(fType)}
                    style={[styles.typePill, isSelected && styles.typePillSelected]}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name={isSelected ? 'checkmark-circle' : 'radio-button-off'}
                      size={14}
                      color={isSelected ? '#FFFFFF' : Colors.textMuted}
                    />
                    <Text style={[styles.typePillText, isSelected && styles.typePillTextSelected]}>
                      {fType}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>

          <View style={styles.dualRow}>
            <View style={{ flex: 1 }}>
              <InputField
                label="Tank Capacity"
                value={tankCapacity}
                onChangeText={setTankCapacity}
                placeholder="e.g. 10,000 L"
                icon="scale-outline"
                required
              />
            </View>
            <View style={{ flex: 1.2 }}>
              <InputField
                label="Installation Location"
                value={location}
                onChangeText={setLocation}
                placeholder="e.g. ABC Fuel Station, Bay 1"
                icon="location-outline"
                required
              />
            </View>
          </View>
        </Card>

        {/* Submit Button */}
        <Button
          title="Register Equipment"
          onPress={handleSubmit}
          variant="primary"
          size="lg"
          loading={loading}
          icon="checkmark-circle-outline"
          fullWidth
          style={{ marginTop: 4, marginBottom: 20 }}
        />
      </ScrollView>

      {/* Success Modal */}
      <SuccessModal
        visible={successModalVisible}
        title="Equipment Registered Successfully"
        subtitle="Your fuel dispensing unit is now logged in the Fuel Guard compliance registry."
        referenceIdLabel="Assigned Equipment ID"
        referenceId={registeredEquipmentId}
        primaryButtonText="Apply for Verification"
        onPrimaryAction={() => {
          setSuccessModalVisible(false);
          router.push('/application-form');
        }}
        secondaryButtonText="Back to Dashboard"
        onSecondaryAction={() => {
          setSuccessModalVisible(false);
          router.push('/dashboard');
        }}
        additionalDetails={[
          { label: 'Equipment Name', value: equipmentName },
          { label: 'Equipment Type', value: equipmentType },
          { label: 'Fuel Type', value: fuelType },
          { label: 'Location', value: location },
        ]}
      />

      <BottomNavBar />
    </KeyboardAvoidingView>
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
  topActionRow: {
    alignItems: 'flex-end',
    marginBottom: Spacing.md,
  },
  autoFillBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 6,
  },
  autoFillText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.brandBlue,
  },
  sectionCard: {
    marginBottom: Spacing.md,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 8,
  },
  sectionIconBadge: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  pillsScroll: {
    marginBottom: Spacing.md,
  },
  pillsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  typePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  typePillSelected: {
    backgroundColor: Colors.brandBlue,
    borderColor: Colors.brandBlue,
  },
  typePillText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  typePillTextSelected: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  dualRow: {
    flexDirection: 'row',
    gap: 12,
  },
});
