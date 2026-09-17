import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

export default function ExploreScreen() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/');
  }, [router]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#1D4ED8" />
      <Text style={styles.text}>Redirecting to Fuel Guard...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B192C',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  text: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '600',
  },
});
