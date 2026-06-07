'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import type { PostMeta } from '@/lib/markdown';

interface PostCardProps {
  post:  PostMeta;
  type:  'articles' | 'writeups';
  index: number;
}

export default function PostCard({ post, type, index }: PostCardProps) {
  const [hovered, setHovered] = useState(false);

  const href   = `/${type}/${post.slug}`;
  const isCtf  = type === 'writeups';
  const accent = isCtf ? '#ef4444' : '#7c3aed';
  const aAlpha = isCtf ? 'rgba(239,68,68,' : 'rgba(124,58,237,';
  const soft   = isCtf ? '#fca5a5' : '#a78bfa';

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.38 }}
      whileHover={{ y: -3 }}
    >
      <Link
        href={href}
        style={{ textDecoration: 'none', display: 'block' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div style={{
          position: 'relative',
          background: 'rgba(10,10,18,0.85)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          border: `1px solid ${hovered ? aAlpha + '0.48)' : aAlpha + '0.15)'}`,
          borderLeft: `3px solid ${hovered ? accent : aAlpha + '0.35)'}`,
          borderRadius: 12,
          padding: '22px 28px',
          overflow: 'hidden',
          transition: 'border-color 0.25s, box-shadow 0.25s',
          boxShadow: hovered
            ? `0 0 36px ${aAlpha}0.13), 0 8px 28px rgba(0,0,0,0.4)`
            : '0 2px 12px rgba(0,0,0,0.3)',
        }}>

          {/* Scanline overlay */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(124,58,237,0.012) 3px, rgba(124,58,237,0.012) 4px)',
          }} />

          {/* Corner glow */}
          <div style={{
            position: 'absolute', top: 0, right: 0, width: 200, height: '100%',
            background: `radial-gradient(ellipse at top right, ${aAlpha}${hovered ? '0.1)' : '0)'}, transparent 70%)`,
            pointerEvents: 'none',
            transition: 'background 0.3s',
          }} />

          {/* Top row: date + tags */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginBottom: 12, position: 'relative',
          }}>
            <span style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.62rem',
              color: accent,
              opacity: 0.6,
              letterSpacing: '0.1em',
            }}>
              {post.date || '—'}
            </span>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              {post.tags.slice(0, 4).map(tag => (
                <span key={tag} style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.55rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: '2px 8px',
                  borderRadius: 4,
                  border: `1px solid ${aAlpha}0.28)`,
                  color: soft,
                  background: `${aAlpha}0.06)`,
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Title */}
          <h2 style={{
            fontFamily: 'Orbitron, monospace',
            fontSize: 'clamp(0.95rem, 2vw, 1.2rem)',
            fontWeight: 800,
            color: hovered ? soft : '#e2e8f0',
            letterSpacing: '0.03em',
            lineHeight: 1.35,
            marginBottom: 10,
            position: 'relative',
            transition: 'color 0.2s',
          }}>
            {post.title}
          </h2>

          {/* Description + READ arrow in same row */}
          <div style={{
            display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
            gap: 24, position: 'relative',
          }}>
            {post.description && (
              <p style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.76rem',
                color: '#64748b',
                lineHeight: 1.7,
                margin: 0,
                flexGrow: 1,
              }}>
                {post.description.length > 160 ? post.description.slice(0, 160) + '…' : post.description}
              </p>
            )}
            <span style={{
              fontFamily: 'Orbitron, monospace',
              fontSize: '0.58rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              color: hovered ? accent : aAlpha + '0.3)',
              transition: 'color 0.2s',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}>
              READ →
            </span>
          </div>

        </div>
      </Link>
    </motion.div>
  );
}
