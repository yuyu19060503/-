// ============================================================
// 📦 TypeScript 类型定义
// ============================================================

/** 食材分类 */
export type IngredientCategory = '蔬菜' | '肉类' | '豆蛋' | '调料' | '主食';

/** 单个食材 */
export interface Ingredient {
  id: string;
  name: string;
  color: string;
  label: string;
  category: IngredientCategory;
}

/** 菜系 */
export type Cuisine = '川菜' | '粤菜' | '鲁菜' | '苏菜' | '家常菜' | '其他';

/** 难度 */
export type Difficulty = '简单' | '中等' | '困难';

/** 时间范围 */
export type TimeRange = '≤15分钟' | '≤30分钟' | '≤1小时' | '不限';

/** 筛选偏好 */
export interface FilterPreferences {
  cuisine: Cuisine | null;
  difficulty: Difficulty | null;
  timeRange: TimeRange;
}

/** 菜品（AI 返回结构） */
export interface Recipe {
  id: string;
  name: string;
  cuisine: Cuisine;
  difficulty: Difficulty;
  cookingTime: number;
  matchedIngredients: string[];
  missingIngredients: string[];
  steps: string[];
  tip?: string;
  /** 用户已选食材数 / 总需食材数 */
  matchCount: number;
  totalCount: number;
}

/** AI API 请求 */
export interface RecommendRequest {
  ingredients: string[];
  preferences: FilterPreferences;
  excludeNames: string[];
}

/** AI API 原始返回 */
export interface RecommendResponse {
  name: string;
  cuisine: string;
  difficulty: string;
  cookingTime: number;
  matchedIngredients: string[];
  missingIngredients: string[];
  steps: string[];
  tip?: string;
}
