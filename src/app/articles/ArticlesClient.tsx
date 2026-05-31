'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import PostCard from '@/components/PostCard';
import type { PostMeta } from '@/lib/markdown';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0 },
};

export default function ArticlesClient({ initialPosts }: { initialPosts: PostMeta[] }) {
  const [filter, setFilter]     = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = Array.from(new Set(initialPosts.flatMap(p => p.tags)));

  const filtered = initialPosts.filter(p => {
    const matchText = filter === '' ||
      p.title.toLowerCase().includes(filter.toLowerCase()) ||
      p.description.toLowerCase().includes(filter.toLowerCase());
    const matchTag = activeTag === null || p.tags.includes(activeTag);
    return matchText && matchTag;
  });

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          className="mb-12"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.span variants={fadeUp} className="text-ame-muted text-sm font-jp tracking-widest block mb-4">
            記事 / ARTICLES
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-5xl font-orbitron font-black text-ame-text mb-4"
            style={{ fontFamily: 'Orbitron, monospace' } as React.CSSProperties}
          >
            ARTICLES
          </motion.h1>
          <motion.p variants={fadeUp} className="text-ame-muted font-mono text-sm max-w-xl">
            Écrits techniques sur la cryptographie, la sécurité réseau, et des sujets divers.
          </motion.p>
        </motion.div>

        <motion.div
          className="mb-10 space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <input
            type="text"
            placeholder="Search articles..."
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="w-full bg-ame-black/60 border border-ame-steel/60 focus:border-ame-purple/60 outline-none text-ame-text font-mono text-sm px-4 py-2.5 transition-colors duration-200 placeholder:text-ame-dim max-w-md"
          />
          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTag(null)}
                className={`tag text-xs transition-all ${activeTag === null ? 'border-ame-rain/60 text-ame-rain bg-ame-purple/15' : ''}`}
              >
                ALL
              </button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                  className={`tag text-xs transition-all ${activeTag === tag ? 'border-ame-rain/60 text-ame-rain bg-ame-purple/15' : ''}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {filtered.length === 0 ? (
          <div className="panel p-12 text-center">
            <p className="text-ame-muted font-mono text-sm">
              {initialPosts.length === 0
                ? "Aucun article pour l'instant — bientôt disponible."
                : 'Aucun article ne correspond à la recherche.'}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filtered.map((post, i) => (
              <PostCard key={post.slug} post={post} type="articles" index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
