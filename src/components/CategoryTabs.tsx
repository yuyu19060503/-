// ============================================================
// 🏷️ 分类标签 — 横向滚动，缩小尺寸一行显示
// ============================================================
import { StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius } from '@/constants/theme';

type Props = { categories: readonly string[]; selected: string; onSelect: (c: string) => void };

export default function CategoryTabs({ categories, selected, onSelect }: Props) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
      {categories.map((cat) => {
        const isActive = cat === selected;
        return (
          <TouchableOpacity key={cat} style={[styles.tab, isActive && styles.tabActive]} onPress={() => onSelect(cat)} activeOpacity={0.7}>
            <Text style={[styles.label, isActive && styles.labelActive]}>{emoji(cat)}{' '}{cat}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
function emoji(c: string): string { const m: Record<string, string> = { '蔬菜': '🥬', '肉类': '🥩', '豆蛋': '🥚', '调料': '🧂', '主食': '🍚' }; return m[c] ?? ''; }

const styles = StyleSheet.create({
  row: { paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, gap: Spacing.xs },
  tab: { paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs, borderRadius: BorderRadius.tag, backgroundColor: Colors.bgWhite, borderWidth: 1, borderColor: Colors.borderLight },
  tabActive: { backgroundColor: Colors.accentPrimary, borderColor: Colors.accentPrimary },
  label: { fontSize: FontSize.caption, fontWeight: FontWeight.medium, color: Colors.textSecondary },
  labelActive: { color: Colors.bgWhite, fontWeight: FontWeight.semiBold },
});
