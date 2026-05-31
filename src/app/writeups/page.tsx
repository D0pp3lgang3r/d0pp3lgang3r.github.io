'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import PostCard from '@/components/PostCard';
import type { PostMeta } from '@/lib/markdown';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0 },
};

export default function WriteupsPage() {
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [filter, setFilter] = useState('');
  const [allTags, setAllTags] = useState<string[]>([]);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/posts?type=writeups')
      .then(r => r.json())
      .then((data: PostMeta[]) => {
        setPosts(data);
        const tags = Array.from(new Set(data.flatMap(p => p.tags)));
        setAllTags(tags);
      });
  }, []);

  const filtered = posts.filter(p => {
    const matchText = filter === '' ||
      p.title.toLowerCase().includes(filter.toLowerCase()) ||
      p.description.toLowerCase().includes(filter.toLowerCase());
    const matchTag = activeTag === null || p.tags.includes(activeTag);
    return matchText && matchTag;
  });

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <motion.div
          className="mb-12"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.span variants={fadeUp} className="text-ame-muted text-sm font-jp tracking-widest block mb-4">
            解答 / WRITEUPS
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-5xl font-orbitron font-black text-ame-text mb-4"
            style={{ fontFamily: 'Orbitron, monospace' }}
          >
            WRITEUPS
          </motion.h1>
          <motion.p variants={fadeUp} className="text-ame-muted font-mono text-sm max-w-xl">
            Solutions détaillées de challenges CTF — CryptoHack, Root-Me, et autres compétitions.
          </motion.p>
        </motion.div>

        {/* Search + filter */}
        <motion.div
          className="mb-10 space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <input
            type="text"
            placeholder="Search writeups..."
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

        {/* Posts */}
        {filtered.length === 0 ? (
          <div className="panel p-12 text-center">
            <p className="text-ame-muted font-mono text-sm">
              {posts.length === 0
                ? 'Aucun writeup pour l\'instant — bientôt disponible.'
                : 'Aucun résultat pour cette recherche.'}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filtered.map((post, i) => (
              <PostCard key={post.slug} post={post} type="writeups" index={i} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
