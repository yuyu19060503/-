// ============================================================
// 🤖 DeepSeek API 封装 — 菜品推荐 Prompt 工程
// ============================================================
import {
  DEEPSEEK_API_KEY,
  DEEPSEEK_API_URL,
  DEEPSEEK_MODEL,
} from '@/config/api';
import type { RecommendRequest, RecommendResponse } from '@/types';

/** 系统 Prompt：角色设定 + 输出格式约束 */
const SYSTEM_PROMPT = `你是一位专业的中国家庭厨师，擅长根据现有食材推荐家常菜品。

## 你的任务
用户会告诉你他家里现有的食材，请你推荐一道可以做的家常菜。

## 要求
1. 优先使用用户已有的食材，尽量减少需要额外购买的食材
2. 如果缺关键主料（如主菜肉类），可以建议替代方案
3. 步骤要具体可操作，每步 15-30 字
4. 菜系限定：川菜、粤菜、鲁菜、苏菜、家常菜、其他
5. 难度分三级：简单（新手能上手）、中等（需要基本刀工火候）、困难（多步骤复杂菜）

## 输出格式（必须严格 JSON，不要带其他文字）
{
  "name": "菜品名称",
  "cuisine": "菜系",
  "difficulty": "简单|中等|困难",
  "cookingTime": 分钟数(整数),
  "matchedIngredients": ["用户有的食材", ...],
  "missingIngredients": ["用户缺少的食材", ...],
  "steps": ["步骤1：...", "步骤2：...", ...],
  "tip": "一条烹饪小贴士（可选）"
}`;

/** 构建 user prompt */
function buildUserPrompt(
  ingredients: string[],
  excludeNames: string[],
  cuisine?: string | null,
  difficulty?: string | null,
  timeRange?: string | null
): string {
  let prompt = `我家里有以下食材：${ingredients.join('、')}。\n请推荐一道菜。`;

  if (cuisine) {
    prompt += `\n菜系偏好：${cuisine}。`;
  }
  if (difficulty) {
    prompt += `\n难度要求：${difficulty}。`;
  }
  if (timeRange && timeRange !== '不限') {
    prompt += `\n时间要求：${timeRange}。`;
  }
  if (excludeNames.length > 0) {
    prompt += `\n不要推荐以下菜品：${excludeNames.join('、')}。`;
  }

  return prompt;
}

/** 解析 AI 返回的 JSON */
function parseResponse(content: string): RecommendResponse {
  // 尝试提取 JSON（处理可能的 markdown 代码块包裹）
  let jsonStr = content.trim();

  // 去掉可能的 markdown 代码块标记
  const jsonMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (jsonMatch) {
    jsonStr = jsonMatch[1].trim();
  }

  return JSON.parse(jsonStr) as RecommendResponse;
}

/** 调用 DeepSeek API 获取菜品推荐 */
export async function getRecommendation(
  request: RecommendRequest
): Promise<RecommendResponse> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000); // 15 秒超时

  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: DEEPSEEK_MODEL,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          {
            role: 'user',
            content: buildUserPrompt(
              request.ingredients,
              request.excludeNames,
              request.preferences.cuisine,
              request.preferences.difficulty,
              request.preferences.timeRange
            ),
          },
        ],
        temperature: 0.8,   // 保证多样性
        max_tokens: 1024,
        stream: false,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`API 请求失败: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error('API 返回内容为空');
    }

    return parseResponse(content);
  } finally {
    clearTimeout(timeout);
  }
}
