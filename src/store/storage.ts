// ============================================================
// 💾 AsyncStorage 持久化 — 保存/读取用户数据
// ============================================================
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Recipe, Ingredient, FilterPreferences } from '@/types';

const KEYS = {
  FAVORITES: '@dishes/favorites',
  HISTORY: '@dishes/history',
  FRIDGE: '@dishes/fridge',
  PREFERENCES: '@dishes/preferences',
} as const;

// ---- 收藏 ----
export async function loadFavorites(): Promise<Recipe[]> {
  try {
    const raw = await AsyncStorage.getItem(KEYS.FAVORITES);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function saveFavorites(favorites: Recipe[]): Promise<void> {
  try {
    await AsyncStorage.setItem(KEYS.FAVORITES, JSON.stringify(favorites));
  } catch {
    // 静默失败
  }
}

// ---- 历史 ----
export async function loadHistory(): Promise<Recipe[]> {
  try {
    const raw = await AsyncStorage.getItem(KEYS.HISTORY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function saveHistory(history: Recipe[]): Promise<void> {
  try {
    await AsyncStorage.setItem(KEYS.HISTORY, JSON.stringify(history));
  } catch {}
}

// ---- 冰箱（含旧数据迁移） ----
export async function loadFridge(): Promise<Ingredient[]> {
  try {
    const raw = await AsyncStorage.getItem(KEYS.FRIDGE);
    if (!raw) return [];
    const items = JSON.parse(raw);
    // 迁移旧格式：补充缺失字段
    return items.filter(Boolean).map((item: Record<string, unknown>) => ({
      id: (item.id as string) || '',
      name: (item.name as string) || '',
      emoji: (item.emoji as string) || '📦',
      color: (item.color as string) || 'hsl(100,50%,42%)',
      category: (item.category as string) || '蔬菜',
    }));
  } catch {
    return [];
  }
}

export async function saveFridge(fridge: Ingredient[]): Promise<void> {
  try {
    await AsyncStorage.setItem(KEYS.FRIDGE, JSON.stringify(fridge));
  } catch {}
}

// ---- 偏好 ----
export async function loadPreferences(): Promise<FilterPreferences | null> {
  try {
    const raw = await AsyncStorage.getItem(KEYS.PREFERENCES);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export async function savePreferences(prefs: FilterPreferences): Promise<void> {
  try {
    await AsyncStorage.setItem(KEYS.PREFERENCES, JSON.stringify(prefs));
  } catch {}
}

// ---- 批量保存 ----
export async function saveAll(
  favorites: Recipe[],
  history: Recipe[],
  fridge: Ingredient[],
  preferences: FilterPreferences
): Promise<void> {
  await Promise.all([
    saveFavorites(favorites),
    saveHistory(history),
    saveFridge(fridge),
    savePreferences(preferences),
  ]);
}
