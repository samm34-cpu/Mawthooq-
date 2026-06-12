'use client';

import React from 'react';

interface StarsProps {
  score: number;
  size?: number;
  interactive?: boolean;
  onRate?: (rating: number) => void;
  hoverRating?: number;
  onHover?: (rating: number) => void;
  onLeave?: () => void;
}

export function Stars({ score, size = 18, interactive = false, onRate, hoverRating, onHover, onLeave }: StarsProps) {
  const displayScore = hoverRating !== undefined ? hoverRating : score;

  return (
    <div
      style={{ display: 'inline-flex', gap: 2 }}
      onMouseLeave={interactive ? onLeave : undefined}
    >
      {[1, 2, 3, 4, 5].map(i => {
        const filled = displayScore >= i;
        const partial = !filled && displayScore > i - 1 && displayScore < i;
        const pct = partial ? Math.round((displayScore - (i - 1)) * 100) : 0;

        return (
          <span
            key={i}
            style={{
              position: 'relative',
              display: 'inline-block',
              width: size,
              height: size,
              cursor: interactive ? 'pointer' : 'default',
              transform: interactive ? 'scale(1)' : undefined,
              transition: interactive ? 'transform 0.15s ease' : undefined,
            }}
            onClick={interactive ? () => onRate?.(i) : undefined}
            onMouseEnter={interactive ? () => onHover?.(i) : undefined}
          >
            {/* Background star (empty) */}
            <svg
              width={size}
              height={size}
              viewBox="0 0 24 24"
              style={{ position: 'absolute', top: 0, left: 0 }}
            >
              <polygon
                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                fill="var(--star-empty)"
                stroke="none"
              />
            </svg>
            {/* Foreground star (filled) - clipped */}
            <svg
              width={size}
              height={size}
              viewBox="0 0 24 24"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                clipPath: filled ? 'none' : partial ? `inset(0 ${100 - pct}% 0 0)` : 'inset(0 100% 0 0)',
              }}
            >
              <polygon
                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                fill="var(--star)"
                stroke="none"
              />
            </svg>
          </span>
        );
      })}
    </div>
  );
}
