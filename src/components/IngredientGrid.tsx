// ============================================================
// 📦 食材网格 — 按分类展示食材卡片
// ============================================================
import { StyleSheet, View, FlatList } from 'react-native';
import { Spacing } from '@/constants/theme';
import type { Ingredient } from '@/types';
import IngredientCard from './IngredientCard';

type Props = {
  ingredients: Ingredient[];
  selectedIds: Set<string>;
  onToggle: (ingredient: Ingredient) => void;
};

export default function IngredientGrid({
  ingredients,
  selectedIds,
  onToggle,
}: Props) {
  return (
    <FlatList
      data={ingredients}
      keyExtractor={(item) => item.id}
      numColumns={4}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.grid}
      columnWrapperStyle={styles.row}
      renderItem={({ item }) => (
        <IngredientCard
          ingredient={item}
          selected={selectedIds.has(item.id)}
          onPress={onToggle}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  grid: {
    paddingHorizontal: Spacing.md,
    paddingBottom: 120, // 给底部已选栏留空间
  },
  row: {
    justifyContent: 'space-around',
    marginBottom: Spacing.sm,
  },
});
