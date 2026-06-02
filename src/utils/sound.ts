// ============================================================
// 🔊 点击音效 — 修复移动端兼容性
// ============================================================

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (audioCtx) return audioCtx;
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    audioCtx = ctx;
    return ctx;
  } catch { return null; }
}

/** 播放短促点击音，异步确保 AudioContext 已激活 */
export async function playTick(isDeselect = false): Promise<void> {
  const ctx = getAudioContext();
  if (!ctx) return;

  // 关键修复：await resume，确保 iOS Safari 下 AudioContext 被激活
  try {
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }
  } catch { return; }

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.frequency.value = isDeselect ? 500 : 800;
  osc.type = 'sine';

  gain.gain.setValueAtTime(0.2, now);           // 提高音量
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

  osc.start(now);
  osc.stop(now + 0.1);
}
