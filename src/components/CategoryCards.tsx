// ============================================================
// 🃏 分类大卡片 — 第一层：选择食材大类
// ============================================================
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '@/constants/theme';

type CategoryInfo = {
  key: string;
  label: string;
  icon: string;
  color: string;
  darkColor: string;
};

const CATEGORY_INFO: CategoryInfo[] = [
  { key: '蔬菜', label: '我有蔬菜', icon: '🥬', color: '#E8F5E9', darkColor: '#66BB6A' },
  { key: '肉类', label: '我有肉类', icon: '🥩', color: '#FFEBEE', darkColor: '#EF5350' },
  { key: '豆蛋', label: '我有豆蛋', icon: '🥚', color: '#FFF8E1', darkColor: '#FFA726' },
  { key: '调料', label: '我有调料', icon: '🧂', color: '#EFEBE9', darkColor: '#8D6E63' },
  { key: '主食', label: '我有主食', icon: '🍚', color: '#FFF3E0', darkColor: '#FF9800' },
];

type Props = {
  onSelect: (category: string) => void;
};

export default function CategoryCards({ onSelect }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.hint}>👆 点击你家有的食材大类</Text>
      <View style={styles.grid}>
        {CATEGORY_INFO.map((cat) => (
          <TouchableOpacity
            key={cat.key}
            style={[styles.card, { backgroundColor: cat.color, borderColor: cat.darkColor }]}
            onPress={() => onSelect(cat.key)}
            activeOpacity={0.7}
          >
            <Text style={styles.icon}>{cat.icon}</Text>
            <Text style={[styles.label, { color: cat.darkColor }]}>{cat.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.lg,
  },
  hint: {
    fontSize: FontSize.body,
    color: Colors.textMuted,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    marginTop: Spacing.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: Spacing.md,
  },
  card: {
    width: '47%',
    aspectRatio: 1.4,
    borderRadius: BorderRadius.recipeCard,
    borderWidth: 2.5,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadow.card,
  },
  icon: {
    fontSize: 42,
    marginBottom: Spacing.sm,
  },
  label: {
    fontSize: FontSize.section,
    fontWeight: FontWeight.bold,
  },
});
