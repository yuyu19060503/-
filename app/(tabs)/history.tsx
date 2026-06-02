// ============================================================
// 🕐 历史记录页 — 直接清空 + Toast
// ============================================================
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '@/constants/theme';
import { useAppContext } from '@/store/AppContext';
import type { Recipe } from '@/types';

export default function HistoryScreen() {
  const { state, dispatch } = useAppContext();
  const [toast, setToast] = useState('');

  useEffect(() => {
    if (toast) { const t = setTimeout(() => setToast(''), 2000); return () => clearTimeout(t); }
  }, [toast]);

  const handleViewRecipe = (recipe: Recipe) => {
    dispatch({ type: 'SET_CURRENT_RECIPE', recipe });
    router.push(`/recipe/${recipe.id}`);
  };

  const handleClear = () => {
    dispatch({ type: 'CLEAR_HISTORY' });
    setToast('✅ 历史已清除');
  };

  if (state.history.length === 0) {
    return (
      <View style={styles.container}>
        {toast !== '' && <View style={styles.toast}><Text style={styles.toastText}>{toast}</Text></View>}
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>📝</Text>
          <Text style={styles.emptyTitle}>还没有查看记录</Text>
          <Text style={styles.emptySubtitle}>浏览过的菜品会出现在这里</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {toast !== '' && <View style={styles.toast}><Text style={styles.toastText}>{toast}</Text></View>}
      <View style={styles.topBar}>
        <Text style={styles.count}>{state.history.length} 条记录</Text>
        <TouchableOpacity onPress={handleClear}>
          <Text style={styles.clearBtn}>🗑️ 清除全部</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={state.history}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => handleViewRecipe(item)} activeOpacity={0.7}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.meta}>{item.cuisine} · {item.difficulty} · {item.cookingTime}分钟</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bgPrimary },
  toast: { position: 'absolute', top: 10, left: 0, right: 0, zIndex: 99, alignItems: 'center' },
  toastText: { backgroundColor: Colors.accentPrimary, color: Colors.bgWhite, fontSize: FontSize.body, fontWeight: FontWeight.semiBold, paddingHorizontal: Spacing.xl, paddingVertical: Spacing.sm, borderRadius: BorderRadius.button, overflow: 'hidden' },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: Spacing.xxl, backgroundColor: Colors.bgPrimary },
  emptyEmoji: { fontSize: 64, marginBottom: Spacing.lg },
  emptyTitle: { fontSize: FontSize.section, fontWeight: FontWeight.semiBold, color: Colors.textPrimary, marginBottom: Spacing.sm },
  emptySubtitle: { fontSize: FontSize.body, color: Colors.textMuted },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: Spacing.lg, paddingVertical: Spacing.sm },
  count: { fontSize: FontSize.caption, color: Colors.textMuted },
  clearBtn: { fontSize: FontSize.caption, color: Colors.danger, fontWeight: FontWeight.medium },
  list: { padding: Spacing.lg, paddingTop: 0, paddingBottom: Spacing.xxxl },
  card: { backgroundColor: Colors.bgWhite, borderRadius: BorderRadius.card, padding: Spacing.lg, marginBottom: Spacing.sm, ...Shadow.card },
  name: { fontSize: FontSize.body, fontWeight: FontWeight.semiBold, color: Colors.textPrimary, marginBottom: 4 },
  meta: { fontSize: FontSize.caption, color: Colors.textMuted },
});
