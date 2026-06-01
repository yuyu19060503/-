# CLAUDE.md — "今天吃什么" 项目指引

> 本文件为 Claude Code 提供项目工作指引。每次会话开始时自动加载。

---

## 项目简介

「今天吃什么」— 根据现有食材用 AI 推荐菜品的跨平台手机 App（React Native + Expo）。

---

## 标准文件路径

| 文档 | 路径 | 用途 |
|------|------|------|
| 需求文档 | `docs/requirements.md` | 完整功能需求、页面结构 |
| 技术方案 | `docs/tech-stack.md` | 技术选型、项目结构、数据流 |
| 设计规范 | `docs/design-spec.md` | 色彩、字体、组件样式、动画 |
| 开发计划 | `docs/development-plan.md` | 分阶段任务清单 |
| 开发标准 | `docs/development-standards.md` | 命名、代码组织、Git 提交、Prompt 规范 |
| 开发日志 | `dev-logs/` | 每日开发记录 |

---

## 工作流程

1. **每次开始工作前**：检查 `docs/development-plan.md` 确认当前 Phase 和待办事项
2. **编码前**：查阅 `docs/design-spec.md` 确认 UI 细节
3. **编码时**：遵守 `docs/development-standards.md` 中的命名和代码规范
4. **每天结束前**：更新 `dev-logs/YYYY-MM-DD.md` 记录当天完成事项和待办事项
5. **Phase 完成后**：更新 `docs/development-plan.md` 勾选已完成任务

---

## 关键约束

- 食材数据在 `src/data/ingredients.ts`，80–100 种中餐常见食材
- AI 调用走 Claude API，Prompt 模板见 `docs/development-standards.md` 第四节
- 所有用户数据存储在本地 AsyncStorage，不上传服务器
- UI 颜色从 `src/constants/theme.ts` 统一引用，不要硬编码色值
- 必须使用 TypeScript，禁止 `any` 类型
- 每完成一个功能点做一次提交，不积攒大量改动

---

## 开发环境

- 框架：Expo (Managed) + React Native + TypeScript
- 状态：React Context + useReducer
- 路由：Expo Router（文件系统路由）
- 存储：AsyncStorage
- AI：Claude API

---

## 当前状态

- **当前阶段**：Phase 0 — 需求确认与规划完成，即将进入 Phase 1
- **下一步**：Phase 1 — 项目初始化（Expo 脚手架 + Tab 导航骨架）
