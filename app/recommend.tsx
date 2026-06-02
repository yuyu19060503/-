// ============================================================
// 🍳 推荐结果页 — 展示 AI 推荐的菜品
// ============================================================
import { useEffect, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
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
import { getRecommendation } from '@/services/ai';
import { useNetworkStatus } from '@/services/network';
import type { RecommendRequest, Difficulty, Cuisine } from '@/types';

export default function RecommendScreen() {
  const { state, dispatch } = useAppContext();
  const { isConnected } = useNetworkStatus();

  const fetchRecipe = useCallback(async () => {
    // 离线检测
    if (isConnected === false) {
      dispatch({
        type: 'SET_CURRENT_RECIPE',
        recipe: {
          id: 'error',
          name: '网络未连接',
          cuisine: '家常菜',
          difficulty: '简单',
          cookingTime: 0,
          matchedIngredients: [],
          missingIngredients: [],
          steps: [],
          tip: '请检查网络连接后重试',
          matchCount: 0,
          totalCount: 0,
        },
      });
      return;
    }
    dispatch({ type: 'SET_LOADING', isLoading: true });

    try {
      const request: RecommendRequest = {
        ingredients: state.selectedIngredients.map((i) => i.name),
        preferences: state.preferences,
        excludeNames: state.excludeNames,
      };

      const response = await getRecommendation(request);

      const recipe = {
        id: '',
        name: response.name,
        cuisine: (response.cuisine as Cuisine) || '家常菜',
        difficulty: response.difficulty as Difficulty,
        cookingTime: response.cookingTime,
        matchedIngredients: response.matchedIngredients,
        missingIngredients: response.missingIngredients,
        steps: response.steps,
        tip: response.tip,
        matchCount: response.matchedIngredients.length,
        totalCount:
          response.matchedIngredients.length + response.missingIngredients.length,
      };

      dispatch({ type: 'SET_CURRENT_RECIPE', recipe });
      dispatch({ type: 'ADD_EXCLUDE_NAME', name: recipe.name });
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : '未知错误，请重试';
      // 简单错误提示
      dispatch({
        type: 'SET_CURRENT_RECIPE',
        recipe: {
          id: 'error',
          name: '获取失败',
          cuisine: '家常菜',
          difficulty: '简单',
          cookingTime: 0,
          matchedIngredients: [],
          missingIngredients: [],
          steps: [],
          tip: msg,
          matchCount: 0,
          totalCount: 0,
        },
      });
    } finally {
      dispatch({ type: 'SET_LOADING', isLoading: false });
    }
  }, [
    state.selectedIngredients,
    state.preferences,
    state.excludeNames,
    dispatch,
    isConnected,
  ]);

  // 首次进入自动请求
  useEffect(() => {
    if (!state.currentRecipe && !state.isLoading) {
      fetchRecipe();
    }
  }, []);

  const handleConfirm = () => {
    if (state.currentRecipe && state.currentRecipe.id !== 'error') {
      dispatch({ type: 'ADD_HISTORY', recipe: state.currentRecipe });
      router.push(`/recipe/${state.currentRecipe.id}`);
    }
  };

  const handleRefresh = () => {
    fetchRecipe();
  };

  const handleBack = () => {
    dispatch({ type: 'RESET_RECOMMEND' });
    router.back();
  };

  const recipe = state.currentRecipe;
  const isError = recipe?.id === 'error';

  return (
    <View style={styles.container}>
      {/* 加载中 — 趣味动画 */}
      {state.isLoading && (
        <View style={styles.center}>
          <Text style={styles.loadingEmoji}>👨‍🍳</Text>
          <ActivityIndicator size="large" color={Colors.accentPrimary} />
          <Text style={styles.loadingText}>大厨正在翻菜谱...</Text>
          <Text style={styles.loadingSub}>根据你的食材精心搭配中</Text>
        </View>
      )}

      {/* 错误 */}
      {!state.isLoading && isError && (
        <View style={styles.center}>
          <Text style={styles.errorEmoji}>😅</Text>
          <Text style={styles.errorText}>{recipe?.tip ?? '出了点问题'}</Text>
          <TouchableOpacity style={styles.retryBtn} onPress={fetchRecipe}>
            <Text style={styles.retryText}>重试</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleBack}>
            <Text style={styles.backLink}>返回首页</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* 推荐结果 */}
      {!state.isLoading && recipe && !isError && (
        <>
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* 菜品名称 */}
            <Text style={styles.dishName}>{recipe.name}</Text>

            {/* 标签行 */}
            <View style={styles.tagRow}>
              <View style={styles.tag}>
                <Text style={styles.tagText}>{getCuisineEmoji(recipe.cuisine)} {recipe.cuisine}</Text>
              </View>
              <View style={styles.tag}>
                <Text style={styles.tagText}>{getDifficultyEmoji(recipe.difficulty)} {recipe.difficulty}</Text>
              </View>
              <View style={styles.tag}>
                <Text style={styles.tagText}>⏱️ {recipe.cookingTime}分钟</Text>
              </View>
            </View>

            {/* 食材匹配 */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>📋 食材匹配</Text>

              <Text style={styles.matchLabel}>
                已有食材（{recipe.matchedIngredients.length}/{recipe.totalCount}）
              </Text>
              <View style={styles.ingredientTags}>
                {recipe.matchedIngredients.map((name, i) => (
                  <View key={i} style={styles.hasTag}>
                    <Text style={styles.hasTagText}>{name}</Text>
                  </View>
                ))}
              </View>

              {recipe.missingIngredients.length > 0 && (
                <>
                  <Text style={[styles.matchLabel, { marginTop: Spacing.md }]}>
                    缺少食材（{recipe.missingIngredients.length}种）
                  </Text>
                  <View style={styles.ingredientTags}>
                    {recipe.missingIngredients.map((name, i) => (
                      <View key={i} style={styles.missTag}>
                        <Text style={styles.missTagText}>{name}</Text>
                      </View>
                    ))}
                  </View>
                </>
              )}
            </View>

            {/* 烹饪步骤预览 */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>👨‍🍳 制作步骤</Text>
              {recipe.steps.slice(0, 3).map((step, i) => (
                <View key={i} style={styles.stepPreview}>
                  <View style={styles.stepNum}>
                    <Text style={styles.stepNumText}>{i + 1}</Text>
                  </View>
                  <Text style={styles.stepText} numberOfLines={2}>
                    {step}
                  </Text>
                </View>
              ))}
              {recipe.steps.length > 3 && (
                <Text style={styles.moreSteps}>
                  还有 {recipe.steps.length - 3} 步...点击「就这个」查看完整步骤
                </Text>
              )}
            </View>
          </ScrollView>

          {/* 底部按钮 */}
          <View style={styles.bottomBar}>
            <TouchableOpacity
              style={styles.swapBtn}
              onPress={handleRefresh}
              activeOpacity={0.7}
            >
              <Text style={styles.swapIcon}>🔄</Text>
              <Text style={styles.swapText}>换一个</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.confirmBtn}
              onPress={handleConfirm}
              activeOpacity={0.7}
            >
              <Text style={styles.confirmIcon}>👌</Text>
              <Text style={styles.confirmText}>就这个</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

// ---- 辅助函数 ----
function getCuisineEmoji(c: string): string {
  const map: Record<string, string> = {
    '川菜': '🌶️', '粤菜': '🥢', '鲁菜': '🍲', '苏菜': '🦀', '家常菜': '🏠', '其他': '🍳',
  };
  return map[c] ?? '🍳';
}
function getDifficultyEmoji(d: string): string {
  const map: Record<string, string> = {
    '简单': '⭐', '中等': '⭐⭐', '困难': '⭐⭐⭐',
  };
  return map[d] ?? '⭐';
}

// ---- 样式 ----
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgPrimary,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xxl,
  },
  loadingEmoji: {
    fontSize: 64,
    marginBottom: Spacing.lg,
  },
  loadingText: {
    fontSize: FontSize.section,
    fontWeight: FontWeight.semiBold,
    color: Colors.textPrimary,
    marginTop: Spacing.lg,
  },
  loadingSub: {
    fontSize: FontSize.body,
    color: Colors.textMuted,
    marginTop: Spacing.sm,
  },
  errorEmoji: { fontSize: 64, marginBottom: Spacing.lg },
  errorText: {
    fontSize: FontSize.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  retryBtn: {
    backgroundColor: Colors.accentPrimary,
    paddingHorizontal: Spacing.xxxl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.button,
    marginBottom: Spacing.md,
  },
  retryText: { color: Colors.bgWhite, fontSize: FontSize.button, fontWeight: FontWeight.semiBold },
  backLink: { color: Colors.textMuted, fontSize: FontSize.body },

  // 结果区
  scroll: { flex: 1 },
  scrollContent: { padding: Spacing.lg, paddingBottom: Spacing.lg },
  dishName: {
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

  // 卡片
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
  matchLabel: {
    fontSize: FontSize.caption,
    color: Colors.textMuted,
    marginBottom: Spacing.sm,
  },
  ingredientTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  hasTag: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.small,
  },
  hasTagText: { fontSize: FontSize.caption, color: Colors.success, fontWeight: FontWeight.medium },
  missTag: {
    backgroundColor: '#FFEBEE',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.small,
  },
  missTagText: { fontSize: FontSize.caption, color: Colors.danger, fontWeight: FontWeight.medium },

  // 步骤预览
  stepPreview: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
    gap: Spacing.sm,
  },
  stepNum: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.accentPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  stepNumText: {
    fontSize: FontSize.caption,
    fontWeight: FontWeight.bold,
    color: Colors.bgWhite,
  },
  stepText: {
    flex: 1,
    fontSize: FontSize.body,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  moreSteps: {
    fontSize: FontSize.caption,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: Spacing.sm,
  },

  // 底部按钮
  bottomBar: {
    flexDirection: 'row',
    padding: Spacing.lg,
    gap: Spacing.md,
    backgroundColor: Colors.bgPrimary,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  swapBtn: {
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
  swapIcon: { fontSize: 18 },
  swapText: {
    fontSize: FontSize.button,
    fontWeight: FontWeight.semiBold,
    color: Colors.accentPrimary,
  },
  confirmBtn: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.button,
    backgroundColor: Colors.accentPrimary,
    gap: Spacing.xs,
    ...Shadow.button,
  },
  confirmIcon: { fontSize: 18 },
  confirmText: {
    fontSize: FontSize.button,
    fontWeight: FontWeight.semiBold,
    color: Colors.bgWhite,
  },
});
