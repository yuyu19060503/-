// ============================================================
// 🏷️ 分类标签 — 网格换行布局，不再裁切
// ============================================================
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius } from '@/constants/theme';

type Props = { categories: readonly string[]; selected: string; onSelect: (c: string) => void };

export default function CategoryTabs({ categories, selected, onSelect }: Props) {
  return (
    <View style={styles.row}>
      {categories.map((cat) => {
        const isActive = cat === selected;
        return (
          <TouchableOpacity
            key={cat}
            style={[styles.tab, isActive && styles.tabActive]}
            onPress={() => onSelect(cat)} activeOpacity={0.7}
          >
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {emoji(cat)} {cat}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function emoji(c: string): string {
  const m: Record<string, string> = { '蔬菜': '🥬', '肉类': '🥩', '豆蛋': '🥚', '调料': '🧂', '主食': '🍚' };
  return m[c] ?? '📦';
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm, gap: Spacing.sm, justifyContent: 'center',
  },
  tab: {
    paddingHorizontal: Spacing.lg, paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.tag, backgroundColor: Colors.bgWhite,
    borderWidth: 1, borderColor: Colors.borderLight,
  },
  tabActive: { backgroundColor: Colors.accentPrimary, borderColor: Colors.accentPrimary },
  label: { fontSize: FontSize.body, fontWeight: FontWeight.medium, color: Colors.textSecondary },
  labelActive: { color: Colors.bgWhite, fontWeight: FontWeight.semiBold },
});
