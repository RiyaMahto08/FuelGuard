import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProvider } from '@/context/AppContext';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <StatusBar style="light" />
        <View style={styles.outerContainer}>
          <View style={styles.mobileAppContainer}>
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: '#F8FAFC', flex: 1, height: '100%' },
                animation: 'slide_from_right',
              }}
            >
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="login" options={{ headerShown: false }} />
              <Stack.Screen name="dashboard" options={{ headerShown: false }} />
              <Stack.Screen name="fuel-monitoring" options={{ headerShown: false }} />
              <Stack.Screen name="register-equipment" options={{ headerShown: false }} />
              <Stack.Screen name="application-form" options={{ headerShown: false }} />
              <Stack.Screen name="application-status" options={{ headerShown: false }} />
              <Stack.Screen name="verification-details" options={{ headerShown: false }} />
              <Stack.Screen name="certificate" options={{ headerShown: false }} />
              <Stack.Screen name="profile" options={{ headerShown: false }} />
            </Stack>
          </View>
        </View>
      </AppProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#0B192C',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    height: Platform.OS === 'web' ? ('100dvh' as any) : '100%',
    maxHeight: Platform.OS === 'web' ? ('100dvh' as any) : '100%',
    overflow: 'hidden',
  },
  mobileAppContainer: {
    width: '100%',
    maxWidth: 480,
    flex: 1,
    height: Platform.OS === 'web' ? ('100dvh' as any) : '100%',
    maxHeight: Platform.OS === 'web' ? ('100dvh' as any) : '100%',
    backgroundColor: '#F8FAFC',
    overflow: 'hidden',
    position: 'relative',
    // Premium device frame shadows and border on desktop web
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 16,
    borderLeftWidth: Platform.OS === 'web' ? 1 : 0,
    borderRightWidth: Platform.OS === 'web' ? 1 : 0,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
});
