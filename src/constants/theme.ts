// ============================================================
// 🎨 主题常量 — "今天吃什么" App
// 所有颜色、字体、间距统一从这里引用，不要硬编码
// ============================================================

// ---- 色彩系统 ----
export const Colors = {
  // 背景
  bgPrimary: '#FFF3E0',       // 页面主背景（淡橘）
  bgCard: '#FFE0B2',          // 卡片区块背景（卡片橘）
  bgWhite: '#FFFFFF',         // 纯白卡片

  // 强调
  accentPrimary: '#FF9800',   // 主强调橙（按钮、选中态）
  accentDeep: '#F57C00',      // 深强调橙（按下态）

  // 文字
  textPrimary: '#333333',     // 标题、正文
  textSecondary: '#666666',   // 说明文字
  textMuted: '#999999',       // 辅助信息（时间、难度标签）

  // 状态色
  success: '#4CAF50',         // 已有食材标签
  danger: '#FF5252',          // 缺食材标签、取消按钮

  // 边框
  borderLight: '#E0E0E0',     // 未选中边框
  borderAccent: '#FF9800',    // 选中边框
} as const;

// ---- 字体大小 ----
export const FontSize = {
  title: 24,        // 页面大标题
  section: 18,      // 区块标题
  body: 14,         // 正文/食材名
  caption: 12,      // 辅助说明
  button: 16,       // 按钮文字
  emoji: 36,        // 食材 emoji 大小
  emojiSmall: 28,   // 小号 emoji
} as const;

// ---- 字重 ----
export const FontWeight = {
  bold: '700' as const,
  semiBold: '600' as const,
  medium: '500' as const,
  regular: '400' as const,
};

// ---- 间距 (4的倍数体系) ----
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

// ---- 圆角 ----
export const BorderRadius = {
  card: 12,           // 食材卡片
  recipeCard: 16,     // 菜品推荐卡
  button: 24,         // 胶囊按钮
  tag: 16,            // 分类标签
  small: 8,           // 小元素
} as const;

// ---- 阴影 ----
export const Shadow = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  recipeCard: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 5,
  },
  button: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
} as const;
