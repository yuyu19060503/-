// ============================================================
// 🌐 网络状态检测
// ============================================================
import { useState, useEffect } from 'react';
import * as Network from 'expo-network';

/** 监听网络状态，返回是否在线 */
export function useNetworkStatus(): {
  isConnected: boolean | null;
  isChecking: boolean;
} {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function check() {
      try {
        const state = await Network.getNetworkStateAsync();
        if (!cancelled) {
          setIsConnected(state.isConnected ?? false);
          setIsChecking(false);
        }
      } catch {
        if (!cancelled) {
          setIsConnected(false);
          setIsChecking(false);
        }
      }
    }

    check();
    return () => {
      cancelled = true;
    };
  }, []);

  return { isConnected, isChecking };
}
