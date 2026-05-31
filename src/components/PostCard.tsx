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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
    >
      <Link href={href} className="panel p-6 block group hover:scale-[1.01] transition-transform duration-300">
        {/* Meta row */}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-ame-muted text-xs font-mono">{post.date}</span>
          <span className="text-ame-dim">·</span>
          <span className="text-ame-muted text-xs font-mono">{post.readingTime}</span>
        </div>

        {/* Title */}
        <h3
          className="font-orbitron font-bold text-sm tracking-wide text-ame-text group-hover:text-ame-rain transition-colors duration-300 mb-2 leading-snug"
          style={{ fontFamily: 'Orbitron, monospace' }}
        >
          {post.title}
        </h3>

        {/* Description */}
        {post.description && (
          <p className="text-ame-muted text-xs font-mono leading-relaxed mb-4 line-clamp-2">
            {post.description}
          </p>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <span key={tag} className="tag text-xs">{tag}</span>
          ))}
        </div>

        {/* Arrow */}
        <div className="mt-4 text-ame-purple/50 group-hover:text-ame-rain transition-colors text-xs font-mono">
          READ MORE →
        </div>
      </Link>
    </motion.div>
  );
}
