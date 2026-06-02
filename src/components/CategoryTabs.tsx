// ============================================================
// 🏷️ 分类标签栏 — 横向可滚动（已加高，文字不再被裁切）
// ============================================================
import { StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius } from '@/constants/theme';

type Props = {
  categories: readonly string[];
  selected: string;
  onSelect: (category: string) => void;
};

export default function CategoryTabs({ categories, selected, onSelect }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((cat) => {
        const isActive = cat === selected;
        return (
          <TouchableOpacity
            key={cat}
            style={[styles.tab, isActive && styles.tabActive]}
            onPress={() => onSelect(cat)}
            activeOpacity={0.7}
          >
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {getCategoryEmoji(cat)} {cat}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

function getCategoryEmoji(cat: string): string {
  const map: Record<string, string> = {
    '蔬菜': '🥬', '肉类': '🥩', '豆蛋': '🥚', '调料': '🧂', '主食': '🍚',
  };
  return map[cat] ?? '📦';
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
  },
  tab: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.tag,
    backgroundColor: Colors.bgWhite,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    minHeight: 44,
    justifyContent: 'center',
  },
  tabActive: {
    backgroundColor: Colors.accentPrimary,
    borderColor: Colors.accentPrimary,
  },
  label: {
    fontSize: FontSize.button,
    fontWeight: FontWeight.medium,
    color: Colors.textSecondary,
  },
  labelActive: {
    color: Colors.bgWhite,
    fontWeight: FontWeight.semiBold,
  },
});
