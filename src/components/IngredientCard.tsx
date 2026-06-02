// ============================================================
// 🥬 食材卡片 — 彩色方块图标 + 名称
// ============================================================
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import { useRef, useEffect } from 'react';
import {
  Colors,
  FontSize,
  FontWeight,
  Spacing,
  BorderRadius,
  Shadow,
} from '@/constants/theme';
import { playTick } from '@/utils/sound';
import type { Ingredient } from '@/types';

type Props = {
  ingredient: Ingredient;
  selected: boolean;
  onPress: (ingredient: Ingredient) => void;
};

export default function IngredientCard({ ingredient, selected, onPress }: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.92, duration: 75, useNativeDriver: true }),
      Animated.spring(scale, {
        toValue: selected ? 1.05 : 1,
        friction: 4,
        tension: 150,
        useNativeDriver: true,
      }),
    ]).start();
  }, [selected]);

  const handlePress = () => {
    playTick(selected);
    onPress(ingredient);
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        style={[styles.card, selected && styles.cardSelected]}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <View style={[styles.icon, { backgroundColor: ingredient.color }]}>
          <Text style={styles.iconLabel} numberOfLines={1}>
            {ingredient.label}
          </Text>
        </View>
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
    height: 92,
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
  icon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  iconLabel: {
    fontSize: 14,
    fontWeight: FontWeight.bold,
    color: Colors.bgWhite,
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
