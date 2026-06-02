// ============================================================
// 🔑 API 密钥配置
// 优先读环境变量，否则用硬编码值（保证 Vercel 构建后能调通 API）
// ============================================================

export const DEEPSEEK_API_KEY =
  process.env.EXPO_PUBLIC_DEEPSEEK_API_KEY ||
  'sk-815dfc9d403d45f798f9d05e65a1cce6';

export const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

export const DEEPSEEK_MODEL = 'deepseek-chat';
