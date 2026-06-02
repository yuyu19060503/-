// ============================================================
// 👋 新手引导弹窗 — 支持上一步 + Pill 高亮关键词
// ============================================================
import { useState, type ReactNode } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '@/constants/theme';

const pillStyle = {
  backgroundColor: Colors.accentPrimary, color: Colors.bgWhite,
  fontWeight: '700' as const, fontSize: FontSize.body,
  borderRadius: BorderRadius.small, overflow: 'hidden' as const,
};

const descStyle = { fontSize: FontSize.body, color: Colors.textSecondary, textAlign: 'center' as const, lineHeight: 24 };

/* 高亮 Pill 组件 */
function Pill({ children }: { children: ReactNode }) {
  return <Text style={pillStyle}> {children} </Text>;
}

const STEPS = [
  {
    emoji: '🥬',
    title: '选食材',
    desc: (
      <Text style={descStyle}>
        点击你家有的食材大类，再选具体的食材。已选食材会显示在底部，随时可以增减。
      </Text>
    ),
  },
  {
    emoji: '🔥',
    title: '智能烧菜',
    desc: (
      <Text style={descStyle}>
        点<Pill>烧菜</Pill>按钮，大厨帮你推荐菜品。满意就点<Pill>就这个</Pill>查看完整步骤，不满意就点<Pill>换一个</Pill>换推荐，直到找到你想做的菜。
      </Text>
    ),
  },
  {
    emoji: '👨‍🍳',
    title: '开始做菜',
    desc: (
      <Text style={descStyle}>
        查看详细制作步骤，小贴士帮你避坑。喜欢的菜品可以收藏到收藏夹，下次直接找到！
      </Text>
    ),
  },
];

type Props = { visible: boolean; onDismiss: () => void };

export default function OnboardingModal({ visible, onDismiss }: Props) {
  const [step, setStep] = useState(0);
  const current = STEPS[step];
  const isFirst = step === 0;
  const isLast = step === STEPS.length - 1;

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.emoji}>{current.emoji}</Text>
          <Text style={styles.title}>{current.title}</Text>
          {current.desc}

          {/* 进度点 */}
          <View style={styles.dots}>
            {STEPS.map((_, i) => (
              <View key={i} style={[styles.dot, i === step && styles.dotActive]} />
            ))}
          </View>

          {/* 双按钮 */}
          <View style={styles.btnRow}>
            <TouchableOpacity
              style={[styles.btn, styles.btnPrev, isFirst && styles.btnDisabled]}
              onPress={() => setStep(step - 1)}
              disabled={isFirst}
              activeOpacity={0.7}
            >
              <Text style={[styles.btnText, styles.btnPrevText]}>← 上一步</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btn}
              onPress={isLast ? onDismiss : () => setStep(step + 1)}
              activeOpacity={0.7}
            >
              <Text style={styles.btnText}>
                {isLast ? '知道了！' : '下一步 →'}
              </Text>
            </TouchableOpacity>
          </View>

          {!isFirst && (
            <TouchableOpacity onPress={onDismiss}>
              <Text style={styles.skip}>跳过引导</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center', alignItems: 'center', padding: Spacing.xxl,
  },
  card: {
    backgroundColor: Colors.bgWhite, borderRadius: BorderRadius.recipeCard,
    padding: Spacing.xxxl, alignItems: 'center', width: '100%', maxWidth: 340,
    ...Shadow.recipeCard,
  },
  emoji: { fontSize: 56, marginBottom: Spacing.lg },
  title: { fontSize: FontSize.section, fontWeight: FontWeight.bold, color: Colors.textPrimary, marginBottom: Spacing.md },
  descText: { fontSize: FontSize.body, color: Colors.textSecondary, textAlign: 'center', lineHeight: 24 },

  // Pill 高亮：橙色胶囊背景 + 白色粗体
  pill: {
    backgroundColor: Colors.accentPrimary, color: Colors.bgWhite,
    fontWeight: FontWeight.bold, fontSize: FontSize.body,
    borderRadius: BorderRadius.small, overflow: 'hidden',
  },

  dots: { flexDirection: 'row', gap: Spacing.sm, marginTop: Spacing.xl, marginBottom: Spacing.lg },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.borderLight },
  dotActive: { backgroundColor: Colors.accentPrimary, width: 24 },

  btnRow: { flexDirection: 'row', gap: Spacing.md, width: '100%' },
  btn: {
    flex: 1, backgroundColor: Colors.accentPrimary, paddingVertical: Spacing.md,
    borderRadius: BorderRadius.button, alignItems: 'center', ...Shadow.button,
  },
  btnPrev: { backgroundColor: Colors.bgWhite, borderWidth: 1.5, borderColor: Colors.accentPrimary },
  btnDisabled: { opacity: 0.35 },
  btnText: { fontSize: FontSize.button, fontWeight: FontWeight.semiBold, color: Colors.bgWhite },
  btnPrevText: { color: Colors.accentPrimary },
  skip: { fontSize: FontSize.caption, color: Colors.textMuted, marginTop: Spacing.md },
});
