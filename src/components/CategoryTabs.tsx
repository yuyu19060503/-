// ============================================================
// 🏷️ 分类标签 — 均分一行，5 个标签永不遮挡
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
          <TouchableOpacity key={cat} style={[styles.tab, isActive && styles.tabActive]} onPress={() => onSelect(cat)} activeOpacity={0.7}>
            <Text style={[styles.label, isActive && styles.labelActive]}>{cat}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', paddingHorizontal: Spacing.sm, paddingVertical: Spacing.sm, gap: 4 },
  tab: { flex: 1, paddingVertical: Spacing.sm, borderRadius: BorderRadius.tag, backgroundColor: Colors.bgWhite, borderWidth: 1, borderColor: Colors.borderLight, alignItems: 'center' },
  tabActive: { backgroundColor: Colors.accentPrimary, borderColor: Colors.accentPrimary },
  label: { fontSize: FontSize.caption, fontWeight: FontWeight.medium, color: Colors.textSecondary },
  labelActive: { color: Colors.bgWhite, fontWeight: FontWeight.semiBold },
});
