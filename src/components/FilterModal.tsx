// ============================================================
// 🎛️ 筛选偏好弹窗 — 菜系 / 难度 / 时间
// ============================================================
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  Colors,
  FontSize,
  FontWeight,
  Spacing,
  BorderRadius,
  Shadow,
} from '@/constants/theme';
import type { Cuisine, Difficulty, TimeRange, FilterPreferences } from '@/types';

type Props = {
  visible: boolean;
  current: FilterPreferences;
  onApply: (prefs: FilterPreferences) => void;
  onClose: () => void;
};

const CUISINES: Array<{ label: string; value: Cuisine | null }> = [
  { label: '不限', value: null },
  { label: '🌶️ 川菜', value: '川菜' },
  { label: '🥢 粤菜', value: '粤菜' },
  { label: '🍲 鲁菜', value: '鲁菜' },
  { label: '🦀 苏菜', value: '苏菜' },
  { label: '🏠 家常菜', value: '家常菜' },
];

const DIFFICULTIES: Array<{ label: string; value: Difficulty | null }> = [
  { label: '不限', value: null },
  { label: '⭐ 简单', value: '简单' },
  { label: '⭐⭐ 中等', value: '中等' },
  { label: '⭐⭐⭐ 困难', value: '困难' },
];

const TIMES: Array<{ label: string; value: TimeRange }> = [
  { label: '不限', value: '不限' },
  { label: '≤15分钟', value: '≤15分钟' },
  { label: '≤30分钟', value: '≤30分钟' },
  { label: '≤1小时', value: '≤1小时' },
];

export default function FilterModal({ visible, current, onApply, onClose }: Props) {
  const [cuisine, setCuisine] = useState<Cuisine | null>(current.cuisine);
  const [difficulty, setDifficulty] = useState<Difficulty | null>(current.difficulty);
  const [timeRange, setTimeRange] = useState<TimeRange>(current.timeRange);

  const handleReset = () => {
    setCuisine(null);
    setDifficulty(null);
    setTimeRange('不限');
  };

  const handleApply = () => {
    onApply({ cuisine, difficulty, timeRange });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* 顶部栏 */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.cancel}>取消</Text>
            </TouchableOpacity>
            <Text style={styles.title}>🎛️ 筛选偏好</Text>
            <TouchableOpacity onPress={handleReset}>
              <Text style={styles.reset}>重置</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* 菜系 */}
            <Text style={styles.sectionTitle}>菜系</Text>
            <View style={styles.optionRow}>
              {CUISINES.map((opt) => (
                <TouchableOpacity
                  key={opt.label}
                  style={[styles.option, cuisine === opt.value && styles.optionActive]}
                  onPress={() => setCuisine(opt.value)}
                >
                  <Text
                    style={[styles.optionText, cuisine === opt.value && styles.optionTextActive]}
                  >
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* 难度 */}
            <Text style={styles.sectionTitle}>难度</Text>
            <View style={styles.optionRow}>
              {DIFFICULTIES.map((opt) => (
                <TouchableOpacity
                  key={opt.label}
                  style={[styles.option, difficulty === opt.value && styles.optionActive]}
                  onPress={() => setDifficulty(opt.value)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      difficulty === opt.value && styles.optionTextActive,
                    ]}
                  >
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* 时间 */}
            <Text style={styles.sectionTitle}>烹饪时间</Text>
            <View style={styles.optionRow}>
              {TIMES.map((opt) => (
                <TouchableOpacity
                  key={opt.value}
                  style={[styles.option, timeRange === opt.value && styles.optionActive]}
                  onPress={() => setTimeRange(opt.value)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      timeRange === opt.value && styles.optionTextActive,
                    ]}
                  >
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* 确定按钮 */}
          <TouchableOpacity style={styles.applyBtn} onPress={handleApply} activeOpacity={0.8}>
            <Text style={styles.applyText}>确定筛选</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: Colors.bgWhite,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxxl,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  cancel: { fontSize: FontSize.body, color: Colors.textMuted },
  title: { fontSize: FontSize.section, fontWeight: FontWeight.bold, color: Colors.textPrimary },
  reset: { fontSize: FontSize.body, color: Colors.danger },

  sectionTitle: {
    fontSize: FontSize.body,
    fontWeight: FontWeight.semiBold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
    marginTop: Spacing.md,
  },
  optionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  option: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.tag,
    backgroundColor: Colors.bgPrimary,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  optionActive: {
    backgroundColor: Colors.accentPrimary,
    borderColor: Colors.accentPrimary,
  },
  optionText: { fontSize: FontSize.body, color: Colors.textSecondary },
  optionTextActive: { color: Colors.bgWhite, fontWeight: FontWeight.semiBold },

  applyBtn: {
    backgroundColor: Colors.accentPrimary,
    borderRadius: BorderRadius.button,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    marginTop: Spacing.lg,
    ...Shadow.button,
  },
  applyText: {
    fontSize: FontSize.button,
    fontWeight: FontWeight.semiBold,
    color: Colors.bgWhite,
  },
});
