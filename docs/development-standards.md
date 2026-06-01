# 📐 开发标准

> 版本：v1.0 | 最后更新：2026-06-01

---

## 一、代码规范

### 1.1 命名

| 类型 | 规范 | 示例 |
|------|------|------|
| 文件名 | kebab-case（小写+连字符）| `ingredient-card.tsx` |
| 组件名 | PascalCase | `IngredientCard` |
| 函数/变量 | camelCase | `handleSelectIngredient` |
| 常量 | UPPER_SNAKE_CASE | `PRIMARY_COLOR` |
| 类型/接口 | PascalCase | `Ingredient`, `RecipeStep` |

### 1.2 文件组织

- 每个文件只导出一个主组件
- 子组件放同级文件夹下的 `components/`
- 类型定义集中存放 `src/types/index.ts`
- 工具函数放 `src/utils/`

### 1.3 TypeScript

- 所有组件必须定义 Props 类型
- 禁止使用 `any`（万不得已需加注释说明）
- API 返回值必须定义类型

---

## 二、组件编写规范

### 2.1 组件结构顺序

```tsx
// 1. 导入
import { StyleSheet, View } from 'react-native';
import { useAppContext } from '@/store/AppContext';

// 2. 类型定义
type Props = { ... };

// 3. 组件
export default function MyComponent({ ... }: Props) {
  // hooks
  // state
  // effects
  // handlers
  // render
}

// 4. 样式
const styles = StyleSheet.create({ ... });
```

### 2.2 样式规范

- 使用 `StyleSheet.create` 定义样式
- 颜色统一从 `constants/theme.ts` 导入
- 间距使用 4 的倍数（4/8/12/16/20/24/32）

---

## 三、Git 提交规范

### 3.1 分支策略

- `main` — 稳定分支，每个 Phase 结束合并一次
- `phase-X-feature` — 各阶段开发分支

### 3.2 提交信息格式

```
<type>: <简短描述>

- feat: 新功能
- fix: 修复
- style: UI样式调整
- refactor: 重构
- docs: 文档
- chore: 杂项
```

示例：
```
feat: 添加食材选择网格组件
fix: 修复分类切换时食材不刷新问题
style: 调整食材卡片选中状态颜色
```

---

## 四、AI Prompt 规范

### 4.1 菜品推荐 Prompt 固定结构

```
系统指令：你是一位专业的中餐厨师，擅长根据现有食材创作菜谱。
用户食材：[食材列表]
筛选偏好：[菜系/难度/时间]
已排除菜品：[列表]
请推荐一道菜品，以 JSON 格式返回：
{
  "name": "菜品名",
  "cuisine": "菜系",
  "difficulty": "简单|中等|困难",
  "cookingTime": 分钟数,
  "matchedIngredients": ["已匹配食材"],
  "missingIngredients": ["缺少食材"],
  "steps": ["步骤1", "步骤2", ...],
  "tip": "烹饪小贴士"
}
```

### 4.2 注意事项

- Temperature 设 0.8（保证多样性）
- 每次请求附带已推荐列表，避免重复
- 保留 system prompt，用户 prompt 动态变化

---

## 五、测试策略

| 层级 | 范围 | 方式 |
|------|------|------|
| 类型检查 | 全量 | `tsc --noEmit` |
| 组件渲染 | 核心组件 | 手动在模拟器验证 |
| AI 返回 | API 响应解析 | 手动测试 + 边界 case |
| 持久化 | 增删改查 | 手动验证 |

> 项目初期不引入自动化测试框架，以手动验证为主，Phase 6 再评估。

---

## 六、错误处理规范

- AI 调用超时（10s）→ 提示「正在思考中，请稍后再试」
- 网络异常 → 提示「网络连接失败，请检查网络」
- 返回数据解析失败 → 提示「出了点问题，请重试」
- 食材选择为空 → 按钮置灰，显示「请至少选择一种食材」
