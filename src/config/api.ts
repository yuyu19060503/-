// ============================================================
// 🔑 API 密钥配置
// 本地开发：创建 .env 文件，写入 EXPO_PUBLIC_DEEPSEEK_API_KEY=sk-xxx
// Vercel 部署：在 Vercel 后台设置环境变量 EXPO_PUBLIC_DEEPSEEK_API_KEY
// ============================================================

export const DEEPSEEK_API_KEY = process.env.EXPO_PUBLIC_DEEPSEEK_API_KEY || '';

export const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

export const DEEPSEEK_MODEL = 'deepseek-chat';
