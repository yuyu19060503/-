// ============================================================
// 🧊 我的冰箱页 — 长按进编辑模式，X 删除，Toast 清空
// ============================================================
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '@/constants/theme';
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
  const [deleteMode, setDeleteMode] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    if (toast) { const t = setTimeout(() => setToast(''), 2000); return () => clearTimeout(t); }
  }, [toast]);

  const categoryIngredients = getIngredientsByCategory(activeCategory);
  const fridgeIds = new Set(state.fridge.map((i) => i.id));

  const handleRemove = (ingredient: Ingredient) => {
    dispatch({ type: 'REMOVE_FROM_FRIDGE', ingredientId: ingredient.id });
  };

  const handleClearAll = async () => {
    setDeleteMode(false);
    await saveFridge([]);
    dispatch({ type: 'SET_FRIDGE', ingredients: [] });
    setToast('✅ 冰箱已清空');
  };

  const handleUseFridge = () => {
    dispatch({ type: 'CLEAR_INGREDIENTS' });
    state.fridge.forEach((ing) => dispatch({ type: 'TOGGLE_INGREDIENT', ingredient: ing }));
    setToast(`✅ 已加载 ${state.fridge.length} 种食材`);
  };

  if (state.fridge.length === 0 && mode === 'view') {
    return (
      <View style={styles.container}>
        {toast !== '' && <View style={styles.toast}><Text style={styles.toastText}>{toast}</Text></View>}
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>🛒</Text>
          <Text style={styles.emptyTitle}>冰箱还是空的</Text>
          <Text style={styles.emptySubtitle}>把你家里常备的食材存起来</Text>
          <TouchableOpacity style={styles.startBtn} onPress={() => setMode('add')}>
            <Text style={styles.startText}>➕ 开始添加</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {toast !== '' && <View style={styles.toast}><Text style={styles.toastText}>{toast}</Text></View>}

      <View style={styles.tabRow}>
        <TouchableOpacity style={[styles.modeTab, mode === 'view' && styles.modeTabActive]} onPress={() => { setMode('view'); setDeleteMode(false); }}>
          <Text style={[styles.modeText, mode === 'view' && styles.modeTextActive]}>🧊 冰箱 ({state.fridge.length})</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.modeTab, mode === 'add' && styles.modeTabActive]} onPress={() => { setMode('add'); setDeleteMode(false); }}>
          <Text style={[styles.modeText, mode === 'add' && styles.modeTextActive]}>➕ 添加食材</Text>
        </TouchableOpacity>
      </View>

      {mode === 'view' ? (
        <>
          <View style={styles.actionBar}>
            {deleteMode ? (
              <TouchableOpacity style={styles.doneBtnSm} onPress={() => setDeleteMode(false)}>
                <Text style={styles.doneTextSm}>✓ 完成</Text>
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity style={styles.actionBtn} onPress={handleUseFridge}>
                  <Text style={styles.actionText}>📋 一键加入首页</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', gap: Spacing.md, alignItems: 'center' }}>
                  <TouchableOpacity onPress={() => setDeleteMode(true)}>
                    <Text style={styles.editBtn}>✏️ 编辑</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleClearAll}>
                    <Text style={styles.clearBtn}>清空</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>

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
                onLongPress={() => setDeleteMode(true)}
                activeOpacity={deleteMode ? 1 : 1}
                delayLongPress={400}
              >
                <Text style={styles.ingEmoji}>{item.emoji}</Text>
                <Text style={styles.ingName}>{item.name}</Text>
                {deleteMode && (
                  <TouchableOpacity style={styles.deleteBadge} onPress={() => handleRemove(item)}>
                    <Text style={styles.deleteX}>✕</Text>
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            )}
          />
        </>
      ) : (
        <>
          <CategoryTabs categories={CATEGORIES} selected={activeCategory} onSelect={setActiveCategory} />
          <IngredientGrid ingredients={categoryIngredients} selectedIds={fridgeIds} onToggle={(ing) => {
            if (fridgeIds.has(ing.id)) {
              dispatch({ type: 'REMOVE_FROM_FRIDGE', ingredientId: ing.id });
            } else {
              dispatch({ type: 'ADD_TO_FRIDGE', ingredient: ing });
            }
          }} />
          <View style={styles.doneBar}>
            <TouchableOpacity style={styles.doneBtn} onPress={() => setMode('view')} activeOpacity={0.8}>
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
  toast: { position: 'absolute', top: 10, left: 0, right: 0, zIndex: 99, alignItems: 'center' },
  toastText: { backgroundColor: Colors.accentPrimary, color: Colors.bgWhite, fontSize: FontSize.body, fontWeight: FontWeight.semiBold, paddingHorizontal: Spacing.xl, paddingVertical: Spacing.sm, borderRadius: BorderRadius.button, overflow: 'hidden' },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: Spacing.xxl, backgroundColor: Colors.bgPrimary },
  emptyEmoji: { fontSize: 64, marginBottom: Spacing.lg },
  emptyTitle: { fontSize: FontSize.section, fontWeight: FontWeight.semiBold, color: Colors.textPrimary, marginBottom: Spacing.sm },
  emptySubtitle: { fontSize: FontSize.body, color: Colors.textMuted, marginBottom: Spacing.xl },
  startBtn: { backgroundColor: Colors.accentPrimary, paddingHorizontal: Spacing.xxl, paddingVertical: Spacing.md, borderRadius: BorderRadius.button, ...Shadow.button },
  startText: { fontSize: FontSize.button, fontWeight: FontWeight.semiBold, color: Colors.bgWhite },
  tabRow: { flexDirection: 'row', marginHorizontal: Spacing.lg, marginVertical: Spacing.sm, backgroundColor: Colors.bgWhite, borderRadius: BorderRadius.tag, padding: 4 },
  modeTab: { flex: 1, paddingVertical: Spacing.sm, borderRadius: BorderRadius.small, alignItems: 'center' },
  modeTabActive: { backgroundColor: Colors.accentPrimary },
  modeText: { fontSize: FontSize.body, color: Colors.textSecondary, fontWeight: FontWeight.medium },
  modeTextActive: { color: Colors.bgWhite },
  actionBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: Spacing.lg, paddingVertical: Spacing.xs },
  actionBtn: { backgroundColor: Colors.bgCard, paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, borderRadius: BorderRadius.small },
  actionText: { fontSize: FontSize.caption, color: Colors.accentDeep, fontWeight: FontWeight.medium },
  clearBtn: { fontSize: FontSize.caption, color: Colors.danger },
  grid: { padding: Spacing.md, paddingBottom: 80 },
  row: { justifyContent: 'space-around', marginBottom: Spacing.sm },
  ingCard: { width: 72, height: 88, backgroundColor: Colors.bgWhite, borderRadius: BorderRadius.card, borderWidth: 1.5, borderColor: Colors.borderLight, alignItems: 'center', justifyContent: 'center', ...Shadow.card },
  ingEmoji: { fontSize: 30, marginBottom: 4 },
  ingName: { fontSize: FontSize.caption, color: Colors.textPrimary, textAlign: 'center' },
  deleteBadge: { position: 'absolute', top: -8, right: -8, width: 28, height: 28, borderRadius: 14, backgroundColor: Colors.accentDeep, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.18, shadowRadius: 4, elevation: 4 },
  deleteX: { fontSize: 15, fontWeight: FontWeight.bold, color: Colors.bgWhite },
  editBtn: { fontSize: FontSize.caption, color: Colors.accentPrimary, fontWeight: FontWeight.medium },
  doneBtnSm: { backgroundColor: Colors.accentPrimary, paddingHorizontal: Spacing.lg, paddingVertical: Spacing.xs, borderRadius: BorderRadius.small },
  doneTextSm: { fontSize: FontSize.body, fontWeight: FontWeight.semiBold, color: Colors.bgWhite },
  doneBar: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: Spacing.lg, backgroundColor: Colors.bgPrimary },
  doneBtn: { backgroundColor: Colors.accentPrimary, paddingVertical: Spacing.md, borderRadius: BorderRadius.button, alignItems: 'center', ...Shadow.button },
  doneText: { fontSize: FontSize.button, fontWeight: FontWeight.semiBold, color: Colors.bgWhite },
});
