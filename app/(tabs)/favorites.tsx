// ============================================================
// ❤️ 收藏页 — 展示收藏菜品，支持取消收藏
// ============================================================
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import {
  Colors,
  FontSize,
  FontWeight,
  Spacing,
  BorderRadius,
  Shadow,
} from '@/constants/theme';
import { useAppContext } from '@/store/AppContext';
import type { Recipe } from '@/types';

export default function FavoritesScreen() {
  const { state, dispatch } = useAppContext();

  const handleViewRecipe = (recipe: Recipe) => {
    // 设为当前菜品然后跳转详情
    dispatch({ type: 'SET_CURRENT_RECIPE', recipe });
    dispatch({ type: 'ADD_HISTORY', recipe });
    router.push(`/recipe/${recipe.id}`);
  };

  const handleRemove = (recipe: Recipe) => {
    dispatch({ type: 'REMOVE_FAVORITE', recipeId: recipe.id });
  };

  if (state.favorites.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyEmoji}>🥘</Text>
        <Text style={styles.emptyTitle}>还没有收藏的菜品</Text>
        <Text style={styles.emptySubtitle}>遇到喜欢的菜品就收藏起来吧</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={state.favorites}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => handleViewRecipe(item)}
            activeOpacity={0.7}
          >
            <View style={styles.cardBody}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.meta}>
                {item.cuisine} · {item.difficulty} · {item.cookingTime}分钟
              </Text>
              <Text style={styles.match}>
                ✅ {item.matchedIngredients.length} 种已有 · ❌ {item.missingIngredients.length} 种缺少
              </Text>
            </View>
            <TouchableOpacity
              style={styles.removeBtn}
              onPress={() => handleRemove(item)}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={styles.removeIcon}>🗑️</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bgPrimary },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xxl,
    backgroundColor: Colors.bgPrimary,
  },
  emptyEmoji: { fontSize: 64, marginBottom: Spacing.lg },
  emptyTitle: {
    fontSize: FontSize.section,
    fontWeight: FontWeight.semiBold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  emptySubtitle: { fontSize: FontSize.body, color: Colors.textMuted },

  list: { padding: Spacing.lg, paddingBottom: Spacing.xxxl },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bgWhite,
    borderRadius: BorderRadius.recipeCard,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    ...Shadow.card,
  },
  cardBody: { flex: 1 },
  name: {
    fontSize: FontSize.section,
    fontWeight: FontWeight.semiBold,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  meta: {
    fontSize: FontSize.caption,
    color: Colors.textMuted,
    marginBottom: 4,
  },
  match: { fontSize: FontSize.caption, color: Colors.textSecondary },
  removeBtn: { paddingLeft: Spacing.md },
  removeIcon: { fontSize: 20 },
});
