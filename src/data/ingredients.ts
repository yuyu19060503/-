// ============================================================
// 🥬 食材数据库 — 中餐常见食材 96 种
// 按分类：蔬菜 | 肉类 | 豆蛋 | 调料 | 主食
// ============================================================
import type { Ingredient } from '@/types';

export const INGREDIENTS: Ingredient[] = [
  // ---- 🌿 蔬菜（30种）----
  { id: 'veg-01', name: '白菜', emoji: '🥬', category: '蔬菜' },
  { id: 'veg-02', name: '菠菜', emoji: '🥬', category: '蔬菜' },
  { id: 'veg-03', name: '生菜', emoji: '🥬', category: '蔬菜' },
  { id: 'veg-04', name: '油菜', emoji: '🥬', category: '蔬菜' },
  { id: 'veg-05', name: '芹菜', emoji: '🥬', category: '蔬菜' },
  { id: 'veg-06', name: '空心菜', emoji: '🥬', category: '蔬菜' },
  { id: 'veg-07', name: '西红柿', emoji: '🍅', category: '蔬菜' },
  { id: 'veg-08', name: '黄瓜', emoji: '🥒', category: '蔬菜' },
  { id: 'veg-09', name: '冬瓜', emoji: '🍈', category: '蔬菜' },
  { id: 'veg-10', name: '南瓜', emoji: '🎃', category: '蔬菜' },
  { id: 'veg-11', name: '茄子', emoji: '🍆', category: '蔬菜' },
  { id: 'veg-12', name: '土豆', emoji: '🥔', category: '蔬菜' },
  { id: 'veg-13', name: '白萝卜', emoji: '🥕', category: '蔬菜' },
  { id: 'veg-14', name: '胡萝卜', emoji: '🥕', category: '蔬菜' },
  { id: 'veg-15', name: '洋葱', emoji: '🧅', category: '蔬菜' },
  { id: 'veg-16', name: '大蒜', emoji: '🧄', category: '蔬菜' },
  { id: 'veg-17', name: '大葱', emoji: '🫒', category: '蔬菜' },
  { id: 'veg-18', name: '生姜', emoji: '🫚', category: '蔬菜' },
  { id: 'veg-19', name: '青椒', emoji: '🫑', category: '蔬菜' },
  { id: 'veg-20', name: '红椒', emoji: '🌶️', category: '蔬菜' },
  { id: 'veg-21', name: '青椒（甜）', emoji: '🫑', category: '蔬菜' },
  { id: 'veg-22', name: '豆角', emoji: '🫘', category: '蔬菜' },
  { id: 'veg-23', name: '四季豆', emoji: '🫘', category: '蔬菜' },
  { id: 'veg-24', name: '西兰花', emoji: '🥦', category: '蔬菜' },
  { id: 'veg-25', name: '花菜', emoji: '🥦', category: '蔬菜' },
  { id: 'veg-26', name: '荷兰豆', emoji: '🫛', category: '蔬菜' },
  { id: 'veg-27', name: '玉米', emoji: '🌽', category: '蔬菜' },
  { id: 'veg-28', name: '山药', emoji: '🥔', category: '蔬菜' },
  { id: 'veg-29', name: '莲藕', emoji: '🪷', category: '蔬菜' },
  { id: 'veg-30', name: '香菇', emoji: '🍄', category: '蔬菜' },

  // ---- 🥩 肉类（28种）----
  { id: 'meat-01', name: '猪肉（五花）', emoji: '🥩', category: '肉类' },
  { id: 'meat-02', name: '猪肉（瘦肉）', emoji: '🥩', category: '肉类' },
  { id: 'meat-03', name: '猪排骨', emoji: '🍖', category: '肉类' },
  { id: 'meat-04', name: '猪蹄', emoji: '🍖', category: '肉类' },
  { id: 'meat-05', name: '猪肝', emoji: '🥩', category: '肉类' },
  { id: 'meat-06', name: '牛肉', emoji: '🥩', category: '肉类' },
  { id: 'meat-07', name: '牛腩', emoji: '🥩', category: '肉类' },
  { id: 'meat-08', name: '羊肉', emoji: '🍖', category: '肉类' },
  { id: 'meat-09', name: '鸡肉', emoji: '🍗', category: '肉类' },
  { id: 'meat-10', name: '鸡胸肉', emoji: '🍗', category: '肉类' },
  { id: 'meat-11', name: '鸡腿', emoji: '🍗', category: '肉类' },
  { id: 'meat-12', name: '鸡翅', emoji: '🍗', category: '肉类' },
  { id: 'meat-13', name: '鸡爪', emoji: '🍗', category: '肉类' },
  { id: 'meat-14', name: '鸭肉', emoji: '🦆', category: '肉类' },
  { id: 'meat-15', name: '鸭脖', emoji: '🦆', category: '肉类' },
  { id: 'meat-16', name: '鱼肉（草鱼）', emoji: '🐟', category: '肉类' },
  { id: 'meat-17', name: '鱼肉（鲫鱼）', emoji: '🐟', category: '肉类' },
  { id: 'meat-18', name: '鱼肉（鲈鱼）', emoji: '🐟', category: '肉类' },
  { id: 'meat-19', name: '虾仁', emoji: '🍤', category: '肉类' },
  { id: 'meat-20', name: '大虾', emoji: '🦐', category: '肉类' },
  { id: 'meat-21', name: '螃蟹', emoji: '🦀', category: '肉类' },
  { id: 'meat-22', name: '蛤蜊', emoji: '🦪', category: '肉类' },
  { id: 'meat-23', name: '鱿鱼', emoji: '🦑', category: '肉类' },
  { id: 'meat-24', name: '带鱼', emoji: '🐟', category: '肉类' },
  { id: 'meat-25', name: '午餐肉', emoji: '🥫', category: '肉类' },
  { id: 'meat-26', name: '火腿肠', emoji: '🌭', category: '肉类' },
  { id: 'meat-27', name: '腊肉', emoji: '🥓', category: '肉类' },
  { id: 'meat-28', name: '培根', emoji: '🥓', category: '肉类' },

  // ---- 🥚 豆制品/蛋类（14种）----
  { id: 'bean-01', name: '鸡蛋', emoji: '🥚', category: '豆蛋' },
  { id: 'bean-02', name: '鸭蛋', emoji: '🥚', category: '豆蛋' },
  { id: 'bean-03', name: '咸鸭蛋', emoji: '🥚', category: '豆蛋' },
  { id: 'bean-04', name: '皮蛋', emoji: '🥚', category: '豆蛋' },
  { id: 'bean-05', name: '嫩豆腐', emoji: '🧈', category: '豆蛋' },
  { id: 'bean-06', name: '老豆腐', emoji: '🧈', category: '豆蛋' },
  { id: 'bean-07', name: '豆腐干', emoji: '🧈', category: '豆蛋' },
  { id: 'bean-08', name: '豆腐皮', emoji: '🧈', category: '豆蛋' },
  { id: 'bean-09', name: '腐竹', emoji: '🫘', category: '豆蛋' },
  { id: 'bean-10', name: '油豆腐', emoji: '🧈', category: '豆蛋' },
  { id: 'bean-11', name: '黄豆', emoji: '🫘', category: '豆蛋' },
  { id: 'bean-12', name: '绿豆', emoji: '🫘', category: '豆蛋' },
  { id: 'bean-13', name: '红豆', emoji: '🫘', category: '豆蛋' },
  { id: 'bean-14', name: '黑木耳', emoji: '🍄', category: '豆蛋' },

  // ---- 🧂 调味料（13种）----
  { id: 'spice-01', name: '盐', emoji: '🧂', category: '调料' },
  { id: 'spice-02', name: '酱油', emoji: '🫗', category: '调料' },
  { id: 'spice-03', name: '老抽', emoji: '🫗', category: '调料' },
  { id: 'spice-04', name: '醋', emoji: '🫗', category: '调料' },
  { id: 'spice-05', name: '料酒', emoji: '🍶', category: '调料' },
  { id: 'spice-06', name: '蚝油', emoji: '🫗', category: '调料' },
  { id: 'spice-07', name: '豆瓣酱', emoji: '🫙', category: '调料' },
  { id: 'spice-08', name: '辣椒酱', emoji: '🌶️', category: '调料' },
  { id: 'spice-09', name: '番茄酱', emoji: '🫙', category: '调料' },
  { id: 'spice-10', name: '花椒', emoji: '🫑', category: '调料' },
  { id: 'spice-11', name: '干辣椒', emoji: '🌶️', category: '调料' },
  { id: 'spice-12', name: '八角', emoji: '⭐', category: '调料' },
  { id: 'spice-13', name: '白糖', emoji: '🍬', category: '调料' },

  // ---- 🍚 主食（11种）----
  { id: 'staple-01', name: '大米', emoji: '🍚', category: '主食' },
  { id: 'staple-02', name: '小米', emoji: '🌾', category: '主食' },
  { id: 'staple-03', name: '糯米', emoji: '🍚', category: '主食' },
  { id: 'staple-04', name: '面粉', emoji: '🌾', category: '主食' },
  { id: 'staple-05', name: '面条', emoji: '🍜', category: '主食' },
  { id: 'staple-06', name: '挂面', emoji: '🍝', category: '主食' },
  { id: 'staple-07', name: '粉丝', emoji: '🍜', category: '主食' },
  { id: 'staple-08', name: '红薯粉', emoji: '🍜', category: '主食' },
  { id: 'staple-09', name: '方便面', emoji: '🍜', category: '主食' },
  { id: 'staple-10', name: '面包', emoji: '🍞', category: '主食' },
  { id: 'staple-11', name: '馒头', emoji: '🥟', category: '主食' },
];

/** 按分类获取食材 */
export function getIngredientsByCategory(
  category: string
): Ingredient[] {
  return INGREDIENTS.filter((i) => i.category === category);
}

/** 食材分类列表 */
export const CATEGORIES = ['蔬菜', '肉类', '豆蛋', '调料', '主食'] as const;
