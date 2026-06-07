'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import MarkdownRenderer from './MarkdownRenderer';
import type { Post } from '@/lib/markdown';

interface PostLayoutProps {
  post: Post;
  type: 'articles' | 'writeups';
}

/* ── Per-type color tokens ────────────────────────────────────────────────── */
const THEME = {
  articles: {
    base:      'rgba(124,58,237,0.07)',
    border:    'rgba(124,58,237,0.38)',
    color:     '#a78bfa',
    hoverBg:   'rgba(124,58,237,0.18)',
    hoverBd:   'rgba(124,58,237,0.85)',
    hoverGlow: '0 0 16px rgba(124,58,237,0.4), inset 0 0 10px rgba(124,58,237,0.12)',
    hoverClr:  '#c4b5fd',
  },
  writeups: {
    base:      'rgba(239,68,68,0.07)',
    border:    'rgba(239,68,68,0.38)',
    color:     '#fca5a5',
    hoverBg:   'rgba(239,68,68,0.18)',
    hoverBd:   'rgba(239,68,68,0.85)',
    hoverGlow: '0 0 16px rgba(239,68,68,0.4), inset 0 0 10px rgba(239,68,68,0.12)',
    hoverClr:  '#fecaca',
  },
} as const;

type Theme = typeof THEME[keyof typeof THEME];

function btnStyle(t: Theme): React.CSSProperties {
  return {
    fontFamily:     'JetBrains Mono, monospace',
    fontSize:       '0.62rem',
    fontWeight:     700,
    letterSpacing:  '0.22em',
    textTransform:  'uppercase',
    color:          t.color,
    background:     t.base,
    border:         `1px solid ${t.border}`,
    borderRadius:   '3px',
    padding:        '7px 18px',
    cursor:         'pointer',
    textDecoration: 'none',
    display:        'inline-block',
    transition:     'background 0.2s, border-color 0.2s, box-shadow 0.25s, color 0.2s',
  };
}

function enter(t: Theme) {
  return (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget as HTMLElement;
    el.style.background  = t.hoverBg;
    el.style.borderColor = t.hoverBd;
    el.style.boxShadow   = t.hoverGlow;
    el.style.color       = t.hoverClr;
  };
}

function leave(t: Theme) {
  return (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget as HTMLElement;
    el.style.background  = t.base;
    el.style.borderColor = t.border;
    el.style.boxShadow   = 'none';
    el.style.color       = t.color;
  };
}

export default function PostLayout({ post, type }: PostLayoutProps) {
  const backHref  = `/${type}`;
  const backLabel = type === 'articles' ? '← ARTICLES' : '← WRITEUPS';
  const t         = THEME[type];
  const style     = btnStyle(t);

  return (
    <div className="post-page-top">
      <div className="post-content-wrap">

        {/* Back — top */}
        <div style={{ marginBottom: '3rem' }}>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            style={{ display: 'inline-block' } as React.CSSProperties}
          >
            <Link href={backHref} style={style} onMouseEnter={enter(t)} onMouseLeave={leave(t)}>
              {backLabel}
            </Link>
          </motion.div>
        </div>

        {/* Header */}
        <motion.header
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map(tag => (
              <span key={tag} className={type === 'writeups' ? 'tag tag-blood' : 'tag'}>{tag}</span>
            ))}
          </div>

          <h1
            className="text-3xl md:text-4xl font-orbitron font-black text-ame-text mb-4 leading-tight"
            style={{ fontFamily: 'Orbitron, monospace' }}
          >
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-ame-muted text-xs font-mono">
            <span>{post.date}</span>
            <span className="text-ame-dim">·</span>
            <span>{post.readingTime}</span>
          </div>

          {post.description && (
            <p className="mt-4 text-ame-dim font-mono text-sm leading-relaxed border-l-2 border-ame-purple/40 pl-4">
              {post.description}
            </p>
          )}
        </motion.header>

        <div className="ame-divider" />

        {/* Content */}
        <motion.article
          className="mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <MarkdownRenderer content={post.content} variant={type} />
        </motion.article>

        {/* Footer */}
        <div className="ame-divider mt-16" />
        <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>

          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
            <Link href={backHref} style={style} onMouseEnter={enter(t)} onMouseLeave={leave(t)}>
              {backLabel}
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={style}
              onMouseEnter={enter(t)}
              onMouseLeave={leave(t)}
            >
              ↑ TOP
            </button>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
