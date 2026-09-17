import React, { ReactNode } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  Modal,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, Shadows } from '@/constants/theme';

// ======================== BADGE COMPONENT ========================
export type BadgeVariant =
  | 'Compliant'
  | 'Approved'
  | 'Verification Due'
  | 'Under Inspection'
  | 'Inspection Scheduled'
  | 'Documents Verified'
  | 'Submitted'
  | 'Pending'
  | 'Non-Compliant'
  | 'Rejected'
  | 'Primary'
  | 'Info';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant | string;
  size?: 'sm' | 'md';
  icon?: keyof typeof Ionicons.glyphMap;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'Primary',
  size = 'md',
  icon,
}) => {
  const getBadgeStyle = () => {
    switch (variant) {
      case 'Compliant':
      case 'Approved':
      case 'verified':
        return { bg: '#ECFDF5', text: '#065F46', border: '#A7F3D0', iconName: 'checkmark-circle' as const };
      case 'Inspection Scheduled':
      case 'Under Inspection':
        return { bg: '#EFF6FF', text: '#1E40AF', border: '#BFDBFE', iconName: 'calendar' as const };
      case 'Documents Verified':
        return { bg: '#F5F3FF', text: '#5B21B6', border: '#DDD6FE', iconName: 'document-text' as const };
      case 'Verification Due':
      case 'Submitted':
      case 'Pending':
        return { bg: '#FFFBEB', text: '#92400E', border: '#FDE68A', iconName: 'time' as const };
      case 'Non-Compliant':
      case 'Rejected':
        return { bg: '#FEF2F2', text: '#991B1B', border: '#FECACA', iconName: 'alert-circle' as const };
      case 'Info':
      case 'Primary':
      default:
        return { bg: '#F1F5F9', text: '#334155', border: '#CBD5E1', iconName: 'information-circle' as const };
    }
  };

  const styleConfig = getBadgeStyle();
  const iconToRender = icon || styleConfig.iconName;
  const isSmall = size === 'sm';

  return (
    <View
      style={[
        styles.badgeContainer,
        {
          backgroundColor: styleConfig.bg,
          borderColor: styleConfig.border,
          paddingVertical: isSmall ? 3 : 5,
          paddingHorizontal: isSmall ? 8 : 10,
        },
      ]}
    >
      <Ionicons
        name={iconToRender}
        size={isSmall ? 11 : 13}
        color={styleConfig.text}
        style={{ marginRight: 4 }}
      />
      <Text
        style={[
          styles.badgeText,
          {
            color: styleConfig.text,
            fontSize: isSmall ? 11 : 12,
          },
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

// ======================== BUTTON COMPONENT ========================
interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'success' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  iconPosition?: 'left' | 'right';
  style?: StyleProp<ViewStyle>;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  style,
  textStyle,
  fullWidth = false,
}) => {
  const getButtonStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          bg: Colors.brandBlue,
          border: 'transparent',
          textColor: '#FFFFFF',
          iconColor: '#FFFFFF',
        };
      case 'secondary':
        return {
          bg: Colors.primaryLight,
          border: 'transparent',
          textColor: '#FFFFFF',
          iconColor: '#FFFFFF',
        };
      case 'success':
        return {
          bg: Colors.accentGreen,
          border: 'transparent',
          textColor: '#FFFFFF',
          iconColor: '#FFFFFF',
        };
      case 'outline':
        return {
          bg: '#FFFFFF',
          border: Colors.borderDark,
          textColor: Colors.textPrimary,
          iconColor: Colors.brandBlue,
        };
      case 'danger':
        return {
          bg: Colors.accentRed,
          border: 'transparent',
          textColor: '#FFFFFF',
          iconColor: '#FFFFFF',
        };
      case 'ghost':
      default:
        return {
          bg: 'transparent',
          border: 'transparent',
          textColor: Colors.brandBlue,
          iconColor: Colors.brandBlue,
        };
    }
  };

  const config = getButtonStyles();
  const isSm = size === 'sm';
  const isLg = size === 'lg';

  const paddingV = isSm ? 8 : isLg ? 16 : 12;
  const paddingH = isSm ? 12 : isLg ? 24 : 18;
  const fontSize = isSm ? 13 : isLg ? 16 : 14;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.buttonBase,
        {
          backgroundColor: disabled ? '#94A3B8' : config.bg,
          borderColor: config.border,
          borderWidth: variant === 'outline' ? 1.5 : 0,
          paddingVertical: paddingV,
          paddingHorizontal: paddingH,
          width: fullWidth ? '100%' : 'auto',
          opacity: disabled ? 0.65 : 1,
        },
        variant === 'primary' && !disabled ? Shadows.md : {},
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={config.textColor} size="small" />
      ) : (
        <View style={styles.buttonContent}>
          {icon && iconPosition === 'left' && (
            <Ionicons
              name={icon}
              size={fontSize + 3}
              color={config.iconColor}
              style={{ marginRight: 8 }}
            />
          )}
          <Text
            style={[
              styles.buttonText,
              {
                color: config.textColor,
                fontSize,
              },
              textStyle,
            ]}
          >
            {title}
          </Text>
          {icon && iconPosition === 'right' && (
            <Ionicons
              name={icon}
              size={fontSize + 3}
              color={config.iconColor}
              style={{ marginLeft: 8 }}
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

import { StyleProp } from 'react-native';

interface CardProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  elevated?: boolean;
  bordered?: boolean;
  accentColor?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  onPress,
  elevated = true,
  bordered = true,
  accentColor,
}) => {
  const CardContainer = onPress ? TouchableOpacity : View;

  return (
    <CardContainer
      activeOpacity={0.92}
      onPress={onPress}
      style={[
        styles.card,
        bordered && styles.cardBordered,
        elevated && Shadows.sm,
        accentColor ? { borderLeftWidth: 4, borderLeftColor: accentColor } : {},
        style,
      ]}
    >
      {children}
    </CardContainer>
  );
};

// ======================== INPUT FIELD ========================
interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  multiline?: boolean;
  numberOfLines?: number;
  helperText?: string;
  error?: string;
  required?: boolean;
  editable?: boolean;
  onPress?: () => void;
  rightAction?: ReactNode;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  icon,
  secureTextEntry,
  keyboardType = 'default',
  multiline = false,
  numberOfLines = 1,
  helperText,
  error,
  required = false,
  editable = true,
  onPress,
  rightAction,
}) => {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <View style={styles.inputGroup}>
      <View style={styles.labelRow}>
        <Text style={styles.inputLabel}>{label}</Text>
        {required && <Text style={styles.requiredStar}> *</Text>}
      </View>

      <TouchableOpacity
        activeOpacity={onPress ? 0.7 : 1}
        onPress={onPress}
        disabled={!onPress}
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
          error ? styles.inputContainerError : {},
          !editable && styles.inputDisabled,
          multiline ? { minHeight: 90, alignItems: 'flex-start' } : {},
        ]}
      >
        {icon && (
          <Ionicons
            name={icon}
            size={18}
            color={isFocused ? Colors.brandBlue : Colors.textMuted}
            style={[styles.inputIcon, multiline ? { marginTop: 10 } : {}]}
          />
        )}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={Colors.textMuted}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={numberOfLines}
          editable={editable && !onPress}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={[
            styles.textInput,
            multiline ? { textAlignVertical: 'top', paddingTop: 8 } : {},
          ]}
        />
        {rightAction}
      </TouchableOpacity>

      {helperText && !error && (
        <Text style={styles.helperText}>{helperText}</Text>
      )}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

// ======================== SUCCESS MODAL ========================
interface SuccessModalProps {
  visible: boolean;
  title: string;
  subtitle: string;
  referenceIdLabel: string;
  referenceId: string;
  primaryButtonText: string;
  onPrimaryAction: () => void;
  secondaryButtonText?: string;
  onSecondaryAction?: () => void;
  iconName?: keyof typeof Ionicons.glyphMap;
  additionalDetails?: Array<{ label: string; value: string }>;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  visible,
  title,
  subtitle,
  referenceIdLabel,
  referenceId,
  primaryButtonText,
  onPrimaryAction,
  secondaryButtonText,
  onSecondaryAction,
  iconName = 'checkmark-circle',
  additionalDetails,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalBackdrop}>
        <View style={styles.modalCard}>
          {/* Animated Success Seal */}
          <View style={styles.successIconBadge}>
            <Ionicons name={iconName} size={48} color="#10B981" />
          </View>

          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalSubtitle}>{subtitle}</Text>

          {/* Reference ID Container */}
          <View style={styles.refIdBox}>
            <Text style={styles.refIdLabel}>{referenceIdLabel}</Text>
            <View style={styles.refIdValueRow}>
              <Text style={styles.refIdValue}>{referenceId}</Text>
              <TouchableOpacity
                onPress={handleCopy}
                style={styles.copyButton}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={copied ? 'checkmark' : 'copy-outline'}
                  size={16}
                  color={copied ? '#10B981' : Colors.brandBlue}
                />
                <Text
                  style={[
                    styles.copyText,
                    copied ? { color: '#10B981' } : {},
                  ]}
                >
                  {copied ? 'Copied' : 'Copy'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Additional details */}
          {additionalDetails && additionalDetails.length > 0 && (
            <View style={styles.detailsList}>
              {additionalDetails.map((detail, index) => (
                <View key={index} style={styles.detailItem}>
                  <Text style={styles.detailLabel}>{detail.label}</Text>
                  <Text style={styles.detailValue}>{detail.value}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Action Buttons */}
          <View style={styles.modalActions}>
            <Button
              title={primaryButtonText}
              onPress={onPrimaryAction}
              variant="primary"
              fullWidth
              size="lg"
            />
            {secondaryButtonText && onSecondaryAction && (
              <Button
                title={secondaryButtonText}
                onPress={onSecondaryAction}
                variant="outline"
                fullWidth
                size="md"
                style={{ marginTop: 8 }}
              />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

// ======================== SECTION HEADER ========================
export const SectionHeader: React.FC<{
  title: string;
  actionText?: string;
  onActionPress?: () => void;
  subtitle?: string;
}> = ({ title, actionText, onActionPress, subtitle }) => (
  <View style={styles.sectionHeaderContainer}>
    <View>
      <Text style={styles.sectionHeaderTitle}>{title}</Text>
      {subtitle && <Text style={styles.sectionHeaderSubtitle}>{subtitle}</Text>}
    </View>
    {actionText && onActionPress && (
      <TouchableOpacity onPress={onActionPress} activeOpacity={0.7}>
        <Text style={styles.sectionHeaderAction}>{actionText}</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  buttonBase: {
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
  },
  cardBordered: {
    borderWidth: 1,
    borderColor: Colors.border,
  },
  inputGroup: {
    marginBottom: Spacing.lg,
    width: '100%',
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
    letterSpacing: 0.2,
  },
  requiredStar: {
    color: Colors.accentRed,
    fontWeight: '700',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    paddingHorizontal: 12,
    minHeight: 48,
  },
  inputContainerFocused: {
    borderColor: Colors.brandBlue,
    backgroundColor: '#FAFCFF',
  },
  inputContainerError: {
    borderColor: Colors.accentRed,
    backgroundColor: '#FEF2F2',
  },
  inputDisabled: {
    backgroundColor: Colors.surfaceMuted,
    opacity: 0.8,
  },
  inputIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.textPrimary,
    paddingVertical: 8,
  },
  helperText: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 4,
  },
  errorText: {
    fontSize: 12,
    color: Colors.accentRed,
    fontWeight: '600',
    marginTop: 4,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(11, 25, 44, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.xl,
    padding: Spacing.xxl,
    width: '100%',
    maxWidth: 420,
    alignItems: 'center',
    ...Shadows.lg,
  },
  successIconBadge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    borderWidth: 2,
    borderColor: '#A7F3D0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 6,
  },
  modalSubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.lg,
    lineHeight: 18,
  },
  refIdBox: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    width: '100%',
    marginBottom: Spacing.lg,
  },
  refIdLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  refIdValueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  refIdValue: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.brandBlue,
    letterSpacing: 0.5,
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  copyText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.brandBlue,
  },
  detailsList: {
    width: '100%',
    backgroundColor: '#F8FAFC',
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
    gap: 8,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailLabel: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  detailValue: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textPrimary,
    maxWidth: '60%',
    textAlign: 'right',
  },
  modalActions: {
    width: '100%',
  },
  sectionHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: Spacing.md,
    marginTop: Spacing.sm,
  },
  sectionHeaderTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.textPrimary,
    letterSpacing: 0.2,
  },
  sectionHeaderSubtitle: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
  },
  sectionHeaderAction: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.brandBlue,
  },
});
