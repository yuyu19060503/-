// ============================================================
// 🃏 分类大卡片 — 缩小尺寸，一屏显示全
// ============================================================
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '@/constants/theme';

const CATS = [
  { key: '蔬菜', label: '我有蔬菜', icon: '🥬', color: '#E8F5E9', darkColor: '#43A047' },
  { key: '肉类', label: '我有肉类', icon: '🥩', color: '#FFEBEE', darkColor: '#E53935' },
  { key: '豆蛋', label: '我有豆蛋', icon: '🥚', color: '#FFF8E1', darkColor: '#FB8C00' },
  { key: '调料', label: '我有调料', icon: '🧂', color: '#EFEBE9', darkColor: '#6D4C41' },
  { key: '主食', label: '我有主食', icon: '🍚', color: '#FFF3E0', darkColor: '#F57C00' },
];

type Props = { onSelect: (cat: string) => void };

export default function CategoryCards({ onSelect }: Props) {
  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
      <Text style={styles.hint}>👇 点击你家有的食材大类</Text>
      <View style={styles.grid}>
        {CATS.map((cat) => (
          <TouchableOpacity
            key={cat.key} activeOpacity={0.7}
            style={[styles.card, { backgroundColor: cat.color, borderColor: cat.darkColor }]}
            onPress={() => onSelect(cat.key)}
          >
            <Text style={styles.icon}>{cat.icon}</Text>
            <Text style={[styles.label, { color: cat.darkColor }]}>{cat.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: Spacing.lg, paddingBottom: Spacing.xxxl },
  hint: { fontSize: FontSize.body, color: Colors.textMuted, textAlign: 'center', marginBottom: Spacing.lg },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: Spacing.md },
  card: { width: '47%', aspectRatio: 1.8, borderRadius: BorderRadius.recipeCard, borderWidth: 2.5, justifyContent: 'center', alignItems: 'center', ...Shadow.card },
  icon: { fontSize: 34, marginBottom: 2 },
  label: { fontSize: FontSize.body, fontWeight: FontWeight.bold },
});
