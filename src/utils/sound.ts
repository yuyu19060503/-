// ============================================================
// 🔊 点击音效 — 预热模式，首次触摸激活 AudioContext
// ============================================================
let ctx: AudioContext | null = null;

function initCtx(): AudioContext | null {
  if (ctx) return ctx;
  try { ctx = new (window.AudioContext || (window as any).webkitAudioContext)(); } catch { return null; }
  return ctx;
}

// 预热：第一次用户触摸页面时激活 AudioContext
if (typeof document !== 'undefined') {
  document.addEventListener('touchstart', () => {
    const c = initCtx();
    if (c && c.state === 'suspended') c.resume();
  }, { once: true });
  document.addEventListener('click', () => {
    const c = initCtx();
    if (c && c.state === 'suspended') c.resume();
  }, { once: true });
}

export function playTick(isDeselect = false): void {
  const c = initCtx();
  if (!c) return;
  const now = c.currentTime;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.connect(gain); gain.connect(c.destination);
  osc.frequency.value = isDeselect ? 500 : 800;
  osc.type = 'sine';
  gain.gain.setValueAtTime(0.25, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
  osc.start(now); osc.stop(now + 0.12);
}
