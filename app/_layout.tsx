// ============================================================
// 🏠 根布局 — 错误边界 + 启动屏 + 新手引导 + Stack 导航
// ============================================================
import { useEffect, useCallback, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppProvider, useAppContext } from '@/store/AppContext';
import ErrorBoundary from '@/components/ErrorBoundary';
import OnboardingModal from '@/components/OnboardingModal';
import { Colors, FontSize, FontWeight, Spacing } from '@/constants/theme';

const ONBOARDING_KEY = '@dishes/onboarding_done';

SplashScreen.preventAutoHideAsync().catch(() => {});

function AppContent() {
  const { state } = useAppContext();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingChecked, setOnboardingChecked] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(ONBOARDING_KEY).then((val) => {
      if (!val) {
        setShowOnboarding(true);
      }
      setOnboardingChecked(true);
    });
  }, []);

  const handleDismissOnboarding = () => {
    setShowOnboarding(false);
    AsyncStorage.setItem(ONBOARDING_KEY, '1').catch(() => {});
  };

  const onLayoutRootView = useCallback(() => {
    if (state.isLoaded) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [state.isLoaded]);

  if (!state.isLoaded || !onboardingChecked) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingEmoji}>🔥</Text>
        <Text style={styles.loadingText}>加载中...</Text>
      </View>
    );
  }

  return (
    <View style={styles.root} onLayout={onLayoutRootView}>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: Colors.bgPrimary },
          headerTitleStyle: {
            color: Colors.textPrimary,
            fontWeight: '600',
            fontSize: 18,
          },
          headerTintColor: Colors.accentPrimary,
          contentStyle: { backgroundColor: Colors.bgPrimary },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="recommend"
          options={{ title: '菜品推荐', presentation: 'card' }}
        />
        <Stack.Screen
          name="recipe/[id]"
          options={{ title: '菜品详情', presentation: 'card' }}
        />
      </Stack>

      <OnboardingModal visible={showOnboarding} onDismiss={handleDismissOnboarding} />
    </View>
  );
}

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bgPrimary },
  loading: {
    flex: 1,
    backgroundColor: Colors.bgPrimary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingEmoji: { fontSize: 64, marginBottom: Spacing.lg },
  loadingText: {
    fontSize: FontSize.body,
    color: Colors.textMuted,
    marginTop: Spacing.md,
  },
});
