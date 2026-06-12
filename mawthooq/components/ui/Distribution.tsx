'use client';

import React, { useState, useEffect } from 'react';

interface DistributionProps {
  dist: number[]; // [5star%, 4star%, 3star%, 2star%, 1star%]
  animate?: boolean;
}

export function Distribution({ dist, animate = true }: DistributionProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {[5, 4, 3, 2, 1].map((star, idx) => {
        const pct = dist[idx] ?? 0;
        const barColor = pct >= 50 ? 'var(--trust)' : pct >= 30 ? '#F0A500' : 'var(--accent)';

        return (
          <div key={star} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 11, color: 'var(--muted)', width: 8, textAlign: 'center', flexShrink: 0 }}>
              {star}
            </span>
            <div
              style={{
                flex: 1,
                height: 6,
                background: 'var(--star-empty)',
                borderRadius: 3,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: animate && mounted ? `${pct}%` : '0%',
                  background: barColor,
                  borderRadius: 3,
                  transition: animate ? `width ${0.6 + idx * 0.1}s cubic-bezier(0.22,1,0.36,1)` : 'none',
                }}
              />
            </div>
            <span style={{ fontSize: 11, color: 'var(--muted)', width: 28, textAlign: 'start', flexShrink: 0 }}>
              {pct}%
            </span>
          </div>
        );
      })}
    </div>
  );
}
