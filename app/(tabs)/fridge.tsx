// ============================================================
// 🧊 我的冰箱页 — 管理常备食材清单
// ============================================================
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  Colors,
  FontSize,
  FontWeight,
  Spacing,
  BorderRadius,
  Shadow,
} from '@/constants/theme';
import { useAppContext } from '@/store/AppContext';
import { INGREDIENTS, CATEGORIES, getIngredientsByCategory } from '@/data/ingredients';
import CategoryTabs from '@/components/CategoryTabs';
import IngredientGrid from '@/components/IngredientGrid';
import { saveFridge } from '@/store/storage';
import type { Ingredient } from '@/types';

export default function FridgeScreen() {
  const { state, dispatch } = useAppContext();
  const [activeCategory, setActiveCategory] = useState<string>(CATEGORIES[0]);
  const [mode, setMode] = useState<'view' | 'add'>('view');

  const categoryIngredients = getIngredientsByCategory(activeCategory);
  const fridgeIds = new Set(state.fridge.map((i) => i.id));

  const handleToggle = (ingredient: Ingredient) => {
    if (fridgeIds.has(ingredient.id)) {
      dispatch({ type: 'REMOVE_FROM_FRIDGE', ingredientId: ingredient.id });
    } else {
      dispatch({ type: 'ADD_TO_FRIDGE', ingredient: ingredient });
    }
  };

  // 一键清空
  const handleClearAll = () => {
    Alert.alert('清空冰箱', '确定要清空所有冰箱食材吗？', [
      { text: '取消', style: 'cancel' },
      {
        text: '确定',
        style: 'destructive',
        onPress: () => {
          dispatch({ type: 'SET_FRIDGE', ingredients: [] });
          saveFridge([]); // 强制同步清除 AsyncStorage
        },
      },
    ]);
  };

  // 一键加入首页
  const handleUseFridge = () => {
    dispatch({ type: 'CLEAR_INGREDIENTS' });
    state.fridge.forEach((ing) => {
      dispatch({ type: 'TOGGLE_INGREDIENT', ingredient: ing });
    });
    Alert.alert('已加载', `已将冰箱中 ${state.fridge.length} 种食材加入首页选择`);
  };

  if (state.fridge.length === 0 && mode === 'view') {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyEmoji}>🛒</Text>
        <Text style={styles.emptyTitle}>冰箱还是空的</Text>
        <Text style={styles.emptySubtitle}>把你家里常备的食材存起来</Text>
        <TouchableOpacity style={styles.startBtn} onPress={() => setMode('add')}>
          <Text style={styles.startText}>➕ 开始添加</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* 模式切换 */}
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.modeTab, mode === 'view' && styles.modeTabActive]}
          onPress={() => setMode('view')}
        >
          <Text style={[styles.modeText, mode === 'view' && styles.modeTextActive]}>
            🧊 冰箱 ({state.fridge.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modeTab, mode === 'add' && styles.modeTabActive]}
          onPress={() => setMode('add')}
        >
          <Text style={[styles.modeText, mode === 'add' && styles.modeTextActive]}>
            ➕ 添加食材
          </Text>
        </TouchableOpacity>
      </View>

      {mode === 'view' ? (
        <>
          {/* 操作栏 */}
          <View style={styles.actionBar}>
            <TouchableOpacity style={styles.actionBtn} onPress={handleUseFridge}>
              <Text style={styles.actionText}>📋 一键加入首页</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleClearAll}>
              <Text style={styles.clearBtn}>清空</Text>
            </TouchableOpacity>
          </View>

          {/* 冰箱食材列表 */}
          <FlatList
            data={state.fridge}
            keyExtractor={(item) => item.id}
            numColumns={4}
            contentContainerStyle={styles.grid}
            columnWrapperStyle={styles.row}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.ingCard}
                onPress={() => handleToggle(item)}
                activeOpacity={0.7}
              >
                <Text style={styles.ingEmoji}>{item.emoji}</Text>
                <Text style={styles.ingName}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </>
      ) : (
        <>
          {/* 分类标签 */}
          <CategoryTabs
            categories={CATEGORIES}
            selected={activeCategory}
            onSelect={setActiveCategory}
          />

          {/* 食材网格（可添加） */}
          <IngredientGrid
            ingredients={categoryIngredients}
            selectedIds={fridgeIds}
            onToggle={handleToggle}
          />

          <View style={styles.doneBar}>
            <TouchableOpacity
              style={styles.doneBtn}
              onPress={() => setMode('view')}
              activeOpacity={0.8}
            >
              <Text style={styles.doneText}>完成添加</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
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
  emptySubtitle: { fontSize: FontSize.body, color: Colors.textMuted, marginBottom: Spacing.xl },
  startBtn: {
    backgroundColor: Colors.accentPrimary,
    paddingHorizontal: Spacing.xxl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.button,
    ...Shadow.button,
  },
  startText: { fontSize: FontSize.button, fontWeight: FontWeight.semiBold, color: Colors.bgWhite },

  // 模式切换
  tabRow: {
    flexDirection: 'row',
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.sm,
    backgroundColor: Colors.bgWhite,
    borderRadius: BorderRadius.tag,
    padding: 4,
  },
  modeTab: {
    flex: 1,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.small,
    alignItems: 'center',
  },
  modeTabActive: { backgroundColor: Colors.accentPrimary },
  modeText: { fontSize: FontSize.body, color: Colors.textSecondary, fontWeight: FontWeight.medium },
  modeTextActive: { color: Colors.bgWhite },

  // 查看模式
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xs,
  },
  actionBtn: {
    backgroundColor: Colors.bgCard,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.small,
  },
  actionText: { fontSize: FontSize.caption, color: Colors.accentDeep, fontWeight: FontWeight.medium },
  clearBtn: { fontSize: FontSize.caption, color: Colors.danger },

  grid: { padding: Spacing.md, paddingBottom: 80 },
  row: { justifyContent: 'space-around', marginBottom: Spacing.sm },
  ingCard: {
    width: 72,
    height: 88,
    backgroundColor: Colors.bgWhite,
    borderRadius: BorderRadius.card,
    borderWidth: 1.5,
    borderColor: Colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.card,
  },
  ingEmoji: { fontSize: 30, marginBottom: 4 },
  ingName: { fontSize: FontSize.caption, color: Colors.textPrimary, textAlign: 'center' },

  // 完成添加按钮
  doneBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.lg,
    backgroundColor: Colors.bgPrimary,
  },
  doneBtn: {
    backgroundColor: Colors.accentPrimary,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.button,
    alignItems: 'center',
    ...Shadow.button,
  },
  doneText: {
    fontSize: FontSize.button,
    fontWeight: FontWeight.semiBold,
    color: Colors.bgWhite,
  },
});
