# 🔧 技术方案

> 版本：v1.0 | 最后更新：2026-06-01

---

## 一、技术选型

| 层级 | 技术 | 版本 | 选型理由 |
|------|------|------|----------|
| **框架** | React Native | ≥0.76 | 一套代码同时发布 iOS + Android，生态成熟 |
| **开发语言** | TypeScript | 5.x | 类型安全，减少运行时错误 |
| **构建工具** | Expo (Managed) | SDK 52+ | 开箱即用，无需配置原生代码，快速迭代 |
| **导航** | Expo Router | v4 | 基于文件系统路由，简洁直观 |
| **状态管理** | React Context + useReducer | - | 轻量，无需引入 Redux/Zustand |
| **本地存储** | AsyncStorage | - | React Native 官方推荐的 KV 存储 |
| **AI API** | Claude API (Anthropic) | - | 指令遵循能力强，中餐知识丰富 |
| **HTTP 请求** | fetch (内置) | - | 零依赖，满足需求 |
| **UI 组件** | 自定义 StyleSheet | - | 完全掌控设计风格，匹配淡橘黄活泼风格 |

---

## 二、项目结构

```
dishes/
├── app/                      # Expo Router 页面（文件即路由）
│   ├── _layout.tsx           # 根布局（底部 Tab 导航）
│   ├── (tabs)/
│   │   ├── _layout.tsx       # Tab 布局
│   │   ├── index.tsx         # 首页 — 食材选择
│   │   ├── favorites.tsx     # 收藏页
│   │   ├── history.tsx       # 历史记录页
│   │   └── fridge.tsx        # 我的冰箱页
│   ├── recommend.tsx         # 推荐结果页（Stack 推入）
│   └── recipe/[id].tsx       # 菜品详情页
├── src/
│   ├── components/           # 可复用组件
│   │   ├── IngredientGrid.tsx    # 食材网格
│   │   ├── IngredientCard.tsx    # 单个食材卡片
│   │   ├── CategoryTabs.tsx      # 分类标签
│   │   ├── SelectedBar.tsx       # 已选食材横条
│   │   ├── RecipeCard.tsx        # 菜品推荐卡片
│   │   ├── StepList.tsx          # 制作步骤列表
│   │   └── FilterModal.tsx       # 筛选偏好弹窗
│   ├── data/
│   │   └── ingredients.ts    # 食材数据（名称、emoji、分类）
│   ├── services/
│   │   └── ai.ts             # Claude API 调用封装
│   ├── store/
│   │   ├── AppContext.tsx     # 全局状态
│   │   └── storage.ts        # AsyncStorage 读写封装
│   ├── types/
│   │   └── index.ts          # TypeScript 类型定义
│   └── constants/
│       └── theme.ts          # 主题色、字体大小等常量
├── assets/                   # 静态资源（图片、字体）
├── docs/                     # 项目文档
├── dev-logs/                 # 开发日志
├── app.json                  # Expo 配置
├── tsconfig.json
└── package.json
```

---

## 三、数据流设计

```
用户点击食材
    │
    ▼
AppContext (selectedIngredients: string[])
    │
    ▼
用户点击「找菜」
    │
    ▼
ai.ts → fetch Claude API
    │   ├── 传入：已选食材列表 + 筛选偏好
    │   └── 返回：菜品名称、所需食材、步骤、时间、难度
    │
    ▼
推荐结果页展示
    │
    ├── 「就这个」→ 保存到历史 → 跳转详情页
    └── 「换一个」→ 再次调用 AI（排除已推荐菜品）
```

---

## 四、本地存储设计

| Key | 类型 | 内容 |
|-----|------|------|
| `fridge` | `string[]` | 冰箱中的食材列表 |
| `favorites` | `Recipe[]` | 收藏的菜品列表 |
| `history` | `Recipe[]` | 查看历史（最新 50 条） |
| `preferences` | `object` | 筛选偏好（菜系、难度、时间） |

---

## 五、AI Prompt 设计原则

- 结构化输出：要求 AI 返回 JSON 格式
- 语言：简体中文
- 约束：只使用中式烹饪方法，步骤清晰可操作
- 缺料处理：如果缺关键食材（主料），建议替代方案
- 排除列表：传递已推荐菜品名称，避免重复
