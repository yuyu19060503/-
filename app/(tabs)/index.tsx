// ============================================================
// 🥬 首页 — 两层选择：大类卡片 → 食材网格
// ============================================================
import { useState, useMemo, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius } from '@/constants/theme';
import { useAppContext } from '@/store/AppContext';
import { track } from '@/utils/analytics';
import { INGREDIENTS, CATEGORIES, getIngredientsByCategory } from '@/data/ingredients';
import CategoryCards from '@/components/CategoryCards';
import CategoryTabs from '@/components/CategoryTabs';
import IngredientGrid from '@/components/IngredientGrid';
import SelectedBar from '@/components/SelectedBar';
import FilterModal from '@/components/FilterModal';
import type { Ingredient } from '@/types';

/* 随机趣味副标题 */
const SUBTITLES = [
  '今天烧什么好呢？',
  '冰箱里藏着一桌大餐…',
  '做一桌好菜犒劳自己吧！',
  '让大厨帮你出出主意～',
  '现有食材也能做大餐！',
  '不买菜也能吃好饭！',
];

export default function HomeScreen() {
  const { state, dispatch } = useAppContext();
  // null = 第一层（大类卡片），string = 第二层（具体分类）
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [filterVisible, setFilterVisible] = useState(false);

  // 随机副标题
  const subtitle = useMemo(
    () => SUBTITLES[Math.floor(Math.random() * SUBTITLES.length)],
    []
  );

  const categoryIngredients = useMemo(
    () => (activeCategory ? getIngredientsByCategory(activeCategory) : []),
    [activeCategory]
  );

  const selectedIds = useMemo(
    () => new Set(state.selectedIngredients.map((i) => i.id)),
    [state.selectedIngredients]
  );

  const hasFilter =
    state.preferences.cuisine !== null ||
    state.preferences.difficulty !== null ||
    state.preferences.timeRange !== '不限';

  useEffect(() => { track('page_view', { page: 'home' }); }, []);

  const handleToggle = (ingredient: Ingredient) => {
    const isDeselect = selectedIds.has(ingredient.id);
    track('ingredient_toggle', { ingredient: ingredient.name, action: isDeselect ? 'deselect' : 'select' });
    dispatch({ type: 'TOGGLE_INGREDIENT', ingredient });
  };

  const handleClear = () => {
    dispatch({ type: 'CLEAR_INGREDIENTS' });
  };

  const handleSearch = () => {
    track('search_click', { count: state.selectedIngredients.length, has_filter: hasFilter });
    dispatch({ type: 'RESET_RECOMMEND' });
    router.push('/recommend');
  };

  return (
    <View style={styles.container}>
      {/* 副标题 */}
      <Text style={styles.subtitle}>{subtitle}</Text>

      {/* 筛选按钮 */}
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

      {/* 第一层 or 第二层 */}
      {activeCategory === null ? (
        <View style={{ flex: 1 }}>
          <CategoryCards onSelect={setActiveCategory} />
        </View>
      ) : (
        <View style={styles.level2}>
          {/* 返回 + 分类标签 */}
          <View style={styles.level2Header}>
            <TouchableOpacity onPress={() => setActiveCategory(null)}>
              <Text style={styles.backBtn}>← 所有分类</Text>
            </TouchableOpacity>
          </View>
          <CategoryTabs
            categories={CATEGORIES}
            selected={activeCategory}
            onSelect={setActiveCategory}
          />
          <IngredientGrid
            ingredients={categoryIngredients}
            selectedIds={selectedIds}
            onToggle={handleToggle}
          />
        </View>
      )}

      {/* 底部已选横条（两层都显示） */}
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
  },
  subtitle: {
    fontSize: FontSize.caption,
    color: Colors.textMuted,
    textAlign: 'center',
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xs,
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.xs,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.bgWhite,
    borderRadius: BorderRadius.tag,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    gap: Spacing.sm,
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
  level2: {
    flex: 1,
  },
  level2Header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xs,
  },
  backBtn: {
    fontSize: FontSize.body,
    fontWeight: FontWeight.semiBold,
    color: Colors.accentPrimary,
  },
});
