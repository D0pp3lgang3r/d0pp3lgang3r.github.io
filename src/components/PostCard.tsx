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
  const href = `/${type}/${post.slug}`;

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06, duration: 0.35 }}
    >
      <Link href={href} className="post-row" style={{ textDecoration: 'none' }}>
        {/* Date */}
        <span className="post-row-date">{post.date || '—'}</span>

        {/* Title + description */}
        <span>
          <span className="post-row-title">{post.title}</span>
          {post.description && (
            <span
              style={{
                display: 'block',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.72rem',
                color: '#475569',
                marginTop: 2,
              }}
            >
              {post.description.length > 80
                ? post.description.slice(0, 80) + '…'
                : post.description}
            </span>
          )}
        </span>

        {/* Tags + arrow */}
        <span className="post-row-meta">
          {post.tags.slice(0, 2).map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
          <span
            style={{
              color: '#4c1d95',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.75rem',
              marginLeft: 4,
              transition: 'color 0.2s',
            }}
          >
            →
          </span>
        </span>
      </Link>
    </motion.div>
  );
}
