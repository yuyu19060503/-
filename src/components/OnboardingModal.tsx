// ============================================================
// 👋 新手引导弹窗 — 首次打开时显示 3 步引导
// ============================================================
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '@/constants/theme';
import { useState } from 'react';

const STEPS = [
  {
    emoji: '🥬',
    title: '选食材',
    desc: '点击你家有的食材大类，再选具体的食材。已选食材会显示在底部，随时可以增减。',
  },
  {
    emoji: '🔥',
    title: '智能烧菜',
    desc: '点「烧菜」按钮，大厨帮你推荐菜品。满意就点「就这个」查看步骤，不满意就点「换一个」换推荐，直到找到你想做的菜。',
  },
  {
    emoji: '👨‍🍳',
    title: '开始做菜',
    desc: '查看详细制作步骤，小贴士帮你避坑。喜欢的菜品可以收藏到收藏夹，下次直接找到！',
  },
];

type Props = {
  visible: boolean;
  onDismiss: () => void;
};

export default function OnboardingModal({ visible, onDismiss }: Props) {
  const [step, setStep] = useState(0);
  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  const handleNext = () => {
    if (isLast) {
      onDismiss();
    } else {
      setStep(step + 1);
    }
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.emoji}>{current.emoji}</Text>
          <Text style={styles.title}>{current.title}</Text>
          <Text style={styles.desc}>{current.desc}</Text>

          {/* 进度指示器 */}
          <View style={styles.dots}>
            {STEPS.map((_, i) => (
              <View key={i} style={[styles.dot, i === step && styles.dotActive]} />
            ))}
          </View>

          {/* 按钮 */}
          <TouchableOpacity style={styles.btn} onPress={handleNext} activeOpacity={0.8}>
            <Text style={styles.btnText}>
              {isLast ? '知道了，开始烧菜！' : '下一步'}
            </Text>
          </TouchableOpacity>

          {/* 跳过 */}
          {!isLast && (
            <TouchableOpacity onPress={onDismiss}>
              <Text style={styles.skip}>跳过</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xxl,
  },
  card: {
    backgroundColor: Colors.bgWhite,
    borderRadius: BorderRadius.recipeCard,
    padding: Spacing.xxxl,
    alignItems: 'center',
    width: '100%',
    maxWidth: 340,
    ...Shadow.recipeCard,
  },
  emoji: { fontSize: 64, marginBottom: Spacing.lg },
  title: {
    fontSize: FontSize.section,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  desc: {
    fontSize: FontSize.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: Spacing.xl,
  },
  dots: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.borderLight,
  },
  dotActive: {
    backgroundColor: Colors.accentPrimary,
    width: 24,
  },
  btn: {
    backgroundColor: Colors.accentPrimary,
    paddingHorizontal: Spacing.xxxl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.button,
    width: '100%',
    alignItems: 'center',
    ...Shadow.button,
  },
  btnText: {
    fontSize: FontSize.button,
    fontWeight: FontWeight.semiBold,
    color: Colors.bgWhite,
  },
  skip: {
    fontSize: FontSize.caption,
    color: Colors.textMuted,
    marginTop: Spacing.md,
  },
});
