// ============================================================
// 🥬 首页 — 食材选择 + 筛选 + 找菜入口
// ============================================================
import { useState, useMemo } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius } from '@/constants/theme';
import { useAppContext } from '@/store/AppContext';
import { INGREDIENTS, CATEGORIES, getIngredientsByCategory } from '@/data/ingredients';
import CategoryTabs from '@/components/CategoryTabs';
import IngredientGrid from '@/components/IngredientGrid';
import SelectedBar from '@/components/SelectedBar';
import FilterModal from '@/components/FilterModal';
import type { Ingredient } from '@/types';

export default function HomeScreen() {
  const { state, dispatch } = useAppContext();
  const [activeCategory, setActiveCategory] = useState<string>(CATEGORIES[0]);
  const [filterVisible, setFilterVisible] = useState(false);

  const categoryIngredients = useMemo(
    () => getIngredientsByCategory(activeCategory),
    [activeCategory]
  );

  const selectedIds = useMemo(
    () => new Set(state.selectedIngredients.map((i) => i.id)),
    [state.selectedIngredients]
  );

  // 筛选是否激活
  const hasFilter =
    state.preferences.cuisine !== null ||
    state.preferences.difficulty !== null ||
    state.preferences.timeRange !== '不限';

  const handleToggle = (ingredient: Ingredient) => {
    dispatch({ type: 'TOGGLE_INGREDIENT', ingredient });
  };

  const handleClear = () => {
    dispatch({ type: 'CLEAR_INGREDIENTS' });
  };

  const handleSearch = () => {
    dispatch({ type: 'RESET_RECOMMEND' });
    router.push('/recommend');
  };

  return (
    <View style={styles.container}>
      {/* 筛选按钮行 */}
      <TouchableOpacity
        style={[styles.filterBtn, hasFilter && styles.filterBtnActive]}
        onPress={() => setFilterVisible(true)}
        activeOpacity={0.7}
      >
        <Text style={[styles.filterText, hasFilter && styles.filterTextActive]}>
          {hasFilter ? '🎛️ 已筛选' : '🎛️ 筛选偏好'}
        </Text>
        {hasFilter && (
          <Text style={styles.filterBadge}>
            {[
              state.preferences.cuisine,
              state.preferences.difficulty,
              state.preferences.timeRange !== '不限' ? state.preferences.timeRange : null,
            ]
              .filter(Boolean)
              .join(' · ')}
          </Text>
        )}
      </TouchableOpacity>

      {/* 分类标签栏 */}
      <CategoryTabs
        categories={CATEGORIES}
        selected={activeCategory}
        onSelect={setActiveCategory}
      />

      {/* 食材网格 */}
      <IngredientGrid
        ingredients={categoryIngredients}
        selectedIds={selectedIds}
        onToggle={handleToggle}
      />

      {/* 底部已选横条 + 找菜按钮 */}
      <SelectedBar
        count={state.selectedIngredients.length}
        onClear={handleClear}
        onSearch={handleSearch}
      />

      {/* 筛选弹窗 */}
      <FilterModal
        visible={filterVisible}
        current={state.preferences}
        onApply={(prefs) => dispatch({ type: 'SET_PREFERENCES', preferences: prefs })}
        onClose={() => setFilterVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgPrimary,
    paddingTop: Spacing.sm,
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Spacing.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.bgWhite,
    borderRadius: BorderRadius.tag,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    gap: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  filterBtnActive: {
    borderColor: Colors.accentPrimary,
    backgroundColor: Colors.bgCard,
  },
  filterText: {
    fontSize: FontSize.body,
    color: Colors.textSecondary,
    fontWeight: FontWeight.medium,
  },
  filterTextActive: {
    color: Colors.accentPrimary,
    fontWeight: FontWeight.semiBold,
  },
  filterBadge: {
    fontSize: FontSize.caption,
    color: Colors.accentDeep,
    flex: 1,
    textAlign: 'right',
  },
});
