// ============================================================
// 📊 已选食材底部横条 + 找菜按钮
// ============================================================
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {
  Colors,
  FontSize,
  FontWeight,
  Spacing,
  BorderRadius,
  Shadow,
} from '@/constants/theme';

type Props = {
  count: number;
  onClear: () => void;
  onSearch: () => void;
};

export default function SelectedBar({ count, onClear, onSearch }: Props) {
  const isEmpty = count === 0;

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {/* 左侧：已选计数 + 清空 */}
        <View style={styles.info}>
          <Text style={styles.count}>
            已选 <Text style={styles.countNum}>{count}</Text> 种食材
          </Text>
          {!isEmpty && (
            <TouchableOpacity onPress={onClear}>
              <Text style={styles.clear}>清空</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* 右侧：找菜按钮 */}
        <TouchableOpacity
          style={[styles.searchBtn, isEmpty && styles.searchBtnDisabled]}
          onPress={onSearch}
          disabled={isEmpty}
          activeOpacity={0.8}
        >
          <Text style={styles.searchIcon}>🔥</Text>
          <Text
            style={[styles.searchText, isEmpty && styles.searchTextDisabled]}
          >
            烧菜
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
    paddingTop: Spacing.sm,
    backgroundColor: Colors.bgPrimary,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.bgWhite,
    borderRadius: BorderRadius.recipeCard,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    ...Shadow.recipeCard,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  count: {
    fontSize: FontSize.body,
    fontWeight: FontWeight.medium,
    color: Colors.textSecondary,
  },
  countNum: {
    color: Colors.accentPrimary,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.section,
  },
  clear: {
    fontSize: FontSize.caption,
    color: Colors.danger,
    fontWeight: FontWeight.medium,
  },
  searchBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.accentPrimary,
    paddingHorizontal: Spacing.xxl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.button,
    gap: Spacing.xs,
    ...Shadow.button,
  },
  searchBtnDisabled: {
    backgroundColor: Colors.borderLight,
    ...{},
  },
  searchIcon: {
    fontSize: 16,
  },
  searchText: {
    fontSize: FontSize.button,
    fontWeight: FontWeight.semiBold,
    color: Colors.bgWhite,
  },
  searchTextDisabled: {
    color: Colors.textMuted,
  },
});
