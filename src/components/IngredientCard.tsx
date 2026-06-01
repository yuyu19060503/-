// ============================================================
// 🥬 食材卡片 — 单个可选食材
// 尺寸：72×88，emoji 上 + 名称下
// ============================================================
import { StyleSheet, Text, TouchableOpacity, Animated } from 'react-native';
import { useRef, useEffect } from 'react';
import {
  Colors,
  FontSize,
  FontWeight,
  Spacing,
  BorderRadius,
  Shadow,
} from '@/constants/theme';
import type { Ingredient } from '@/types';

type Props = {
  ingredient: Ingredient;
  selected: boolean;
  onPress: (ingredient: Ingredient) => void;
};

export default function IngredientCard({
  ingredient,
  selected,
  onPress,
}: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.92,
        duration: 75,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: selected ? 1.05 : 1,
        friction: 4,
        tension: 150,
        useNativeDriver: true,
      }),
    ]).start();
  }, [selected]);

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        style={[styles.card, selected && styles.cardSelected]}
        onPress={() => onPress(ingredient)}
        activeOpacity={0.7}
      >
        <Text style={styles.emoji}>{ingredient.emoji}</Text>
        <Text style={[styles.name, selected && styles.nameSelected]}>
          {ingredient.name}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 72,
    height: 88,
    backgroundColor: Colors.bgWhite,
    borderRadius: BorderRadius.card,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: Colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
    ...Shadow.card,
  },
  cardSelected: {
    backgroundColor: Colors.bgCard,
    borderStyle: 'solid',
    borderColor: Colors.accentPrimary,
    borderWidth: 2,
  },
  emoji: {
    fontSize: FontSize.emoji,
    marginBottom: 4,
  },
  name: {
    fontSize: FontSize.caption,
    fontWeight: FontWeight.medium,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  nameSelected: {
    color: Colors.accentDeep,
    fontWeight: FontWeight.semiBold,
  },
});
