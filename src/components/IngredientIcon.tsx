// ============================================================
// 🎨 食材插画图标 — View 组件手绘风格（15 种形状模板）
// ============================================================
import { StyleSheet, View } from 'react-native';

export type IconShape =
  | 'leafy' | 'round' | 'long' | 'gourd'
  | 'slice-meat' | 'meat-bone' | 'meat-roll'
  | 'fish' | 'shellfish'
  | 'egg' | 'tofu' | 'bean'
  | 'bottle' | 'jar' | 'grain';

type Props = { shape: IconShape; color: string; size?: number };

export default function IngredientIcon({ shape, color, size = 38 }: Props) {
  const s = size;
  const light = lighten(color);
  const dark = darken(color);

  switch (shape) {
    // ---- 蔬菜类 ----
    case 'leafy':
      return (
        <View style={[icon(s), { backgroundColor: light }]}>
          <View style={[leaf1(s, color)]} />
          <View style={[leaf2(s, dark)]} />
          <View style={[leaf3(s, color)]} />
        </View>
      );
    case 'round':
      return (
        <View style={[icon(s), { backgroundColor: light }]}>
          <View style={[circleBody(s, color)]} />
          <View style={[stem(s, dark)]} />
        </View>
      );
    case 'long':
      return (
        <View style={[icon(s), { backgroundColor: light }]}>
          <View style={[longBody(s, color)]} />
          <View style={[leafTop(s, dark)]} />
        </View>
      );
    case 'gourd':
      return (
        <View style={[icon(s), { backgroundColor: light }]}>
          <View style={[gourdBig(s, color)]} />
          <View style={[gourdSmall(s, dark)]} />
        </View>
      );

    // ---- 肉类 ----
    case 'slice-meat':
      return (
        <View style={[icon(s), { backgroundColor: light }]}>
          <View style={[meatRect(s, color)]} />
          <View style={[marble1(s)]} />
          <View style={[marble2(s)]} />
        </View>
      );
    case 'meat-bone':
      return (
        <View style={[icon(s), { backgroundColor: light }]}>
          <View style={[boneBody(s, color)]} />
          <View style={[boneLineV(s)]} />
          <View style={[boneLineH(s)]} />
        </View>
      );
    case 'meat-roll':
      return (
        <View style={[icon(s), { backgroundColor: light }]}>
          <View style={[rollOuter(s, color)]} />
          <View style={[rollInner(s, '#fff')]} />
        </View>
      );

    // ---- 水产 ----
    case 'fish':
      return (
        <View style={[icon(s), { backgroundColor: light }]}>
          <View style={[fishBody(s, color)]} />
          <View style={[fishTail(s, dark, light)]} />
        </View>
      );
    case 'shellfish':
      return (
        <View style={[icon(s), { backgroundColor: light }]}>
          <View style={[shellBody(s, color)]} />
          <View style={[shellLine1(s, dark)]} />
          <View style={[shellLine2(s, dark)]} />
        </View>
      );

    // ---- 蛋/豆 ----
    case 'egg':
      return (
        <View style={[icon(s), { backgroundColor: light }]}>
          <View style={[eggWhite(s)]} />
          <View style={[eggYolk(s, color)]} />
        </View>
      );
    case 'tofu':
      return (
        <View style={[icon(s), { backgroundColor: light }]}>
          <View style={[tofuBlock(s)]} />
          <View style={[tofuLine1(s)]} />
          <View style={[tofuLine2(s)]} />
        </View>
      );
    case 'bean':
      return (
        <View style={[icon(s), { backgroundColor: light, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: 2 }]}>
          <View style={[beanDot(s / 4, color)]} />
          <View style={[beanDot(s / 4, dark)]} />
          <View style={[beanDot(s / 4, color)]} />
        </View>
      );

    // ---- 调料 ----
    case 'bottle':
      return (
        <View style={[icon(s), { backgroundColor: light }]}>
          <View style={[bottleNeck(s, dark)]} />
          <View style={[bottleBody(s, color)]} />
        </View>
      );
    case 'jar':
      return (
        <View style={[icon(s), { backgroundColor: light }]}>
          <View style={[jarLid(s, dark)]} />
          <View style={[jarBody(s, color)]} />
        </View>
      );

    // ---- 主食 ----
    case 'grain':
      return (
        <View style={[icon(s), { backgroundColor: light, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: 1.5 }]}>
          <View style={[grainOval(s / 5, color)]} />
          <View style={[grainOval(s / 5, dark)]} />
          <View style={[grainOval(s / 5, color)]} />
          <View style={[grainOval(s / 5, dark)]} />
        </View>
      );

    default:
      return <View style={[icon(s), { backgroundColor: color, borderRadius: s * 0.25 }]} />;
  }
}

// ---- 通用 ----
const icon = (s: number) => ({
  width: s, height: s, borderRadius: s * 0.25, overflow: 'hidden' as const,
  justifyContent: 'center' as const, alignItems: 'center' as const,
});

// ---- 蔬菜形状 ----
const leaf1 = (s: number, c: string) => ({
  position: 'absolute' as const, width: s * 0.6, height: s * 0.35,
  borderRadius: 99, backgroundColor: c, top: s * 0.12, left: s * 0.08, transform: [{ rotate: '-15deg' }],
});
const leaf2 = (s: number, c: string) => ({
  position: 'absolute' as const, width: s * 0.55, height: s * 0.35,
  borderRadius: 99, backgroundColor: c, top: s * 0.32, left: s * 0.28, transform: [{ rotate: '5deg' }],
});
const leaf3 = (s: number, c: string) => ({
  position: 'absolute' as const, width: s * 0.55, height: s * 0.32,
  borderRadius: 99, backgroundColor: c, top: s * 0.5, left: s * 0.1, transform: [{ rotate: '-10deg' }],
});

const circleBody = (s: number, c: string) => ({
  width: s * 0.55, height: s * 0.55, borderRadius: 99, backgroundColor: c,
});
const stem = (s: number, c: string) => ({
  position: 'absolute' as const, top: s * 0.08, width: s * 0.12, height: s * 0.16,
  borderRadius: 99, backgroundColor: c,
});

const longBody = (s: number, c: string) => ({
  width: s * 0.28, height: s * 0.7, borderRadius: 99, backgroundColor: c,
});
const leafTop = (s: number, c: string) => ({
  position: 'absolute' as const, top: s * 0.05, width: s * 0.2, height: s * 0.1,
  borderRadius: 99, backgroundColor: c,
});

const gourdBig = (s: number, c: string) => ({
  position: 'absolute' as const, bottom: s * 0.06, width: s * 0.48, height: s * 0.45,
  borderRadius: 99, backgroundColor: c,
});
const gourdSmall = (s: number, c: string) => ({
  position: 'absolute' as const, top: s * 0.15, width: s * 0.3, height: s * 0.32,
  borderRadius: 99, backgroundColor: c, left: s * 0.35,
});

// ---- 肉类形状 ----
const meatRect = (s: number, c: string) => ({
  width: s * 0.7, height: s * 0.55, borderRadius: s * 0.12, backgroundColor: c,
});
const marble1 = (s: number) => ({
  position: 'absolute' as const, width: s * 0.4, height: 1.5,
  backgroundColor: 'rgba(255,255,255,0.6)', borderRadius: 1, top: s * 0.35,
});
const marble2 = (s: number) => ({
  position: 'absolute' as const, width: s * 0.3, height: 1.5,
  backgroundColor: 'rgba(255,255,255,0.6)', borderRadius: 1, top: s * 0.55, left: s * 0.1,
});

const boneBody = (s: number, c: string) => ({
  width: s * 0.65, height: s * 0.5, borderRadius: 99, backgroundColor: c,
});
const boneLineV = (s: number) => ({
  position: 'absolute' as const, width: 1.5, height: s * 0.55,
  backgroundColor: 'rgba(255,255,255,0.7)', left: s * 0.48,
});
const boneLineH = (s: number) => ({
  position: 'absolute' as const, width: s * 0.35, height: 1.5,
  backgroundColor: 'rgba(255,255,255,0.7)', top: s * 0.2,
});

const rollOuter = (s: number, c: string) => ({
  width: s * 0.55, height: s * 0.55, borderRadius: 99, backgroundColor: c,
  borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.5)',
});
const rollInner = (s: number, c: string) => ({
  position: 'absolute' as const, width: s * 0.2, height: s * 0.2,
  borderRadius: 99, backgroundColor: c, opacity: 0.7,
});

// ---- 水产形状 ----
const fishBody = (s: number, c: string) => ({
  width: s * 0.65, height: s * 0.38, borderRadius: 99, backgroundColor: c,
});
const fishTail = (s: number, c: string, bg: string) => ({
  position: 'absolute' as const, right: s * 0.02, top: s * 0.28,
  width: 0, height: 0,
  borderLeftWidth: s * 0.2, borderLeftColor: c,
  borderTopWidth: s * 0.12, borderTopColor: 'transparent',
  borderBottomWidth: s * 0.12, borderBottomColor: 'transparent',
});

const shellBody = (s: number, c: string) => ({
  width: s * 0.5, height: s * 0.5, borderRadius: 99, backgroundColor: c,
});
const shellLine1 = (s: number, c: string) => ({
  position: 'absolute' as const, top: s * 0.1, left: s * 0.22,
  width: s * 0.15, height: 2, backgroundColor: c, borderRadius: 1,
  transform: [{ rotate: '20deg' }],
});
const shellLine2 = (s: number, c: string) => ({
  position: 'absolute' as const, top: s * 0.2, right: s * 0.2,
  width: s * 0.15, height: 2, backgroundColor: c, borderRadius: 1,
  transform: [{ rotate: '-30deg' }],
});

// ---- 蛋/豆 ----
const eggWhite = (s: number) => ({
  width: s * 0.6, height: s * 0.7, borderRadius: 99,
  backgroundColor: '#fff', borderWidth: 1, borderColor: '#eee',
});
const eggYolk = (s: number, c: string) => ({
  position: 'absolute' as const, width: s * 0.28, height: s * 0.28,
  borderRadius: 99, backgroundColor: c, top: s * 0.32,
});

const tofuBlock = (s: number) => ({
  width: s * 0.6, height: s * 0.55, borderRadius: s * 0.08,
  backgroundColor: '#fffcf5', borderWidth: 1, borderColor: '#e8e0d0',
});
const tofuLine1 = (s: number) => ({
  position: 'absolute' as const, width: s * 0.6, height: 1,
  backgroundColor: '#e8e0d0', top: s * 0.42,
});
const tofuLine2 = (s: number) => ({
  position: 'absolute' as const, width: 1, height: s * 0.55,
  backgroundColor: '#e8e0d0', left: s * 0.5,
});

const beanDot = (d: number, c: string) => ({
  width: d, height: d * 1.3, borderRadius: 99, backgroundColor: c,
});

// ---- 调料形状 ----
const bottleNeck = (s: number, c: string) => ({
  position: 'absolute' as const, top: s * 0.06, width: s * 0.15, height: s * 0.22,
  borderRadius: s * 0.04, backgroundColor: c,
});
const bottleBody = (s: number, c: string) => ({
  position: 'absolute' as const, bottom: s * 0.05, width: s * 0.5, height: s * 0.52,
  borderRadius: s * 0.1, backgroundColor: c,
});

const jarLid = (s: number, c: string) => ({
  position: 'absolute' as const, top: s * 0.06, width: s * 0.45, height: s * 0.16,
  borderRadius: s * 0.06, backgroundColor: c,
});
const jarBody = (s: number, c: string) => ({
  position: 'absolute' as const, bottom: s * 0.05, width: s * 0.55, height: s * 0.55,
  borderRadius: s * 0.12, backgroundColor: c,
});

// ---- 主食 ----
const grainOval = (d: number, c: string) => ({
  width: d, height: d * 1.5, borderRadius: 99, backgroundColor: c,
});

// ---- 颜色辅助（简单调整亮度） ----
function lighten(hsl: string): string {
  const m = hsl.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
  if (!m) return '#f5f5f5';
  const l = Math.min(95, parseInt(m[3]) + 30);
  return `hsl(${m[1]}, ${m[2]}%, ${l}%)`;
}
function darken(hsl: string): string {
  const m = hsl.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
  if (!m) return '#999';
  const l = Math.max(10, parseInt(m[3]) - 18);
  return `hsl(${m[1]}, ${m[2]}%, ${l}%)`;
}
