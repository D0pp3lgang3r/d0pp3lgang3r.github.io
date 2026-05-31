'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import MarkdownRenderer from './MarkdownRenderer';
import type { Post } from '@/lib/markdown';

interface PostLayoutProps {
  post: Post;
  type: 'articles' | 'writeups';
}

export default function PostLayout({ post, type }: PostLayoutProps) {
  const backHref  = `/${type}`;
  const backLabel = type === 'articles' ? '← ARTICLES' : '← WRITEUPS';

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-6">

        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            href={backHref}
            className="text-ame-muted hover:text-ame-rain font-mono text-xs tracking-widest transition-colors"
          >
            {backLabel}
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>

          {/* Title */}
          <h1
            className="text-3xl md:text-4xl font-orbitron font-black text-ame-text mb-4 leading-tight"
            style={{ fontFamily: 'Orbitron, monospace' }}
          >
            {post.title}
          </h1>

          {/* Meta */}
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
          <MarkdownRenderer content={post.content} />
        </motion.article>

        {/* Footer */}
        <div className="ame-divider mt-16" />
        <div className="mt-8 flex justify-between items-center">
          <Link
            href={backHref}
            className="text-ame-muted hover:text-ame-rain font-mono text-xs tracking-widest transition-colors"
          >
            {backLabel}
          </Link>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-ame-muted hover:text-ame-rain font-mono text-xs tracking-widest transition-colors"
          >
            ↑ TOP
          </button>
        </div>

      </div>
    </div>
  );
}
