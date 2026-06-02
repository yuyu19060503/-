// ============================================================
// 🔊 点击音效 — Web Audio API 合成（无需外部音频文件）
// ============================================================

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (audioCtx) return audioCtx;
  try {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  } catch {
    return null;
  }
  return audioCtx;
}

/**
 * 播放短促「哒」音
 * @param isDeselect true=取消选中（音高较低），false=选中（音高较高）
 */
export function playTick(isDeselect = false): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  // 恢复被浏览器挂起的 AudioContext（iOS 需要用户交互后才允许播放）
  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }

  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();

  oscillator.connect(gain);
  gain.connect(ctx.destination);

  // 选中音高 800Hz，取消选中 500Hz
  oscillator.frequency.value = isDeselect ? 500 : 800;
  oscillator.type = 'sine';

  // 极短的衰减音
  const now = ctx.currentTime;
  gain.gain.setValueAtTime(0.12, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

  oscillator.start(now);
  oscillator.stop(now + 0.08);
}
