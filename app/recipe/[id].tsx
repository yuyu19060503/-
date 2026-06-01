// ============================================================
// 📖 菜品详情页 — 完整制作步骤 + 收藏
// ============================================================
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
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

export default function RecipeDetailScreen() {
  const { state, dispatch } = useAppContext();
  const recipe = state.currentRecipe;

  // 是否已收藏
  const isFavorite = recipe
    ? state.favorites.some((f) => f.name === recipe.name)
    : false;
  const [hearted, setHearted] = useState(isFavorite);

  if (!recipe) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>菜品数据丢失，请返回重试</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backLink}>返回</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleFavorite = () => {
    if (hearted) {
      dispatch({ type: 'REMOVE_FAVORITE', recipeId: recipe.id });
    } else {
      dispatch({ type: 'ADD_FAVORITE', recipe });
    }
    setHearted(!hearted);
  };

  const handleBackToHome = () => {
    dispatch({ type: 'RESET_RECOMMEND' });
    router.dismissAll();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 头部 */}
        <Text style={styles.name}>{recipe.name}</Text>

        {/* 信息标签 */}
        <View style={styles.tagRow}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>
              {getCuisineEmoji(recipe.cuisine)} {recipe.cuisine}
            </Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>
              {getDiffEmoji(recipe.difficulty)} {recipe.difficulty}
            </Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>⏱️ {recipe.cookingTime}分钟</Text>
          </View>
        </View>

        {/* 食材匹配 */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📋 所需食材</Text>
          <View style={styles.ingredientRow}>
            {recipe.matchedIngredients.map((name, i) => (
              <View key={`has-${i}`} style={styles.hasTag}>
                <Text style={styles.hasTagText}>✅ {name}</Text>
              </View>
            ))}
            {recipe.missingIngredients.map((name, i) => (
              <View key={`miss-${i}`} style={styles.missTag}>
                <Text style={styles.missTagText}>❌ {name}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 完整制作步骤 */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>👨‍🍳 制作步骤</Text>
          {recipe.steps.map((step, i) => (
            <View key={i} style={styles.stepBlock}>
              <View style={styles.stepNum}>
                <Text style={styles.stepNumText}>{i + 1}</Text>
              </View>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>

        {/* 小贴士 */}
        {recipe.tip ? (
          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>💡 烹饪小贴士</Text>
            <Text style={styles.tipText}>{recipe.tip}</Text>
          </View>
        ) : null}
      </ScrollView>

      {/* 底部按钮 */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.favBtn}
          onPress={handleFavorite}
          activeOpacity={0.7}
        >
          <Text style={styles.favIcon}>{hearted ? '❤️' : '🤍'}</Text>
          <Text style={styles.favText}>{hearted ? '已收藏' : '收藏'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.homeBtn}
          onPress={handleBackToHome}
          activeOpacity={0.7}
        >
          <Text style={styles.homeText}>🏠 返回首页</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ---- 辅助 ----
function getCuisineEmoji(c: string): string {
  const m: Record<string, string> = {
    '川菜': '🌶️', '粤菜': '🥢', '鲁菜': '🍲', '苏菜': '🦀', '家常菜': '🏠',
  };
  return m[c] ?? '🍳';
}
function getDiffEmoji(d: string): string {
  const m: Record<string, string> = {
    '简单': '⭐', '中等': '⭐⭐', '困难': '⭐⭐⭐',
  };
  return m[d] ?? '⭐';
}

// ---- 样式 ----
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bgPrimary },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: FontSize.body, color: Colors.textMuted, marginBottom: Spacing.md },
  backLink: { fontSize: FontSize.body, color: Colors.accentPrimary },

  scroll: { flex: 1 },
  scrollContent: { padding: Spacing.lg, paddingBottom: Spacing.lg },

  name: {
    fontSize: 28,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  tagRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  tag: {
    backgroundColor: Colors.bgWhite,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.tag,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  tagText: { fontSize: FontSize.caption, color: Colors.textSecondary },

  card: {
    backgroundColor: Colors.bgWhite,
    borderRadius: BorderRadius.recipeCard,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    ...Shadow.card,
  },
  cardTitle: {
    fontSize: FontSize.section,
    fontWeight: FontWeight.semiBold,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  ingredientRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.xs },
  hasTag: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.small,
  },
  hasTagText: { fontSize: FontSize.caption, color: Colors.success },
  missTag: {
    backgroundColor: '#FFEBEE',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.small,
  },
  missTagText: { fontSize: FontSize.caption, color: Colors.danger },

  stepBlock: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
    gap: Spacing.md,
  },
  stepNum: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.accentPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 1,
  },
  stepNumText: {
    fontSize: FontSize.body,
    fontWeight: FontWeight.bold,
    color: Colors.bgWhite,
  },
  stepText: {
    flex: 1,
    fontSize: FontSize.body,
    color: Colors.textSecondary,
    lineHeight: 22,
  },

  tipCard: {
    backgroundColor: '#FFF8E1',
    borderRadius: BorderRadius.recipeCard,
    padding: Spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: Colors.accentPrimary,
    marginBottom: Spacing.lg,
  },
  tipTitle: {
    fontSize: FontSize.section,
    fontWeight: FontWeight.semiBold,
    color: Colors.accentDeep,
    marginBottom: Spacing.sm,
  },
  tipText: { fontSize: FontSize.body, color: Colors.textSecondary, lineHeight: 22 },

  bottomBar: {
    flexDirection: 'row',
    padding: Spacing.lg,
    gap: Spacing.md,
    backgroundColor: Colors.bgPrimary,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  favBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.button,
    borderWidth: 2,
    borderColor: Colors.accentPrimary,
    backgroundColor: Colors.bgWhite,
    gap: Spacing.xs,
  },
  favIcon: { fontSize: 20 },
  favText: {
    fontSize: FontSize.button,
    fontWeight: FontWeight.semiBold,
    color: Colors.accentPrimary,
  },
  homeBtn: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.button,
    backgroundColor: Colors.accentPrimary,
    ...Shadow.button,
  },
  homeText: {
    fontSize: FontSize.button,
    fontWeight: FontWeight.semiBold,
    color: Colors.bgWhite,
  },
});
