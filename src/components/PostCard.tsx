'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { PostMeta } from '@/lib/markdown';

interface PostCardProps {
  post:  PostMeta;
  type:  'articles' | 'writeups';
  index: number;
}

export default function PostCard({ post, type, index }: PostCardProps) {
  const href     = `/${type}/${post.slug}`;
  const isCtf    = type === 'writeups';
  const accent   = isCtf ? '#ef4444' : '#7c3aed';
  const accentBg = isCtf ? 'rgba(239,68,68,0.08)' : 'rgba(124,58,237,0.04)';
  const arrowCol = isCtf ? '#7f1d1d' : '#4c1d95';
  const tagBg    = isCtf ? 'rgba(239,68,68,0.08)' : undefined;
  const tagBord  = isCtf ? 'rgba(239,68,68,0.28)' : undefined;
  const tagCol   = isCtf ? '#fca5a5' : undefined;

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06, duration: 0.35 }}
    >
      <Link
        href={href}
        className="post-row"
        style={{
          textDecoration: 'none',
          borderBottomColor: `${accent}22`,
        }}
      >
        {/* Date */}
        <span style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.68rem',
          color: '#475569',
          whiteSpace: 'nowrap',
        }}>
          {post.date || '—'}
        </span>

        {/* Title + description */}
        <span>
          <span style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.84rem',
            fontWeight: 500,
            color: '#e2e8f0',
            transition: 'color 0.2s',
            display: 'block',
          }}
          className="post-row-title"
          >
            {post.title}
          </span>
          {post.description && (
            <span style={{
              display: 'block',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.7rem',
              color: '#475569',
              marginTop: 2,
            }}>
              {post.description.length > 90 ? post.description.slice(0, 90) + '…' : post.description}
            </span>
          )}
        </span>

        {/* Tags + arrow */}
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {post.tags.slice(0, 2).map(tag => (
            <span
              key={tag}
              className="tag"
              style={{
                background: tagBg,
                borderColor: tagBord,
                color: tagCol,
              }}
            >
              {tag}
            </span>
          ))}
          <span style={{ color: arrowCol, fontFamily: 'JetBrains Mono, monospace', fontSize: '0.78rem', marginLeft: 4 }}>
            →
          </span>
        </span>
      </Link>
    </motion.div>
  );
}
