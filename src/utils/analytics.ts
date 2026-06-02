// ============================================================
// 📊 数据埋点 — 事件缓冲 + console 输出 + 预留 sendBeacon
// ============================================================

type EventName =
  | 'page_view' | 'ingredient_toggle' | 'search_click'
  | 'recipe_view' | 'recipe_swap' | 'recipe_confirm'
  | 'favorite_add' | 'favorite_remove'
  | 'filter_change' | 'fridge_action' | 'onboarding_complete';

type EventData = Record<string, string | number | boolean>;

interface AnalyticsEvent {
  name: EventName;
  data: EventData;
  ts: number;
}

const buffer: AnalyticsEvent[] = [];
const FLUSH_INTERVAL = 30_000;
const FLUSH_SIZE = 10;

/** 记录一条埋点事件 */
export function track(name: EventName, data: EventData = {}): void {
  buffer.push({ name, data, ts: Date.now() });
  if (buffer.length >= FLUSH_SIZE) flush();
}

/** 批量输出事件 */
function flush(): void {
  if (buffer.length === 0) return;
  const batch = buffer.splice(0);
  // 当前阶段：console 输出，方便开发调试
  console.log(
    `[Analytics] ${new Date().toISOString()} — ${batch.length} events`,
    batch.map((e) => `${e.name}(${JSON.stringify(e.data)})`).join(', ')
  );
  // 后续可改为 sendBeacon('/api/analytics', JSON.stringify(batch))
}

// 定时刷新
if (typeof window !== 'undefined') {
  setInterval(flush, FLUSH_INTERVAL);
}
