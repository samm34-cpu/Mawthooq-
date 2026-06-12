'use client';

import React from 'react';
import { Icon } from './Icon';

interface MediaSlotProps {
  ratio?: number;
  hue?: number;
  isVideo?: boolean;
  label?: string;
}

export function MediaSlot({ ratio = 1.0, hue = 200, isVideo = false, label }: MediaSlotProps) {
  const height = Math.round(200 / ratio);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height,
        borderRadius: 12,
        overflow: 'hidden',
        background: `hsl(${hue}, 40%, 85%)`,
      }}
    >
      {/* Stripe pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `repeating-linear-gradient(
            45deg,
            rgba(255,255,255,0.15) 0px,
            rgba(255,255,255,0.15) 8px,
            transparent 8px,
            transparent 24px
          )`,
        }}
      />
      {/* Shimmer overlay */}
      <div
        className="shimmer"
        style={{
          position: 'absolute',
          inset: 0,
        }}
      />
      {/* Play button for videos */}
      {isVideo && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
            }}
          >
            <Icon name="Play" size={20} className="text-[var(--ink)]" />
          </div>
        </div>
      )}
      {/* Label */}
      {label && (
        <div
          style={{
            position: 'absolute',
            bottom: 8,
            insetInlineStart: 8,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(6px)',
            borderRadius: 6,
            padding: '2px 8px',
            fontSize: 11,
            color: '#fff',
            fontWeight: 500,
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
}
